import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native'; 

const getWeekdayFromYMD = (dateStr) => {
  if (!dateStr) return null;

  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;

  const [y, m, d] = parts.map(Number);
  const dateObj = new Date(y, m - 1, d);

  if (isNaN(dateObj.getTime())) return null;

  return dateObj.toLocaleDateString('en-US', { weekday: 'long' });
};

export default function JournalScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [entryText, setEntryText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (route.params?.selectedDate) {
      setSelectedDate(route.params.selectedDate); 
    }
  }, [route.params?.selectedDate]);

  const handlePost = () => {
    if (!entryText.trim()) return;

    console.log('Journal posted:', {
      date: selectedDate,
      text: entryText,
    });

    alert('Your journal entry has been posted! ✨');
    setEntryText('');
  };

  const today = new Date();
  const weekdayFromParam = getWeekdayFromYMD(selectedDate);
  const fallbackWeekday = today.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const formattedHeading = `${weekdayFromParam || fallbackWeekday}`;

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button + Title */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.titleText}>{formattedHeading}</Text>

        <View style={{ width: 20 }} />
      </View>

      {/* JOURNAL ENTRY BOX */}
      <View style={styles.card}>
        <TextInput
          value={entryText}
          onChangeText={setEntryText}
          style={styles.textInput}
          placeholder="Start typing here..."
          placeholderTextColor="#A0A0A0"
          multiline
        />
      </View>

      {/* POST BUTTON (BOTTOM) */}
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postText}>Post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ------ STYLES ----- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 16,
  },

  backButton: {
    position: 'absolute',
    left: 0,
  },

  backIcon: {
    fontSize: 22,
    color: '#444',
  },

  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 16,
    flex: 1,
  },

  textInput: {
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    height: '100%',
  },

  postButton: {
    backgroundColor: '#96ccffff',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginVertical: 14,
  },

  postText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});
