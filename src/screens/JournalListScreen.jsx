import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function JournalListScreen() {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const stored = await AsyncStorage.getItem('JOURNALS');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  };

  const formatPretty = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8] px-5">
      <Text className="text-3xl font-bold mt-3 mb-4">Journal</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {entries.length === 0 && (
          <Text className="text-gray-500 mt-20 text-center">
            No entries yet. Tap a date in the Calendar to start!
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
              <Text
                numberOfLines={2}
                className="text-gray-600 mt-1"
              >
                {entry.text}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

