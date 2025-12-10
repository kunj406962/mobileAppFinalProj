import React from 'react';
import { View, Text } from 'react-native';
import ToDos from './ToDos';

export default function TodoSection({ title, todos, onToggle, backgroundColor }) {

  return (
    <View className={`${backgroundColor} rounded-2xl p-5 mb-6 shadow min-h-96`}>

      <Text className="text-lg font-semibold text-gray-900 mb-3">
        {title}
      </Text>

      <View className="space-y-2">
        {todos && todos.length > 0 ? (
          todos.map(todo => (
            <ToDos key={todo.id} todo={todo} onToggle={onToggle} />
          ))
        ) : (
          <Text className="text-sm text-gray-500 italic">
            No {title.toLowerCase()} tasks.
          </Text>
        )}
      </View>
    </View>
  );
}
