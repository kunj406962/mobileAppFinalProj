import {
  View,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-big-calendar';
const { height } = Dimensions.get('window');

export default function LargeCalendar({currDate, events, handleSwipe}) {
  const theme={palette:{
            primary:{
              main: "#3b82f6"
            }}}

  return (
    <View style={{ flex: 1, backgroundColor: 'white'}}>
      {/* CALENDAR */}
      <Calendar
        events={events}
        height={height - 200}
        mode="month"
        onPressCell={(date) => alert(date.toISOString().split('T')[0])}
        onSwipeEnd={(date)=>{ handleSwipe(date) }}
        swipeEnabled={true}
        date={currDate}
      />
    </View>
  );
}