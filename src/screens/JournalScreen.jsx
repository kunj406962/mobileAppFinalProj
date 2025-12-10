import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getWeekdayFromYMD = (dateStr) => {
  if (!dateStr) return null;

  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;

  const [y, m, d] = parts.map(Number);
  const dateObj = new Date(y, m - 1, d);

  if (isNaN(dateObj.getTime())) return null;

  return dateObj.toLocaleDateString('en-US', { weekday: 'long' });
};

// Normalize to "YYYY-MM-DD"
const normalizeDate = (selectedDate) => {
  if (!selectedDate) {
    return new Date().toISOString().slice(0, 10);
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) return selectedDate;

  return new Date(selectedDate).toISOString().slice(0, 10);
};

export default function JournalScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [entryText, setEntryText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const entryId = route.params?.entryId || null;
  const existingText = route.params?.existingText || '';

  useEffect(() => {
    if (route.params?.selectedDate) {
      setSelectedDate(route.params.selectedDate);
    }
    if (existingText) {
      setEntryText(existingText);
    }
  }, [route.params?.selectedDate, existingText]);

  const handlePost = async () => {
    if (!entryText.trim()) {
      Alert.alert('Empty entry', 'Write something before posting!');
      return;
    }

    try {
      const stored = await AsyncStorage.getItem('JOURNALS');
      const parsed = stored ? JSON.parse(stored) : [];

      const date = normalizeDate(selectedDate);
      const timestamp = Date.now();

      let updatedEntries;

      if (entryId) {
        // ✏️ Update existing entry
        updatedEntries = parsed.map((e) =>
          e.id === entryId ? { ...e, text: entryText, date, timestamp } : e
        );
      } else {
        // 🆕 New entry
        const newEntry = {
          id: timestamp.toString(),
          date,
          text: entryText,
          timestamp,
        };
        updatedEntries = [...parsed, newEntry];
      }

      await AsyncStorage.setItem('JOURNALS', JSON.stringify(updatedEntries));

      Alert.alert('Saved ✨', 'Your journal entry has been stored.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);

      setEntryText('');
    } catch (err) {
      console.error('Error saving journal:', err);
      Alert.alert('Error', 'Could not save your journal entry.');
    }
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
