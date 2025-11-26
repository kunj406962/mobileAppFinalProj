import { View, Text } from 'react-native';
import ToDos from './ToDos';

const TodoSection = ({ title, todos, onToggle, backgroundColor, textColor = 'text-gray-800' }) => {
  return (
    <View className={`${backgroundColor} mt-8 rounded-2xl p-5 mb-6 shadow-2xl min-h-96`}>
      <Text className={`text-2xl font-bold ${textColor} mb-3 border-b border-gray-400 pb-2`}>
        {title}
      </Text>
      <View className="flex flex-col items-center">
        {todos.map((todo) => (
          <ToDos key={todo.id} todo={todo} onToggle={onToggle} />
        ))}
      </View>
    </View>
  );
};

export default TodoSection;