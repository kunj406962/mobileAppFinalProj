import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import LargeCalendar from '../assets/components/LargeCalendar.jsx';

export default function CalendarScreen() {
  const [headerDate, setHeaderDate] = useState(new Date());
  const events = [];

  // Called when user swipes month in the calendar component
  const handleSwipe = (date) => {
    setHeaderDate(date);
  };

  // For the header arrows (previous / next month)
  const changeMonth = (offset) => {
    setHeaderDate((prev) => {
      const year = prev.getFullYear();
      const month = prev.getMonth() + offset;
      return new Date(year, month, 1);
    });
  };

  const monthName = headerDate.toLocaleString('default', { month: 'long' });
  const year = headerDate.getFullYear();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.monthYearRow}>
          <Text style={styles.monthText}>{monthName} </Text>
          <Text style={styles.yearText}>{year}</Text>
        </View>

        <View style={styles.arrowRow}>
          <Pressable
            onPress={() => changeMonth(-1)}
            hitSlop={8}
            style={styles.arrowButton}
          >
            <Text style={styles.arrowText}>{'‹'}</Text>
          </Pressable>

          <Pressable
            onPress={() => changeMonth(1)}
            hitSlop={8}
            style={styles.arrowButton}
          >
            <Text style={styles.arrowText}>{'›'}</Text>
          </Pressable>
        </View>
      </View>

      {/* BIG CALENDAR */}
      <LargeCalendar
        events={events}
        handleSwipe={handleSwipe}
        currDate={headerDate}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 0,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthYearRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  monthText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
  },
  yearText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#777777',
  },
  arrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 20,
    color: '#555555',
  },
});
