import { useState } from 'react';
import {
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarComponent({handleSelectDate}) {
  const [selected, setSelected]= useState('');
  const now=new Date();
  const today= `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;

  const handleToday=() => {
    if (selected===today){
      return {marked: true, dotColor: 'white', selected: true, selectedColor: 'black'}
    }
    else{return {marked: true, dotColor: 'black'}}
  }

  return (
    <View >
      <Calendar
        onDayPress={day => {
          handleSelectDate(day.dateString);
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, selectedColor: 'black'},
          [today]: handleToday(),
        }}
        theme={{
          dayTextColor:"black",
          todayTextColor:"black",
          arrowColor:"black",
          monthTextColor:"black",
          textMonthFontWeight:"bold",
        }}
        minDate={today}
      >
      </Calendar>
    </View>
  );
}