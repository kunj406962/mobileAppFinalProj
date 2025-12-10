// TodoStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToDoScreen from './ToDoScreen';
import AddTodoScreen from './AddToDoScreen';

const Stack = createNativeStackNavigator();

export default function TodoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header for all screens in this stack
        cardStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen name="ToDoMain" component={ToDoScreen} />
      <Stack.Screen name="AddTodo" component={AddTodoScreen} />
    </Stack.Navigator>
  );
}