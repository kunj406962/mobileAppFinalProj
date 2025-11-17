import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import CalendarComponent from '../assets/components/CalendarComponent';

export default function CalendarScreen() {
  const now=new Date();
  const [selected, setSelected]= useState(`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`)
  const [todos, setTodos] = useState({
    '2025-11-15': [
      { id: '1', time: '09:00 AM', title: 'Morning Meeting', completed: false },
      { id: '2', time: '02:00 PM', title: 'Project Review', completed: false },
    ],
    '2025-11-14': [
      { id: '3', time: '10:00 AM', title: 'Doctor Appointment', completed: false },
      { id: '4', time: '04:00 PM', title: 'Gym Session', completed: true },
    ], 
  });

  const handleSelectDate = (date) => {
    setSelected(date);
  }

  // Get todos for selected date
  const selectedDateTodos = todos[selected] || [];

  // Time slots for the day
  const timeSlots = [
    '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', 
    '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM',
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
    '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
  ];  

  return (
    <SafeAreaView className='flex-1'>
      <CalendarComponent handleSelectDate={handleSelectDate} className={"z-10"}/>
      <Text className='font-bold text-2xl text-center mt-3 mb-1'>Tasks To Do on {selected}</Text>
      <View className='flex-1'>        
        <ScrollView className='p-4 flex-1  bg-white' contentContainerStyle={{paddingBottom:20}}>
          {timeSlots.map((time) => {
            const todoForTime = selectedDateTodos.find(todos => todos.time === time);
            return(
              <View key={time} className='border-t border-gray-400 m-5'>
                <Text className='text-lg'>{time}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}