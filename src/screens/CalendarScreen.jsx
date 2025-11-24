import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Pressable
} from 'react-native';
import LargeCalendar from'../assets/components/LargeCalendar.jsx'
import CalendarHeader from '../assets/components/LargeCalendar.jsx'

export default function CalendarScreen() {
  const [headerDate, setHeaderDate] = useState(new Date());
  const events=[]
  const handleSwipe = (date) => {
    setHeaderDate(date);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
      
      {/* HEADER */}
      <View className='p-3 mt-10 flex flex-row items-center justify-between bg-white shadow-sm rounded-lg'>  
            <Text className='text-xl font-bold text-gray-800 mx-4'>
            {headerDate.toLocaleString('default', { month: 'long' })} {headerDate.getFullYear()}
            </Text>
      </View>
      <LargeCalendar
        events={events}
        handleSwipe={handleSwipe}
        currDate={headerDate}
      />
    </SafeAreaView>
  );
}
