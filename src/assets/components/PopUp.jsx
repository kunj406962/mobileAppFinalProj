// components/AddTodoModal.js
import { Modal, View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';

const PopUp = ({
  visible,
  onClose,
  onAddTodo,
  time,
  onTimeChange,
  targetDate,      
  targetPretty,   
}) => {

  const [newTodo, setNewTodo] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [localTime, setLocalTime] = useState(time || new Date());
  
  // Update local time when prop changes
  useEffect(() => {
    if (time) {
      setLocalTime(time);
    }
  }, [time]);

  // Format time properly with leading zeros
  const hour = localTime.getHours().toString().padStart(2, '0');
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hour}:${minutes}`;

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo, formattedTime);
      setNewTodo('');
      onClose();
    }
  };

  const handleClose = () => {
    setNewTodo('');
    setShowTimePicker(false);
    onClose();
  };

  const handleTimeChangeInternal = (event, selectedTime) => {
    // For Android, hide picker when done
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    
    if (selectedTime) {
      setLocalTime(selectedTime);
      if (onTimeChange) {
        onTimeChange(event, selectedTime);
      }
    }
    
    // For iOS, keep picker open unless canceled
    if (Platform.OS === 'ios' && event.type === 'dismissed') {
      setShowTimePicker(false);
    }
  };

  const handleTimePickerPress = () => {
    // Toggle time picker visibility
    setShowTimePicker(!showTimePicker);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
      statusBarTranslucent={true} // Add this for better modal display
    >
      <View className="flex-1 justify-center items-center bg-black/70">
        <View className="bg-white rounded-2xl p-6 mx-4 w-11/12 max-w-md shadow-2xl shadow-black/50">
          {/* Modal Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-800 text-center">Add New To-Do</Text>
            <View className="h-1 bg-gray-300 rounded-full mt-2"></View>
            {targetPretty && (
              <Text className="text-center text-gray-600 text-base mt-2 mb-4">
                For: <Text className="font-semibold text-gray-700">{targetPretty}</Text>
              </Text>
            )}
          </View>

          {/* Time Selection */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-3">Due At</Text>
            <TouchableOpacity
              onPress={handleTimePickerPress}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 active:bg-gray-100 active:border-[#7D8C9A]"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-lg text-gray-600">Select Time</Text>
                <Text className="text-xl font-bold text-[#7D8C9A]">{formattedTime}</Text>
              </View>
            </TouchableOpacity>
            
            {/* DateTimePicker - Conditionally render based on platform */}
            {showTimePicker && (
              <View className={`mt-4 ${Platform.OS === 'ios' ? 'bg-gray-50 rounded-xl p-3 border border-gray-200' : ''}`}>
                <DateTimePicker
                  value={localTime}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleTimeChangeInternal}
                  is24Hour={true}
                  // Android-specific props
                  {...(Platform.OS === 'android' && {
                    positiveButtonLabel: 'OK',
                    negativeButtonLabel: 'Cancel',
                  })}
                />
              </View>
            )}
          </View>

          {/* Task Input */}
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
              autoFocus={true} // Auto-focus the input
              onSubmitEditing={handleAddTodo} // Allow Enter key to submit
            />
          </View>

          {/* Buttons */}
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
              disabled={!newTodo.trim()} // Disable if empty
            >
              <Text className={`font-bold text-center ${newTodo.trim() ? 'text-white' : 'text-gray-400'}`}>
                Add Task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopUp;