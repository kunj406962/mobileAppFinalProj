import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LargeCalendar from '../assets/components/LargeCalendar.jsx';

const formatDateYMD = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export default function CalendarScreen() {
  const [headerDate, setHeaderDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [cuteAlertVisible, setCuteAlertVisible] = useState(false);
  const [taskDates, setTaskDates] = useState([]); // YYYY-MM-DD strings

  const navigation = useNavigation();

  const handleSwipe = useCallback((date) => {
    setHeaderDate(date);
  }, []);

  const changeMonth = (offset) => {
    setHeaderDate((prev) => {
      const year = prev.getFullYear();
      const month = prev.getMonth() + offset;
      return new Date(year, month, 1);
    });
  };

  const monthName = headerDate.toLocaleString('default', { month: 'long' });
  const year = headerDate.getFullYear();

  // 💫 When a day is tapped in the calendar
  const handleDayPress = (raw) => {
    console.log('📅 handleDayPress raw:', raw);

    let date = raw;

    if (raw && raw.date) {
      date = new Date(raw.date);
    } else if (raw && raw.dateString) {
      date = new Date(raw.dateString);
    } else if (typeof raw === 'string') {
      date = new Date(raw);
    }

    if (!(date instanceof Date) || isNaN(date)) {
      date = new Date();
    }

    console.log('✅ using date:', date);
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

  // events for dots
  const events = taskDates.map((dateStr) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const start = new Date(y, m - 1, d, 9, 0);
    const end = new Date(y, m - 1, d, 10, 0);

    return {
      id: dateStr,
      title: '•',
      start,
      end,
    };
  });

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

      {/* Divider */}
      <View style={styles.headerDivider} />

      {/* CALENDAR */}
      <LargeCalendar
        events={events}
        currDate={headerDate}
        handleSwipe={handleSwipe}
        onDayPress={handleDayPress}
      />

      {/* CUTE MODAL POPUP */}
      <Modal
        transparent
        visible={cuteAlertVisible}
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create for</Text>
            <Text style={styles.modalDate}>{formatted}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* To-Do button */}
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#7D8C9A' }]}
                onPress={() => {
                  if (!selectedDate) return;

                  const iso = formatDateYMD(selectedDate);

                  setTaskDates((prev) =>
                    prev.includes(iso) ? prev : [...prev, iso]
                  );

                  setCuteAlertVisible(false);
                  navigation.navigate('ToDo', {
                    screen: 'AddTodo',
                    params: { selectedDate: iso },
                  });
                }}
              >
                <Text style={styles.actionText}>To-Do</Text>
              </TouchableOpacity>

              {/* Journal button */}
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#A4C8EA' }]}
                onPress={() => {
                  if (!selectedDate) return;
                  const iso = formatDateYMD(selectedDate);
                  setCuteAlertVisible(false);

                  navigation.navigate('Journal', {
                    screen: 'JournalEntry',
                    params: { selectedDate: iso },
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
    backgroundColor: '#F8F8F8',
    paddingTop: 4,
  },

  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginTop: -6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
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

  headerDivider: {
    height: 1,
    backgroundColor: '#C9D3DD',
    width: '100%',
    marginTop: 4,
    marginBottom: 8,
    alignSelf: 'center',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
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
