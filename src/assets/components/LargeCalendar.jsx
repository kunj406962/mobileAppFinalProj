import React from 'react';
import { View, Dimensions } from 'react-native';
import { Calendar } from 'react-native-big-calendar';

const { height } = Dimensions.get('window');

export default function LargeCalendar({
  currDate,
  events,
  handleSwipe,
  onDayPress,
}) {
  const theme = {
    palette: {
      primary: {
        main: '#3b82f6',
      },
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <Calendar
        events={events}
        height={height - 200}
        mode="month"
        date={currDate}
        theme={theme}
        swipeEnabled={true}
        onSwipeEnd={(date) => handleSwipe(date)}
        onPressCell={(date) => {
          if (onDayPress) {
            onDayPress(date);
          }
        }}
        // Tiny dot indicators for days with events
        eventCellStyle={() => ({
          backgroundColor: '#A4C8EA',
          borderRadius: 999,
          height: 4,
          marginTop: 2,
          marginHorizontal: 18,
        })}
      />
    </View>
  );
}
