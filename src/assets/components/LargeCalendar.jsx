import {
  View,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-big-calendar';
const { height } = Dimensions.get('window');
function LargeCalendar({currDate, events, handleSwipe}) {

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
export default LargeCalendar;