import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JournalListScreen from '../screens/JournalListScreen';
import JournalScreen from '../screens/JournalScreen';

const Stack = createNativeStackNavigator();

export default function JournalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JournalList" component={JournalListScreen} />
      <Stack.Screen name="JournalEntry" component={JournalScreen} />
    </Stack.Navigator>
  );
}

