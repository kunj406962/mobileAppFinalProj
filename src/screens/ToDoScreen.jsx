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

export default function ToDoScreen() {
  
  const [today, setToday] = useState(new Date())
  const [todos, setTodos] = useState([])
  const [popup, setPopup] = useState(false)
  const [time, setTime] = useState(new Date())
  // ADD THIS: targetDate state
  const [targetDate, setTargetDate] = useState(() => {
    const todayDate = new Date();
    return todayDate.toISOString().split('T')[0];
  });

  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = today.toLocaleDateString('en-US', { month: 'long' });
  const date = today.getDate();
  const year = today.getFullYear();
  const dateString = today.toISOString().split('T')[0];

  useEffect(() => {
    const interval = setInterval(() => { setToday(new Date()) }, 60000)
    loadTodos()
    return () => clearInterval(interval)
  }, [])

  const loadTodos = async () => {
    const loadedTodos = await ToDoFileIO.getTodosForDate(dateString)
    setTodos(loadedTodos)
  }
  
  const handleTodoToggle = async (todoId) => {
    const toDoToUpdate = todos.find(todo => todo.id === todoId)
    // FIX: Use ToDoFileIO instead of FileStorageService
    await ToDoFileIO.updateTodo(dateString, todoId, {
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

  const timeToString = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number)
    const date = new Date();
    date.setHours(hours, minutes, 0, 0)
    return date;
  }

  const isTodoOverdue = (toDo) => {
    if (!toDo.time) return false;
    const toDoTime = timeToString(toDo.time);
    const now = new Date();
    
    // Create a date with today's date and the todo's time
    const todoDateTime = new Date();
    todoDateTime.setHours(toDoTime.getHours(), toDoTime.getMinutes(), 0, 0);
    
    return todoDateTime < now && !toDo.completed;
  }

  const handleAddTodo = async (text, todoTime) => {
    const newTodo = await ToDoFileIO.addTodo(dateString, {
      text: text.trim(),
      completed: false,
      time: todoTime,
    }) 
    setTodos(prev => [...prev, newTodo]);
  };

  const handleTimeChange = (event, selectedTime) => {
    setTime(selectedTime || time);
  };

  // Grouping logic
  const todayTodos = todos;

  const notCompletedToday = todayTodos.filter(
    (todo) => !todo.completed && !isTodoOverdue(todo)
  );
  const overDue = todayTodos.filter(
    (todo) => !todo.completed && isTodoOverdue(todo)
  );
  const completed = todayTodos.filter((todo) => todo.completed);

  // FUTURE tasks - FIXED comparison
  const futureTasks = todos
    .filter((todo) => todo.date && todo.date > dateString && !todo.completed)
    .sort((a, b) => {
      if (a.date === b.date) {
        return (a.time || '00:00').localeCompare(b.time || '00:00');
      }
      return a.date.localeCompare(b.date);
    });

  const formatDatePretty = (dateStr) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const targetPretty =
    targetDate !== dateString
      ? formatDatePretty(targetDate)
      : null;

  return (
    <SafeAreaView className='pl-5 pr-5 mb-14'>
      <Text className='text-4xl font-bold text-gray-800 mb-5'>Hello User!</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='bg-[#D9D9D9] rounded-2xl p-5 mb-6 shadow-2xl min-h-96 flex flex-col'>
          <View className='mb-3 border-b border-gray-400 pb-1'>
            <Text className='text-2xl font-bold text-gray-800'>{dayName}</Text>
            <Text className='text-base italic font-light pb-1'>{monthName} {date}, {year}</Text>
          </View>

          <View className="flex-1">
            {/* Show Today's Todos */}
            {notCompletedToday.length > 0 && (
              notCompletedToday.map(todo=>(
                <ToDos key={todo.id} todo={todo} onToggle={handleTodoToggle}/>
              ))
            )}
          </View>
          

          <TouchableOpacity
            className="mt-4 bg-[#7D8C9A] rounded-2xl py-3 items-center"
            onPress={() => {
              setTargetDate(dateString); // Set to today
              setPopup(true);
            }}
          >
            <Text className="text-white font-medium text-base">
              + Add To-Do
            </Text>
          </TouchableOpacity>
        </View>

        {/* OVERDUE SECTION */}
        <TodoSection
          title="Overdue"
          todos={overDue}
          onToggle={handleTodoToggle}
          backgroundColor="bg-[#FFE2E2]"
        />
        

        {/* COMPLETED SECTION */}
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
                  {formatDatePretty(todo.date)} • {todo.time || 'No time'}
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