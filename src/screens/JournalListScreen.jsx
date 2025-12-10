import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function JournalListScreen() {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);

  const loadEntries = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('JOURNALS');
      if (stored) {
        setEntries(JSON.parse(stored));
      } else {
        setEntries([]);
      }
    } catch (err) {
      console.error('Error loading journals:', err);
      setEntries([]);
    }
  }, []);

  // Reload whenever this screen gains focus
  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [loadEntries])
  );

  const formatPretty = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8] px-5">
      <Text className="text-3xl font-bold mt-3 mb-4">Journal</Text>

      <TouchableOpacity
        className="bg-[#96ccffff] rounded-xl p-3 mb-4"
        onPress={() =>
          navigation.navigate('JournalEntry', {
            selectedDate: new Date().toISOString(),
            existingText: '',
            entryId: null,
          })
        }
      >
        <Text className="text-center font-semibold text-lg">
          ➕ Write a Journal
        </Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {entries.length === 0 && (
          <Text className="text-gray-500 mt-6 text-center italic">
            No entries yet.
          </Text>
        )}

        {entries
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((entry) => (
            <TouchableOpacity
              key={entry.id}
              className="bg-white rounded-xl p-4 mb-3 shadow"
              onPress={() =>
                navigation.navigate('JournalEntry', {
                  selectedDate: entry.date,
                  existingText: entry.text,
                  entryId: entry.id,
                })
              }
            >
              <Text className="font-semibold text-lg">
                {formatPretty(entry.date)}
              </Text>
              <Text numberOfLines={2} className="text-gray-600 mt-1">
                {entry.text}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
