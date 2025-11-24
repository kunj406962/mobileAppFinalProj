import { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
function ToDos({todo, onToggle, key}){

  const toggleCheckbox = () => {
    onToggle(todo.id);
  };

  return (
    <TouchableOpacity
        onPress={toggleCheckbox}
        className='flex flex-row items-center m-2'
        key={key}
    >
        <View className='border h-5 w-5 bg-transparent rounded-md flex items-center justify-center'>
            {todo.completed && (
                <Text className='font-bold -mt-0.5'>✓</Text>
            )}
        </View>
        <Text className='border border-gray-400 rounded-r-full ml-3 p-1.5 w-96 font-light text-gray-800'>{todo.time} || {todo.text}</Text>
    </TouchableOpacity>
  );
};
export default ToDos;