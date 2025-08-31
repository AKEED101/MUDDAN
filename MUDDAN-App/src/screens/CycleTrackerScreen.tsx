import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');

const CycleTrackerScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data for demonstration
  const mockCycleData = {
    '2024-01-15': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-01-16': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-01-17': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-01-18': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-01-19': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-02-12': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-02-13': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-02-14': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-02-15': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-02-16': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-03-10': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-03-11': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-03-12': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-03-13': { marked: true, dotColor: '#EC4899', textColor: 'white' },
    '2024-03-14': { marked: true, dotColor: '#EC4899', textColor: 'white' },
  };

  const handleNotes = () => {
    navigation.navigate('CycleNotes' as never);
  };

  const handleRecords = () => {
    navigation.navigate('CycleRecords' as never);
  };

  const handleLogPeriod = () => {
    navigation.navigate('LogPeriod' as never);
  };

  const renderCalendarHeader = () => (
    <View style={styles.calendarHeader}>
      <Text style={styles.calendarTitle}>Cycle Calendar</Text>
      <Text style={styles.calendarSubtitle}>
        Track your period and fertility windows
      </Text>
    </View>
  );

  const renderCycleInfo = () => (
    <View style={styles.cycleInfo}>
      <View style={styles.infoCard}>
        <Ionicons name="calendar" size={24} color="#7C3AED" />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Next Period</Text>
          <Text style={styles.infoValue}>March 8, 2024</Text>
        </View>
      </View>
      
      <View style={styles.infoCard}>
        <Ionicons name="time" size={24} color="#10B981" />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Cycle Length</Text>
          <Text style={styles.infoValue}>28 days</Text>
        </View>
      </View>
      
      <View style={styles.infoCard}>
        <Ionicons name="heart" size={24} color="#F59E0B" />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Fertile Window</Text>
          <Text style={styles.infoValue}>Feb 20-26</Text>
        </View>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#7C3AED' }]}
        onPress={handleNotes}
        activeOpacity={0.8}
      >
        <Ionicons name="document-text" size={24} color="white" />
        <Text style={styles.actionButtonText}>Notes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#10B981' }]}
        onPress={handleRecords}
        activeOpacity={0.8}
      >
        <Ionicons name="stats-chart" size={24} color="white" />
        <Text style={styles.actionButtonText}>Records</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#EC4899' }]}
        onPress={handleLogPeriod}
        activeOpacity={0.8}
      >
        <Ionicons name="add-circle" size={24} color="white" />
        <Text style={styles.actionButtonText}>Log Period</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLegend = () => (
    <View style={styles.legend}>
      <Text style={styles.legendTitle}>Calendar Legend</Text>
      <View style={styles.legendItems}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EC4899' }]} />
          <Text style={styles.legendText}>Period Days</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={styles.legendText}>Fertile Window</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Ovulation</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderCalendarHeader()}
      
      <View style={styles.calendarContainer}>
        <Calendar
          current={selectedDate}
          onDayPress={(day: any) => setSelectedDate(day.dateString)}
          markedDates={mockCycleData}
          markingType="dot"
          theme={{
            backgroundColor: 'white',
            calendarBackground: 'white',
            textSectionTitleColor: '#7C3AED',
            selectedDayBackgroundColor: '#7C3AED',
            selectedDayTextColor: 'white',
            todayTextColor: '#7C3AED',
            dayTextColor: '#1F2937',
            textDisabledColor: '#D1D5DB',
            dotColor: '#EC4899',
            selectedDotColor: 'white',
            arrowColor: '#7C3AED',
            monthTextColor: '#1F2937',
            indicatorColor: '#7C3AED',
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>

      {renderCycleInfo()}
      {renderActionButtons()}
      {renderLegend()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  calendarHeader: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  calendarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  calendarSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cycleInfo: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  legend: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  legendItems: {
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  legendText: {
    fontSize: 16,
    color: '#374151',
  },
});

export default CycleTrackerScreen;
