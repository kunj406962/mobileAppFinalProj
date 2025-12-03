import React, { useState } from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LargeCalendar from '../assets/components/LargeCalendar.jsx';

export default function CalendarScreen() {
  const [headerDate, setHeaderDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [cuteAlertVisible, setCuteAlertVisible] = useState(false);

  const navigation = useNavigation();
  const events = [];

  const handleSwipe = (date) => setHeaderDate(date);

  const changeMonth = (offset) => {
    setHeaderDate((prev) => {
      const year = prev.getFullFullYear();
      const month = prev.getMonth() + offset;
      return new Date(year, month, 1);
    });
  };

  const monthName = headerDate.toLocaleString('default', { month: 'long' });
  const year = headerDate.getFullYear();

  const handleDayPress = (date) => {
    setSelectedDate(date);
    setCuteAlertVisible(true);
  };

  const formatted = selectedDate
    ? selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.monthYearRow}>
          <Text style={styles.monthText}>{monthName} </Text>
          <Text style={styles.yearText}>{year}</Text>
        </View>

        <View style={styles.arrowRow}>
          <Pressable onPress={() => changeMonth(-1)} style={styles.arrowButton}>
            <Text style={styles.arrowText}>{'‹'}</Text>
          </Pressable>

          <Pressable
            onPress={() => changeMonth(1)}
            style={[styles.arrowButton, { marginLeft: 8 }]}
          >
            <Text style={styles.arrowText}>{'›'}</Text>
          </Pressable>
        </View>
      </View>

      {/* CALENDAR */}
      <LargeCalendar
        events={events}
        currDate={headerDate}
        handleSwipe={handleSwipe}
        onDayPress={handleDayPress}
      />

      {/* CUTE MODAL POPUP */}
      <Modal
        transparent={true}
        visible={cuteAlertVisible}
        animationType="fade"
        statusBarTranslucent={true}   // 👈 fixes white top bar on Android
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create for</Text>
            <Text style={styles.modalDate}>{formatted}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#7D8C9A' }]}
                onPress={() => {
                  if (!selectedDate) return;
                  setCuteAlertVisible(false);
                  navigation.navigate('ToDo', {
                    selectedDate: selectedDate.toISOString().split('T')[0],
                  });
                }}
              >
                <Text style={styles.actionText}>To-Do</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#A4C8EA' }]}
                onPress={() => {
                  if (!selectedDate) return;
                  setCuteAlertVisible(false);
                  navigation.navigate('Journal', {
                    selectedDate: selectedDate.toISOString().split('T')[0],
                  });
                }}
              >
                <Text style={styles.actionText}>Journal</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setCuteAlertVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAEEF1',
    paddingTop: 4,
  },

  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginTop: -6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EAEEF1',
  },

  monthYearRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  monthText: { fontSize: 22, fontWeight: '700', color: '#333' },
  yearText: { fontSize: 18, fontWeight: '400', color: '#777' },

  arrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowText: { fontSize: 20, color: '#555' },

  /* MODAL BACKDROP */
  modalBackground: {
    flex: 1,                                 // FULL SCREEN
    backgroundColor: 'rgba(0,0,0,0.25)',     // Dark dimming layer
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },

  modalDate: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 6,
  },

  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  cancelButton: {
    marginTop: 12,
  },

  cancelText: {
    fontSize: 14,
    color: '#888',
  },
});
