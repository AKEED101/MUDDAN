import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CycleMonth, CycleData } from '../types';

const CycleRecordsScreen = () => {
  const navigation = useNavigation();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // Mock data for demonstration
  const cycleHistory: CycleMonth[] = [
    {
      month: 'March',
      year: 2024,
      cycles: [
        {
          id: '1',
          startDate: new Date('2024-03-10'),
          endDate: new Date('2024-03-14'),
          duration: 5,
          flow: 'medium',
          symptoms: ['cramps', 'tired', 'bloating'],
          painLevel: 3,
          medications: ['ibuprofen'],
          notes: 'Overall manageable period',
          tags: ['cramps', 'tired', 'bloating'],
        },
      ],
      notes: [
        {
          id: '1',
          date: new Date('2024-03-10'),
          text: 'Experienced mild cramps on day 2',
          tags: ['cramps', 'medication'],
        },
        {
          id: '2',
          date: new Date('2024-03-12'),
          text: 'Feeling better, flow reduced',
          tags: ['flow', 'mood'],
        },
      ],
      averageLength: 5,
      irregularities: ['Slightly longer than usual'],
    },
    {
      month: 'February',
      year: 2024,
      cycles: [
        {
          id: '2',
          startDate: new Date('2024-02-12'),
          endDate: new Date('2024-02-16'),
          duration: 5,
          flow: 'light',
          symptoms: ['tired'],
          painLevel: 1,
          medications: [],
          notes: 'Very light period this month',
          tags: ['light flow', 'tired'],
        },
      ],
      notes: [
        {
          id: '3',
          date: new Date('2024-02-12'),
          text: 'Started period, very light flow',
          tags: ['start', 'light flow'],
        },
      ],
      averageLength: 5,
      irregularities: ['Lighter than usual'],
    },
    {
      month: 'January',
      year: 2024,
      cycles: [
        {
          id: '3',
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-01-19'),
          duration: 5,
          flow: 'heavy',
          symptoms: ['cramps', 'back pain', 'tired'],
          painLevel: 4,
          medications: ['ibuprofen', 'heating pad'],
          notes: 'Heavy period with strong cramps',
          tags: ['heavy flow', 'cramps', 'back pain'],
        },
      ],
      notes: [
        {
          id: '4',
          date: new Date('2024-01-15'),
          text: 'Heavy period started, strong cramps',
          tags: ['start', 'heavy flow', 'cramps'],
        },
        {
          id: '5',
          date: new Date('2024-01-17'),
          text: 'Using heating pad for back pain',
          tags: ['back pain', 'treatment'],
        },
      ],
      averageLength: 5,
      irregularities: ['Heavier than usual', 'Stronger cramps'],
    },
  ];

  const handleMonthPress = (monthKey: string) => {
    setSelectedMonth(selectedMonth === monthKey ? null : monthKey);
  };

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'light': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'heavy': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getFlowIcon = (flow: string) => {
    switch (flow) {
      case 'light': return 'water-outline';
      case 'medium': return 'water';
      case 'heavy': return 'water';
      default: return 'water-outline';
    }
  };

  const renderSummaryStats = () => (
    <View style={styles.summaryStats}>
      <View style={styles.statCard}>
        <Ionicons name="calendar" size={24} color="#7C3AED" />
        <Text style={styles.statValue}>{cycleHistory.length}</Text>
        <Text style={styles.statLabel}>Total Cycles</Text>
      </View>
      
      <View style={styles.statCard}>
        <Ionicons name="time" size={24} color="#10B981" />
        <Text style={styles.statValue}>
          {Math.round(cycleHistory.reduce((acc, month) => acc + month.averageLength, 0) / cycleHistory.length)}
        </Text>
        <Text style={styles.statLabel}>Avg Length</Text>
      </View>
      
      <View style={styles.statCard}>
        <Ionicons name="document-text" size={24} color="#F59E0B" />
        <Text style={styles.statValue}>
          {cycleHistory.reduce((acc, month) => acc + month.notes.length, 0)}
        </Text>
        <Text style={styles.statLabel}>Total Notes</Text>
      </View>
      
      <View style={styles.statCard}>
        <Ionicons name="checkmark-circle" size={24} color="#10B981" />
        <Text style={styles.statValue}>
          {cycleHistory.filter(month => month.irregularities.length === 0).length}
        </Text>
        <Text style={styles.statLabel}>Regular</Text>
      </View>
    </View>
  );

  const renderMonthCard = (month: CycleMonth) => {
    const monthKey = `${month.month}-${month.year}`;
    const isExpanded = selectedMonth === monthKey;
    
    return (
      <View key={monthKey} style={styles.monthCard}>
        <TouchableOpacity
          style={styles.monthHeader}
          onPress={() => handleMonthPress(monthKey)}
          activeOpacity={0.7}
        >
          <View style={styles.monthInfo}>
            <Text style={styles.monthTitle}>{month.month} {month.year}</Text>
            <Text style={styles.monthSubtitle}>
              {month.cycles.length} cycle{month.cycles.length !== 1 ? 's' : ''} • {month.notes.length} note{month.notes.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#6B7280"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.monthDetails}>
            {month.cycles.map((cycle) => (
              <View key={cycle.id} style={styles.cycleCard}>
                <View style={styles.cycleHeader}>
                  <View style={styles.cycleDates}>
                    <Text style={styles.cycleDateLabel}>Period:</Text>
                    <Text style={styles.cycleDateValue}>
                      {cycle.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {cycle.endDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </Text>
                  </View>
                  <View style={styles.cycleDuration}>
                    <Text style={styles.cycleDurationText}>{cycle.duration} days</Text>
                  </View>
                </View>

                <View style={styles.cycleDetails}>
                  <View style={styles.cycleDetail}>
                    <Ionicons
                      name={getFlowIcon(cycle.flow)}
                      size={20}
                      color={getFlowColor(cycle.flow)}
                    />
                    <Text style={styles.cycleDetailText}>
                      {cycle.flow.charAt(0).toUpperCase() + cycle.flow.slice(1)} flow
                    </Text>
                  </View>

                  <View style={styles.cycleDetail}>
                    <Ionicons name="thermometer" size={20} color="#F59E0B" />
                    <Text style={styles.cycleDetailText}>
                      Pain level: {cycle.painLevel}/5
                    </Text>
                  </View>

                  {cycle.symptoms.length > 0 && (
                    <View style={styles.symptomsContainer}>
                      <Text style={styles.symptomsLabel}>Symptoms:</Text>
                      <View style={styles.symptomsList}>
                        {cycle.symptoms.map((symptom, index) => (
                          <View key={index} style={styles.symptomTag}>
                            <Text style={styles.symptomText}>{symptom}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {cycle.medications && cycle.medications.length > 0 && (
                    <View style={styles.medicationsContainer}>
                      <Text style={styles.medicationsLabel}>Medications:</Text>
                      <Text style={styles.medicationsText}>{cycle.medications.join(', ')}</Text>
                    </View>
                  )}

                  {cycle.notes && (
                    <View style={styles.cycleNotes}>
                      <Text style={styles.cycleNotesLabel}>Notes:</Text>
                      <Text style={styles.cycleNotesText}>{cycle.notes}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}

            {month.irregularities.length > 0 && (
              <View style={styles.irregularitiesContainer}>
                <Text style={styles.irregularitiesLabel}>Irregularities:</Text>
                {month.irregularities.map((irregularity, index) => (
                  <Text key={index} style={styles.irregularityText}>
                    • {irregularity}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="calendar-outline" size={48} color="#D1D5DB" />
      <Text style={styles.emptyStateText}>No cycle records yet</Text>
      <Text style={styles.emptyStateSubtext}>
        Start tracking your cycles to see your history here
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#7C3AED" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cycle Records</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSummaryStats()}
        
        <View style={styles.recordsContainer}>
          <Text style={styles.recordsTitle}>Monthly Records</Text>
          {cycleHistory.length === 0 ? (
            renderEmptyState()
          ) : (
            cycleHistory.map(renderMonthCard)
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  recordsContainer: {
    padding: 20,
  },
  recordsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  monthCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  monthInfo: {
    flex: 1,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  monthSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  monthDetails: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cycleCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cycleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cycleDates: {
    flex: 1,
  },
  cycleDateLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  cycleDateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  cycleDuration: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  cycleDurationText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cycleDetails: {
    gap: 12,
  },
  cycleDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cycleDetailText: {
    fontSize: 14,
    color: '#374151',
  },
  symptomsContainer: {
    marginTop: 8,
  },
  symptomsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  symptomTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  symptomText: {
    fontSize: 12,
    color: '#92400E',
  },
  medicationsContainer: {
    marginTop: 8,
  },
  medicationsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  medicationsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  cycleNotes: {
    marginTop: 8,
  },
  cycleNotesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  cycleNotesText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  irregularitiesContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  irregularitiesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 8,
  },
  irregularityText: {
    fontSize: 14,
    color: '#991B1B',
    marginBottom: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default CycleRecordsScreen;
