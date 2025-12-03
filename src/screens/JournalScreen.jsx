import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function JournalScreen() {
  const navigation = useNavigation();
  const [entry, setEntry] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>User&apos;s Thursday</Text>

        {/* Right side placeholder (for symmetry / future icons) */}
        <View style={{ width: 24 }} />
      </View>

      {/* Small dot at top center (like your mock) */}
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
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
    backgroundColor: '#EAEEF1', // light grey like your mock
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    justifyContent: 'space-between',
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
  dotContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#343A40',
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
