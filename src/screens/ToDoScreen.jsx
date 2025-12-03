import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ToDos from '../assets/components/ToDos';
import PopUp from '../assets/components/PopUp';
import TodoSection from '../assets/components/ToDoSection';

export default function ToDoScreen() {
  const sampleTodos = {
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
        text: 'Clean up the dishes',
        completed: false,
        time: '19:00',
      },
      {
        id: '5',
        text: 'Tuck children in for the night',
        completed: false,
        time: '19:00',
      },
      {
        id: '6',
        text: 'Clean up trash from opening presents',
        completed: false,
        time: '19:00',
      },
      {
        id: '7',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
      },
    ],
  };

  const [today, setToday] = useState(new Date());

  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = today.toLocaleDateString('en-US', { month: 'long' });
  const date = today.getDate();
  const year = today.getFullYear();
  const dateString = today.toISOString().split('T')[0];

  const [todos, setTodos] = useState(sampleTodos[dateString] || []);
  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleTodoToggle = todoId => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const timeToString = timeString => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const dateObj = new Date();
    dateObj.setHours(hours, minutes, 0, 0);
    return dateObj;
  };

  const isTodoOverdue = toDo => {
    const toDoTime = timeToString(toDo.time);
    return toDoTime < today && !toDo.completed;
  };

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

  const notCompleted = todos.filter(
    todo => !todo.completed && !isTodoOverdue(todo),
  );
  const overDue = todos.filter(
    todo => !todo.completed && isTodoOverdue(todo),
  );
  const completed = todos.filter(todo => todo.completed);

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8] px-5 pt-10 pb-20">

      <View className="flex-row items-center justify-start mb-6">
        <Text className="text-3xl font-bold text-gray-900">
          Hello!
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <View className="bg-[#E3E6EB] rounded-2xl p-5 mb-6 shadow">

          <View className="mb-3">
            <Text className="text-xl font-semibold text-gray-900">
              {dayName}
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              {monthName} {date}, {year}
            </Text>
          </View>

          <View className="mt-2 mb-4">
            {notCompleted.map(todo => (
              <ToDos
                key={todo.id}
                todo={todo}
                onToggle={handleTodoToggle}
              />
            ))}
          </View>

          <TouchableOpacity
            className="mt-1 bg-[#7D8C9A] rounded-2xl py-3 items-center"
            onPress={() => setPopup(true)}
          >
            <Text className="text-white font-medium text-base">
              + Add to-do
            </Text>
          </TouchableOpacity>
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
