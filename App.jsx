/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
import {NavigationContainer} from '@react-navigation/native';

const Tab=createBottomTabNavigator();

function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // Map route names to image sources
            const iconMap = {
              ToDo: require('./src/assets/images/check-box.png'),
              Calendar: require('./src/assets/images/today.png'),
              Journal: require('./src/assets/images/edit.png'),
            };

            return (
              <View className={` p-2 rounded-full ${focused ? 'bg-[#D6DDE3]' : 'bg-transparent'}`}>
                <Image 
                source={iconMap[route.name]} 
                style={{
                  width: 25,
                  height: 25,
                  tintColor: color, // Automatically changes color
                }}
                />
              </View>
              
            );
          },
          tabBarActiveTintColor: '#000000',    // Black when active
          tabBarInactiveTintColor: '#8E8E93',  // Gray when inactive
          tabBarStyle:{paddingTop:7, backgroundColor: '#EAEEF1', height:80},
          tabBarLabelStyle:{marginTop: 5, fontSize: 13},
        })}>
        <Tab.Screen 
          name="ToDo" 
          component={ToDoScreen} 
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
        />
        <Tab.Screen
          name="Journal"
          component={JournalScreen}  
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
