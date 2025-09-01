import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CycleStackParamList } from '../navigation/types';
import { useI18n } from '../i18n';

type CycleTrackerScreenNavigationProp = NativeStackNavigationProp<CycleStackParamList, 'CycleTrackerScreen'>;

const CycleTrackerScreen = () => {
  const navigation = useNavigation<CycleTrackerScreenNavigationProp>();
  const { t } = useI18n();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleLogSymptom = () => {
    navigation.navigate('CycleNotesScreen');
  };

  const handleLogMood = () => {
    Alert.alert('Log Mood', 'Mood logging functionality coming soon!');
  };

  const handleLogFlow = () => {
    navigation.navigate('LogPeriodScreen');
  };

  const handleSettings = () => {
    navigation.navigate('CalendarScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#A855F7']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('cycleTracker')}</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Cycle Info */}
        <View style={styles.cycleInfoCard}>
          <Text style={styles.cycleInfoTitle}>{t('currentCycle')}</Text>
          <View style={styles.cycleStats}>
            <View style={styles.cycleStat}>
              <Text style={styles.cycleStatNumber}>28</Text>
              <Text style={styles.cycleStatLabel}>Days</Text>
            </View>
            <View style={styles.cycleStat}>
              <Text style={styles.cycleStatNumber}>14</Text>
              <Text style={styles.cycleStatLabel}>Ovulation</Text>
            </View>
            <View style={styles.cycleStat}>
              <Text style={styles.cycleStatNumber}>5</Text>
              <Text style={styles.cycleStatLabel}>Period</Text>
            </View>
            <View style={styles.cycleStat}>
              <Text style={styles.cycleStatNumber}>12-16</Text>
              <Text style={styles.cycleStatLabel}>Fertile Days</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsCard}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLogFlow}>
              <LinearGradient
                colors={['#EF4444', '#F87171']}
                style={styles.actionButtonGradient}
              >
                <Ionicons name="water" size={24} color="white" />
                <Text style={styles.actionButtonText}>{t('logPeriod')}</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleLogSymptom}>
              <LinearGradient
                colors={['#10B981', '#34D399']}
                style={styles.actionButtonGradient}
              >
                <Ionicons name="document-text" size={24} color="white" />
                <Text style={styles.actionButtonText}>{t('cycleNotes')}</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleLogMood}>
              <LinearGradient
                colors={['#F59E0B', '#FBBF24']}
                style={styles.actionButtonGradient}
              >
                <Ionicons name="happy" size={24} color="white" />
                <Text style={styles.actionButtonText}>Log Mood</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Preview */}
        <View style={styles.calendarCard}>
          <Text style={styles.sectionTitle}>{t('thisMonth')}</Text>
          <View style={styles.calendarGrid}>
            {/* Calendar days would go here */}
            <Text style={styles.calendarPlaceholder}>Calendar view coming soon!</Text>
          </View>
        </View>

        {/* Predictions */}
        <View style={styles.predictionsCard}>
          <Text style={styles.sectionTitle}>{t('predictions')}</Text>
          <View style={styles.predictionItem}>
            <Ionicons name="calendar" size={20} color="#7C3AED" />
            <Text style={styles.predictionText}>{t('nextPeriod')}: 3 days</Text>
          </View>
        </View>

        {/* Recent Logs */}
        <View style={styles.recentLogsCard}>
          <Text style={styles.sectionTitle}>{t('recentLogs')}</Text>
          <Text style={styles.placeholderText}>{t('noLogs')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  cycleInfoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cycleInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  cycleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cycleStat: {
    alignItems: 'center',
  },
  cycleStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  cycleStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  quickActionsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  calendarCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calendarGrid: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  calendarPlaceholder: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  predictionsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  predictionText: {
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  recentLogsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default CycleTrackerScreen;
