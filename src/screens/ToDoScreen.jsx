import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ToDos from "../assets/components/ToDos"
import PopUp from "../assets/components/PopUp"
import TodoSection from "../assets/components/ToDoSection"
import { useEffect, useState } from 'react';

export default function ToDoScreen() {

  const sampleTodos={
    '2025-11-26': [
      {
        id: '1',
        text: 'Open Christmas presents',
        completed: false,
        time: '08:00',
      },
      {
        id: '2',
        text: 'Prepare Christmas dinner',
        completed: false,
        time: '14:00',
      },
      {
        id: '3',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
      },
      {
        id: '4',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
      },
      {
        id: '5',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
      },
      {
        id: '6',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
      },
      {
        id: '7',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
      }
    ]
  } 
  
  const[today, setToday]= useState(new Date())

  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = today.toLocaleDateString('en-US', { month: 'long' });
  const date = today.getDate();
  const year= today.getFullYear();
  const dateString = today.toISOString().split('T')[0];

  const[todos, setTodos]=useState(sampleTodos[dateString]||[])
  const [popup, setPopup]=useState(false)
  const [time, setTime]= useState(new Date())

  useEffect(()=>{
    const interval= setInterval(()=>{setToday(new Date())}, 60000)

    return ()=> clearInterval(interval)//To stop the function from running if we are not on the screen
  }, [])
  
  const handleTodoToggle = (todoId) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const timeToString=(timeString)=>{
    const[hours, minutes]=timeString.split(':').map(Number)
    const date= new Date();
    date.setHours(hours, minutes, 0, 0)
    return date;
  }

  const isTodoOverdue=(toDo)=>{
    const toDoTime= timeToString(toDo.time)
    return toDoTime<today && !toDo.completed    
  }

  const handleAddTodo = (text, todoTime) => {
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      time: todoTime,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleTimeChange = (event, selectedTime) => {
    setTime(selectedTime || time);
  };

  const notCompleted=todos.filter(todo => !todo.completed && !isTodoOverdue(todo));
  const overDue=todos.filter(todo => !todo.completed && isTodoOverdue(todo));
  const completed= todos.filter(todo => todo.completed);

  return (
    <SafeAreaView className='mt-16 pl-5 pr-5 mb-14' >
      <Text className='text-4xl font-bold text-gray-800 mb-5'>Hello User!</Text>
      <ScrollView>

        <View className='bg-[#D9D9D9] rounded-2xl p-5 mb-6 shadow-2xl min-h-96 flex flex-col '>
          <View className='mb-3 border-b border-gray-400 pb-1'>
            <Text className='text-2xl font-bold text-gray-800'>{dayName}</Text>
            <Text className='text-base italic font-light pb-1'>{monthName} {date}, {year}</Text>
          </View>
          <View className='flex flex-1 justify-between'>            
            <View className='flex flex-col items-center'>
              {notCompleted.map((todo)=>{
                return <ToDos key={todo.id} todo={todo} onToggle={handleTodoToggle}/>
              })}
            </View>
            <TouchableOpacity className='self-center bg-[#7D8C9A] rounded-2xl  pt-2 pb-2 w-80 text-white font-thin flex items-center' onPress={()=>setPopup(true)}>
              <Text className='text-white font-thin'>+ Add To-Do</Text>
            </TouchableOpacity>
            </View>
        </View>

        <TodoSection
          title="Overdue"
          todos={overDue}
          onToggle={handleTodoToggle}
          backgroundColor="bg-[#FFE2E2]"
        />

        <TodoSection
          title="Completed"
          todos={completed}
          onToggle={handleTodoToggle}
          backgroundColor="bg-[#E2F0E2]"
        />

        <PopUp
          visible={popup}
          onClose={() => setPopup(false)}
          onAddTodo={handleAddTodo}
          time={time}
          onTimeChange={handleTimeChange}
        />       
      </ScrollView>
    </SafeAreaView>
  );
}