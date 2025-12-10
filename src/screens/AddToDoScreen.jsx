// AddTodoScreen.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ToDoFileIO from "../assets/components/ToDoFileIO";
import ToDos from '../assets/components/ToDos';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function AddTodoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  
  // Get the selected date from navigation params
  const selectedDate = route.params?.selectedDate || 
    new Date().toISOString().split('T')[0];
  
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Format the date for display
  const displayDate = new Date(selectedDate);
  const dayName = displayDate.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = displayDate.toLocaleDateString('en-US', { month: 'long' });
  const date = displayDate.getDate();
  const year = displayDate.getFullYear();
  
  useEffect(() => {
    loadTodos();
  }, [selectedDate]);
  
  const loadTodos = async () => {
    const loadedTodos = await ToDoFileIO.getTodosForDate(selectedDate);
    setTodos(loadedTodos);
  };
  
  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return;
    
    const hour = selectedTime.getHours().toString().padStart(2, '0');
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
    const timeString = `${hour}:${minutes}`;
    
    const newTodo = await ToDoFileIO.addTodo(selectedDate, {
      text: newTodoText.trim(),
      completed: false,
      time: timeString,
    });
    
    setTodos(prev => [...prev, newTodo]);
    setNewTodoText('');
    setSelectedTime(new Date()); // Reset time
  };
  
  const handleToggleTodo = async (todoId) => {
    const todoToUpdate = todos.find(todo => todo.id === todoId);
    if (!todoToUpdate) return;
    
    await ToDoFileIO.updateTodo(selectedDate, todoId, {
      completed: !todoToUpdate.completed
    });
    
    setTodos(prev => 
      prev.map(todo => 
        todo.id === todoId 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
  
  const handleDeleteTodo = async (todoId) => {
    await ToDoFileIO.deleteTodo(selectedDate, todoId);
    setTodos(prev => prev.filter(todo => todo.id !== todoId));
  };
  
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 pt-10 pb-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="w-10 h-10 items-center justify-center"
          >
            <Text className="text-2xl">×</Text>
          </TouchableOpacity>
          
          <View className="items-center">
            <Text className="text-xl font-bold text-gray-800">{dayName}</Text>
            <Text className="text-gray-600">
              {monthName} {date}, {year}
            </Text>
          </View>
          
          <View className="w-10" /> {/* Spacer for symmetry */}
        </View>
      </View>
      
      <ScrollView className="flex-1 px-5">
        {/* Todo Input Section */}
        <View className="mt-6 bg-gray-50 rounded-xl p-4">
          <Text className="text-lg font-semibold text-gray-700 mb-3">
            Add New Todo
          </Text>
          
          {/* Time Picker */}
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            className="bg-white border border-gray-200 rounded-lg p-3 mb-4"
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">Time</Text>
              <Text className="text-lg font-semibold text-[#7D8C9A]">
                {selectedTime.getHours().toString().padStart(2, '0')}:
                {selectedTime.getMinutes().toString().padStart(2, '0')}
              </Text>
            </View>
          </TouchableOpacity>
          
          {showTimePicker && (
            <View className="mb-4 bg-white rounded-lg p-3 border border-gray-200">
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="spinner"
                onChange={(event, time) => {
                  if (time) setSelectedTime(time);
                  setShowTimePicker(false);
                }}
                is24Hour={true}
              />
            </View>
          )}
          
          {/* Text Input */}
          <TextInput
            className="bg-white border border-gray-200 rounded-lg p-3 text-lg mb-4"
            placeholder="What needs to be done?"
            placeholderTextColor="#9CA3AF"
            value={newTodoText}
            onChangeText={setNewTodoText}
            multiline={true}
            numberOfLines={2}
            textAlignVertical="top"
          />
          
          {/* Add Button */}
          <TouchableOpacity
            className="bg-[#7D8C9A] rounded-lg py-3 items-center"
            onPress={handleAddTodo}
            disabled={!newTodoText.trim()}
          >
            <Text className={`font-bold text-base ${newTodoText.trim() ? 'text-white' : 'text-gray-400'}`}>
              Add Todo
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Todo List */}
        <View className="mt-8">
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Todos ({todos.length})
          </Text>
          
          {todos.length === 0 ? (
            <View className="items-center py-10">
              <Text className="text-gray-400 italic">
                No todos for this date
              </Text>
            </View>
          ) : (
            todos.map(todo => (
              <View 
                key={todo.id} 
                className="bg-white border border-gray-200 rounded-lg p-4 mb-3 flex-row items-center justify-between"
              >
                <ToDos key={todo.id} todo={todo} onToggle={handleToggleTodo} />
                
                {/* Delete Button */}
                <TouchableOpacity
                  onPress={() => handleDeleteTodo(todo.id)}
                  className="ml-3 p-2"
                >
                  <Text className="text-red-500 text-lg">×</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}