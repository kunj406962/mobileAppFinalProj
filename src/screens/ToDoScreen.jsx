import {
  TextInput,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ToDos from "../assets/components/ToDos"
import { useState } from 'react';

export default function ToDoScreen() {

  const sampleTodos={
    '2024-12-25': [
      {
        id: '1',
        text: 'Open Christmas presents',
        completed: false,
        time: '08:00',
        category: 'holiday'
      },
      {
        id: '2',
        text: 'Prepare Christmas dinner',
        completed: false,
        time: '14:00',
        category: 'cooking'
      },
      {
        id: '3',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
        category: 'family'
      },
      {
        id: '4',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
        category: 'family'
      },
      {
        id: '5',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
        category: 'family'
      },
      {
        id: '6',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
        category: 'family'
      },
      {
        id: '7',
        text: 'Video call with family',
        completed: false,
        time: '19:00',
        category: 'family'
      }
    ]
  } 
  const[todos, setTodos]=useState(sampleTodos['2024-12-25']||[])
  const [popup, setPopup]=useState(false)
  const [newTodo, setNewTodo] = useState('')

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = today.toLocaleDateString('en-US', { month: 'long' });
  const date = today.getDate();
  const year= today.getFullYear();

  const handleTodoToggle = (todoId) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const notCompleted=todos.filter(todo => !todo.completed);
  const completed= todos.filter(todo => todo.completed);

  return (
    <SafeAreaView className='mt-16 pl-5 pr-5 mb-14' >
      <Text className='text-4xl font-bold text-gray-800 mb-5'>Hello User!</Text>
      <ScrollView>

        <View className='bg-[#D9D9D9] rounded-2xl p-5 mb-6 shadow-2xl min-h-96 flex flex-col'>
          <View className='mb-3 border-b border-gray-400 pb-1'>
            <Text className='text-2xl font-bold text-gray-800'>{dayName}</Text>
            <Text className='text-base italic font-light pb-1'>{monthName} {date}, {year}</Text>
          </View>
          <View className='flex flex-col items-center'>
            {notCompleted.map((todo)=>{
              return <ToDos key={todo.id} todo={todo} onToggle={handleTodoToggle}/>
            })}
          </View>
          <TouchableOpacity className='self-center bg-[#7D8C9A] rounded-2xl  pt-2 pb-2 w-80 text-white font-thin flex items-center' onPress={()=>setPopup(true)}>
            <Text className='text-white font-thin'>+ Add To-Do</Text>
          </TouchableOpacity>
        </View>

        <View className='bg-[#FFE2E2] mt-8 rounded-2xl p-5 mb-6 shadow-2xl min-h-96'>
          <Text className='text-2xl font-bold text-gray-800 mb-3 border-b border-gray-400 pb-2'>Overdue</Text>
        </View>

        <View className='bg-[#E2F0E2] mt-8 rounded-2xl p-5 mb-6 shadow-2xl min-h-96'>
          <Text className='text-2xl font-bold text-gray-800 mb-3 border-b border-gray-400 pb-2'>Completed</Text>
          <View className='flex flex-col items-center'>
            {completed.map((todo)=>{
              return <ToDos todo={todo} onToggle={handleTodoToggle} key={todo.id}/>
            })}
          </View>
        </View>

        <Modal
          animationType='slide'
          transparent={true}
          visible={popup}
          onRequestClose={()=>setPopup(false)}        
        >
          <View className='flex-1 justify-center items-center bg-black/50'>
            <View className='bg-white rounded-2xl p-6 mx-4 w-80'>
              <Text className='text-xl font-bold mb-4 text-gray-800'>Add New To-Do</Text>
              
              <TextInput
                className='border border-gray-300 rounded-lg p-3 mb-4'
                placeholder="Enter your to-do..."
                value={newTodo}
                onChangeText={setNewTodo}
              />
              
              <View className='flex-row justify-end space-x-3'>
                <TouchableOpacity 
                  className='px-4 py-2 rounded-lg'
                  onPress={() => setPopup(false)}
                >
                  <Text className='text-gray-600'>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className='bg-[#7D8C9A] px-4 py-2 rounded-lg'
                >
                  <Text className='text-white'>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}