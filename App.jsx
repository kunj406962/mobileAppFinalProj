import {
  Image,
  Text,
  View,
} from 'react-native';
import './global.css'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToDoScreen from './src/screens/ToDoScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import JournalScreen from './src/screens/JournalScreen';
import { NavigationContainer } from '@react-navigation/native';
import JournalStack from './src/screens/JournalStack';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* Global Logo at the top */}
      <View
        style={{
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#EAEEF1',
        paddingTop: 10,
        paddingBottom: 0, 
        marginBottom: -30,  
        }}
      >

        <Image
          source={require('./src/assets/images/Pockilogo.png')}
          style={{ width: 290, height: 120 }}
          resizeMode="contain"
        />

      </View>

      {/* Bottom Tabs */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            const iconMap = {
              ToDo: require('./src/assets/images/check-box.png'),
              Calendar: require('./src/assets/images/today.png'),
              Journal: require('./src/assets/images/edit.png'),
            };

            return (
              <View
                className={`p-2 rounded-full ${
                  focused ? 'bg-[#D6DDE3]' : 'bg-transparent'
                }`}
              >
                <Image
                  source={iconMap[route.name]}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: color,
                  }}
                />
              </View>
            );
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            paddingTop: 7,
            backgroundColor: '#EAEEF1',
            height: 80,
          },
          tabBarLabelStyle: { marginTop: 5, fontSize: 13 },
          headerShown: false,
        })}
      >
        <Tab.Screen name="ToDo" component={ToDoScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Journal" component={JournalStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
