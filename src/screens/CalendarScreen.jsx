import { useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CalendarComponent from '../assets/components/CalendarComponent';

export default function CalendarScreen() {
  const [selected, setSelected]= useState('')
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
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ];  

  return (
    <SafeAreaView className='flex-1'>
      <CalendarComponent handleSelectDate={handleSelectDate}/>
      <ScrollView className='flex-1'>
        {timeSlots.map((time) => {
          const todosForThisTime = selectedDateTodos.filter(todo => todo.time === time);
          return (
            <View key={time} style={ {borderBottomWidth:1, borderColor:'#ccc'}}>
              <Text style={{fontSize:18, fontWeight:'bold', marginVertical:5}}>{time}</Text>
              {todosForThisTime.length === 0 ? (
                <Text style={{color:'#888', marginBottom:10}}>No Appointments</Text>
              ) : (
                <View>
                  {todosForThisTime.map(todo => (
                    <Text>{todo.title}</Text>
                  ))}
                </View>
              )}
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}