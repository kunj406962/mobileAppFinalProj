import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ToDos from '../assets/components/ToDos';
import PopUp from '../assets/components/PopUp';
import TodoSection from '../assets/components/ToDoSection';

export default function ToDoScreen() {
  const route = useRoute();

  const [today, setToday] = useState(new Date());

  // All todos live here: { id, text, completed, time, date }
  const [todos, setTodos] = useState([]);

  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState(new Date());

  // This is the date we are adding tasks FOR (today or from calendar)
  const [targetDate, setTargetDate] = useState(
    today.toISOString().split('T')[0]
  );

  // Keep "today" updated every minute
  useEffect(() => {
    const interval = setInterval(() => setToday(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const todayString = today.toISOString().split('T')[0];

  // Whenever route params change (like from Calendar), update targetDate
  useEffect(() => {
    if (route.params?.selectedDate) {
      setTargetDate(route.params.selectedDate);
      // Auto-open popup when coming from calendar
      setPopup(true);
    } else {
      // If coming in normally (tab press), default to today
      setTargetDate(todayString);
    }
  }, [route.params?.selectedDate, todayString]);

  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = today.toLocaleDateString('en-US', { month: 'long' });
  const date = today.getDate();
  const year = today.getFullYear();

  // Convert "HH:MM" to a Date (today) for overdue check
  const timeToDateForToday = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const d = new Date(today);
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const isTodoOverdue = (todo) => {
    if (todo.date !== todayString || todo.completed) return false;
    const todoTime = timeToDateForToday(todo.time);
    return todoTime < today;
  };

  const handleTodoToggle = (todoId) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleAddTodo = (text, todoTime) => {
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      time: todoTime,
      date: targetDate,
    };

    setTodos((prev) => [...prev, newTodo]);
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
    <SafeAreaView className="flex-1 bg-[#F8F8F8] px-5 pb-20 -mt-0">
      {/* Top greeting */}
      <View className="mb-3">
        <Text className="text-3xl font-bold text-gray-900">
          Hello!
        </Text>

        {targetPretty && (
          <Text className="mt-1 text-xs text-gray-500">
            Adding tasks for: <Text className="font-semibold">{targetPretty}</Text>
          </Text>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TODAY CARD */}
        <View className="bg-[#E3E6EB] rounded-2xl p-5 mb-6 shadow">
          <View className="mb-3 border-b border-gray-400 pb-1">
            <Text className="text-xl font-bold text-gray-800">
              {dayName}
            </Text>
            <Text className="text-sm italic font-light pb-1 text-gray-700">
              {monthName} {date}, {year}
            </Text>
          </View>

          <View className="mt-2 mb-4">
            {notCompletedToday.map((todo) => (
              <ToDos
                key={todo.id}
                todo={todo}
                onToggle={handleTodoToggle}
              />
            ))}
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
