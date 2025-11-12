import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function CalendarScreen() {

  return (
    <View >
      <Button
        title="Go to About"
      />
      <Button
        title="Go to Counter"
      />
      <Button
        title="Dog Adoption"
      />
      <ScrollView>
        <Text >Hello World!</Text>
        <Text >
          This is my first React Native application!
        </Text>
        <Image
          source={{
            uri: 'https://images.dog.ceo/breeds/sheepdog-indian/Himalayan_Sheepdog.jpg',
          }}
        />
      </ScrollView>
    </View>
  );
}