// components/AddTodoModal.js
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

const PopUp = ({ visible, onClose, onAddTodo, time, onTimeChange }) => {
  const [newTodo, setNewTodo] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const hour = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, '0');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo, `${hour}:${minutes}`);
      setNewTodo('');
      onClose();
    }
  };

  const handleClose = () => {
    setNewTodo('');
    setShowTimePicker(false);
    onClose();
  };

  const handleTimeChange=(event, selectedTime)=>{
    onTimeChange(event, selectedTime)
    setShowTimePicker(false)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-center bg-black/70">
        <View className="bg-white rounded-2xl p-6 mx-4 w-11/12 max-w-md shadow-2xl shadow-black/50">
          {/* Modal content */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-800 text-center">Add New To-Do</Text>
            <View className="h-1 bg-gray-300 rounded-full mt-2"></View>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-3">Due At</Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 active:bg-gray-100 active:border-[#7D8C9A]"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-lg text-gray-600">Select Time</Text>
                <Text className="text-xl font-bold text-[#7D8C9A]">{hour}:{minutes}</Text>
              </View>
            </TouchableOpacity>
            
            {showTimePicker && (
              <View className="mt-4 bg-gray-50 rounded-xl p-3 border border-gray-200">
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="spinner"
                  onChange={handleTimeChange}
                  is24Hour={true}
                />
              </View>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-3">Task</Text>
            <TextInput
              className="border-2 border-gray-200 rounded-xl p-4 text-lg bg-gray-50 focus:border-[#7D8C9A]"
              placeholder="Enter your to-do..."
              placeholderTextColor="#9CA3AF"
              value={newTodo}
              onChangeText={setNewTodo}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View className="flex-row justify-between pt-2">
            <TouchableOpacity
              className="w-2/5 px-6 py-3 rounded-xl border-2 border-gray-300 active:bg-gray-50 items-center"
              onPress={handleClose}
            >
              <Text className="text-gray-600 font-semibold text-base">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-2/5 px-6 py-3 rounded-xl bg-[#7D8C9A] shadow-lg shadow-black/30 active:opacity-90 items-center"
              onPress={handleAddTodo}
            >
              <Text className="text-white font-bold text-center">Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopUp;