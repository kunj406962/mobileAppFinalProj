import React, { useEffect, useState } from 'react';
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
import ToDoFileIO from "../assets/components/ToDoFileIO"
import { useEffect, useState } from 'react';

export default function ToDoScreen() {
  
  const[today, setToday]= useState(new Date())

  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = today.toLocaleDateString('en-US', { month: 'long' });
  const date = today.getDate();
  const year= today.getFullYear();
  const dateString = today.toISOString().split('T')[0];

  const[todos, setTodos]=useState([])
  const [popup, setPopup]=useState(false)
  const [time, setTime]= useState(new Date())

  useEffect(()=>{
    const interval= setInterval(()=>{setToday(new Date())}, 60000)
    loadTodos()
    return ()=> clearInterval(interval)//To stop the function from running if we are not on the screen
  }, [])

  const loadTodos= async ()=>{
    const loadedTodos=await ToDoFileIO.getTodosForDate(dateString)
    setTodos(loadedTodos)
  }
  
  const handleTodoToggle =async (todoId) => {
    const toDoToUpdate=todos.find(todo=>todo.id===todoId)
    await FileStorageService.updateTodo(dateString, todoId, {
        completed: !toDoToUpdate.completed
    });
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

  const handleAddTodo = async (text, todoTime) => {
    const newTodo =await ToDoFileIO.addTodo(dateString,{
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      time: todoTime,
    }) 
    setTodos(prev => [...prev, newTodo]);
  };

  const handleTimeChange = (event, selectedTime) => {
    setTime(selectedTime || time);
  };

  // ---- GROUPING ----

  // Todos scheduled for TODAY only
  const todayTodos = todos.filter((todo) => todo.date === todayString);

  const notCompletedToday = todayTodos.filter(
    (todo) => !todo.completed && !isTodoOverdue(todo)
  );
  const overDue = todayTodos.filter(
    (todo) => !todo.completed && isTodoOverdue(todo)
  );
  const completed = todayTodos.filter((todo) => todo.completed);

  // FUTURE tasks (date AFTER today, not completed)
  const futureTasks = todos
    .filter((todo) => todo.date > todayString && !todo.completed)
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return a.date.localeCompare(b.date);
    });

  const formatDatePretty = (dateStr) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const targetPretty =
    targetDate !== todayString
      ? formatDatePretty(targetDate)
      : null;

  return (
    <SafeAreaView className='mt-16 pl-5 pr-5 mb-14' >
      <Text className='text-4xl font-bold text-gray-800 mb-5'>Hello User!</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <View className='bg-[#D9D9D9] rounded-2xl p-5 mb-6 shadow-2xl min-h-96 flex flex-col '>
          <View className='mb-3 border-b border-gray-400 pb-1'>
            <Text className='text-2xl font-bold text-gray-800'>{dayName}</Text>
            <Text className='text-base italic font-light pb-1'>{monthName} {date}, {year}</Text>
          </View>

          <TouchableOpacity
            className="mt-1 bg-[#7D8C9A] rounded-2xl py-3 items-center"
            onPress={() => {

            setTargetDate(todayString);
            setPopup(true);
          }}
>
  <Text className="text-white font-medium text-base">
    + Add To-Do
  </Text>
</TouchableOpacity>

        </View>

        {/* OVERDUE SECTION (today only) */}
        <TodoSection
          title="Overdue"
          todos={overDue}
          onToggle={handleTodoToggle}
          backgroundColor="bg-[#FFE2E2]"
        />

        {/* COMPLETED SECTION (today only) */}
        <TodoSection
          title="Completed"
          todos={completed}
          onToggle={handleTodoToggle}
          backgroundColor="bg-[#E2F0E2]"
        />

        {/* FUTURE TASKS SECTION */}
        {futureTasks.length > 0 && (
          <View className="bg-[#E6F2FF] rounded-2xl p-4 mt-2 shadow">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Future Tasks
            </Text>

            {futureTasks.map((todo) => (
              <View key={todo.id} className="mb-3">
                <Text className="text-xs text-gray-500 mb-1">
                  {formatDatePretty(todo.date)} • {todo.time}
                </Text>
                <Text className="text-base text-gray-800">
                  {todo.text}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* POPUP FOR ADDING A TODO */}
        <PopUp
          visible={popup}
          onClose={() => setPopup(false)}
          onAddTodo={handleAddTodo}
          time={time}
          onTimeChange={handleTimeChange}
          targetDate={targetDate}        
          targetPretty={targetPretty}    
        />

      </ScrollView>
    </SafeAreaView>
  );
}
