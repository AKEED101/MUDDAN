import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CycleStackParamList } from '../navigation/types';
import { computeCycleState, Cycle } from '../utils/cycle';
import { markPeriodEndToday } from '../services/cycles';

type CycleHomeScreenNavigationProp = NativeStackNavigationProp<CycleStackParamList, 'CycleHomeScreen'>;

const CycleHomeScreen = () => {
  const navigation = useNavigation<CycleHomeScreenNavigationProp>();
  
  // Mock data for demonstration - in real app this would come from Firestore
  const [cycles, setCycles] = useState<Cycle[]>([
    {
      id: 'cycle1',
      startDate: '2024-01-01T00:00:00.000Z',
      cycleLength: 28,
      periodLength: 5,
    },
    {
      id: 'cycle2',
      startDate: '2023-12-04T00:00:00.000Z',
      cycleLength: 28,
      periodLength: 5,
    },
  ]);

  const state = useMemo(() => 
    cycles && cycles.length ? computeCycleState(cycles) : null, 
    [cycles]
  );

  // Refresh hourly so day counters stay fresh
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  useEffect(() => {
    timer.current = setInterval(() => {
      // In real app, this would refetch from Firestore
      setCycles(prev => [...prev]);
    }, 60 * 60 * 1000);
    
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const onMarkEnd = async () => {
    if (!cycles?.[0]) return;
    
    try {
      // Mock user ID - in real app this would come from auth context
      const mockUserId = 'user123';
      await markPeriodEndToday({ 
        userId: mockUserId, 
        cycleId: cycles[0].id!, 
        startDateISO: cycles[0].startDate 
      });
      
      // Update local state to reflect the change
      setCycles(prev => prev.map((cycle, index) => 
        index === 0 
          ? { ...cycle, periodLength: new Date().getDate() - new Date(cycle.startDate).getDate() + 1 }
          : cycle
      ));
    } catch (error) {
      console.error('Error marking period end:', error);
    }
  };

  const handleNavigateTo = (screenName: keyof CycleStackParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#A855F7']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Cycle Tracker</Text>
        <Text style={styles.headerSubtitle}>Track your health journey</Text>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Cycle Card with Live Countdowns */}
        <View style={styles.currentCycleCard}>
          <Text style={styles.sectionTitle}>Current Cycle</Text>
          {state ? (
            <>
              <Text style={styles.dayOfCycle}>
                Day {state.dayOfCycle} of {state.avgCycleLen}
              </Text>
              
              {/* Period Status */}
              {state.onPeriod ? (
                <View style={styles.statusChip}>
                  <Ionicons name="water" size={16} color="#EF4444" />
                  <Text style={styles.statusText}>
                    {state.dToPeriodEnd === 0 
                      ? 'Today is the last day' 
                      : `${state.dToPeriodEnd} day${state.dToPeriodEnd === 1 ? '' : 's'} to end`
                    }
                  </Text>
                </View>
              ) : (
                <View style={styles.statusChip}>
                  <Ionicons name="calendar" size={16} color="#7C3AED" />
                  <Text style={styles.statusText}>
                    {`${Math.max(state.dToNextStart, 0)} day${Math.max(state.dToNextStart, 0) === 1 ? '' : 's'} to next period`}
                  </Text>
                </View>
              )}

              {/* Fertility Status */}
              {state.ovulation && (
                <View style={styles.statusChip}>
                  <Ionicons name="egg" size={16} color="#10B981" />
                  <Text style={styles.statusText}>
                    {state.dToFertileEnd >= 0 
                      ? (state.ovulation.startOf('day').diff(new Date(), 'day') >= 0 
                          ? `Ovulation in ${state.ovulation.startOf('day').diff(new Date(), 'day')} day(s)` 
                          : `Fertile window ends in ${state.dToFertileEnd} day(s)`)
                      : 'Fertile window passed'
                    }
                  </Text>
                </View>
              )}

              {/* Mark Today as Last Day Button */}
              {state.onPeriod && (
                <Pressable onPress={onMarkEnd} style={styles.markEndButton}>
                  <Text style={styles.markEndButtonText}>Mark today as last day</Text>
                </Pressable>
              )}
            </>
          ) : (
            <Text style={styles.noDataText}>Log your first period to start live tracking.</Text>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => handleNavigateTo('CalendarScreen')}
            >
              <LinearGradient
                colors={['#F59E0B', '#FBBF24']}
                style={styles.actionButtonGradient}
              >
                <Ionicons name="calendar" size={24} color="white" />
                <Text style={styles.actionButtonText}>Calendar</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => handleNavigateTo('InsightsScreen')}
            >
              <LinearGradient
                colors={['#8B5CF6', '#A78BFA']}
                style={styles.actionButtonGradient}
              >
                <Ionicons name="analytics" size={24} color="white" />
                <Text style={styles.actionButtonText}>Insights</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresCard}>
          <Text style={styles.sectionTitle}>Features</Text>
          <TouchableOpacity 
            style={styles.featureItem}
            onPress={() => handleNavigateTo('CycleTrackerScreen')}
          >
            <Ionicons name="pulse" size={24} color="#7C3AED" />
            <Text style={styles.featureText}>Cycle Tracking</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.featureItem}
            onPress={() => handleNavigateTo('CycleNotesScreen')}
          >
            <Ionicons name="document-text" size={24} color="#7C3AED" />
            <Text style={styles.featureText}>Cycle Notes</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.featureItem}
            onPress={() => handleNavigateTo('CycleRecordsScreen')}
          >
            <Ionicons name="stats-chart" size={24} color="#7C3AED" />
            <Text style={styles.featureText}>Records & History</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.featureItem}
            onPress={() => handleNavigateTo('LogPeriodScreen')}
          >
            <Ionicons name="water" size={24} color="#7C3AED" />
            <Text style={styles.featureText}>Log Period</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  currentCycleCard: {
    backgroundColor: 'white',
    borderRadius: 20,
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
  dayOfCycle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 16,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    fontWeight: '500',
  },
  markEndButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  markEndButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
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
  featuresCard: {
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
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    marginLeft: 16,
  },
});

export default CycleHomeScreen;
