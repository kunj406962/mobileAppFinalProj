import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function JournalScreen() {
  const navigation = useNavigation();
  const [entry, setEntry] = useState('');

  const [dayName, setDayName] = useState('');

useEffect(() => {
  const today = new Date();
  const options = { weekday: 'long' };
  const weekday = today.toLocaleDateString('en-US', options);
  setDayName(weekday);
}, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>User&apos;s {dayName}</Text>

        {/* Right side placeholder (for symmetry / future icons) */}
        <View style={{ width: 24 }} />
      </View>

      {/* Journal card */}
      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>Journal Entry</Text>

        <TextInput
          style={styles.input}
          multiline
          placeholder="Start typing here..."
          placeholderTextColor="#9FA4AA"
          value={entry}
          onChangeText={setEntry}
          textAlignVertical="top"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAEEF1',
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingBottom: 15,
  justifyContent: 'space-between',
  paddingTop: 2,     
  marginTop: -5,       
},

  backArrow: {
    fontSize: 20,
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7A7F85',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
});
