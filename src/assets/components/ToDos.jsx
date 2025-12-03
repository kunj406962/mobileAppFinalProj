import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function ToDos({ todo, onToggle }) {
  const toggleCheckbox = () => {
    onToggle(todo.id);
  };

  return (
    <TouchableOpacity
      onPress={toggleCheckbox}
      className="flex-row items-center py-2"
    >
      {/* Checkbox */}
      <View className="h-5 w-5 rounded-md border border-gray-400 flex items-center justify-center">
        {todo.completed && (
          <Text className="font-bold -mt-0.5">✓</Text>
        )}
      </View>

      {/* Task text + time */}
      <View className="flex-1 flex-row items-center justify-between ml-3">
        <Text
          className={`text-base ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
          numberOfLines={2}
        >
          {todo.text}
        </Text>

        <Text className="text-xs text-gray-400 ml-3">
          {todo.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default ToDos;
