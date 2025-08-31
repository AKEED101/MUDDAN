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
import OverflowMenu from '../components/OverflowMenu';
import ChartCard from '../components/ChartCard';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

type InsightsScreenNavigationProp = NativeStackNavigationProp<CycleStackParamList, 'InsightsScreen'>;

const InsightsScreen = () => {
  const navigation = useNavigation<InsightsScreenNavigationProp>();

  // Mock data for charts
  const cycleLengthData = [
    { x: 'Jan', y: 28 },
    { x: 'Feb', y: 29 },
    { x: 'Mar', y: 28 },
    { x: 'Apr', y: 27 },
    { x: 'May', y: 28 },
    { x: 'Jun', y: 29 },
  ];

  const periodLengthData = [
    { x: '3 days', y: 2 },
    { x: '4 days', y: 3 },
    { x: '5 days', y: 8 },
    { x: '6 days', y: 4 },
    { x: '7 days', y: 1 },
  ];

  const symptomData = [
    { x: 'Cramps', y: 35 },
    { x: 'Bloating', y: 25 },
    { x: 'Fatigue', y: 20 },
    { x: 'Mood swings', y: 15 },
    { x: 'Other', y: 5 },
  ];

  const handleExportPDF = async () => {
    try {
      Alert.alert('Exporting', 'Generating PDF...');
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Cycle Insights Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; color: #7C3AED; margin-bottom: 30px; }
            .section { margin-bottom: 25px; }
            .section h2 { color: #374151; border-bottom: 2px solid #E5E7EB; padding-bottom: 10px; }
            .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
            .stat-item { text-align: center; padding: 15px; background: #F8FAFC; border-radius: 8px; }
            .stat-number { font-size: 24px; font-weight: bold; color: #7C3AED; }
            .stat-label { color: #6B7280; margin-top: 5px; }
            .summary { background: #FEF3C7; padding: 20px; border-radius: 8px; border-left: 4px solid #F59E0B; }
            .notes-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .notes-table th, .notes-table td { border: 1px solid #E5E7EB; padding: 8px; text-align: left; }
            .notes-table th { background: #F9FAFB; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Cycle Insights Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="section">
            <h2>Key Statistics</h2>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">28.5</div>
                <div class="stat-label">Avg Cycle Length</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">5.2</div>
                <div class="stat-label">Avg Period Length</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">14.3</div>
                <div class="stat-label">Avg Ovulation Day</div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2>Summary Note</h2>
            <div class="summary">
              <p><strong>Your cycle has been remarkably consistent over the past 6 months, averaging 28.5 days with minimal variation. 
              Period length is stable at 5.2 days, and ovulation timing is predictable around day 14.3. 
              This consistency suggests good hormonal balance and reproductive health.</strong></p>
            </div>
          </div>
          
          <div class="section">
            <h2>Recent Notes</h2>
            <table class="notes-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Source</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jan 15, 2024</td>
                  <td>Period Tracker</td>
                  <td>Heavy flow today, experiencing cramps. Taking pain medication.</td>
                </tr>
                <tr>
                  <td>Jan 14, 2024</td>
                  <td>Cycle Notes</td>
                  <td>Feeling tired and moody. Noticed some bloating.</td>
                </tr>
                <tr>
                  <td>Jan 13, 2024</td>
                  <td>Period Tracker</td>
                  <td>Light flow, feeling better today.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Share Cycle Insights PDF',
        });
      } else {
        Alert.alert('Success', 'PDF generated successfully! Check your files.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  const handleShareSummary = () => {
    Alert.alert(
      'Share Summary',
      'Share your cycle insights with your healthcare provider or save for personal records.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => {
          Alert.alert('Success', 'Sharing functionality coming soon!');
        }}
      ]
    );
  };

  const handleFilters = () => {
    Alert.alert('Filters', 'Customize your data view and time range.');
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
        <Text style={styles.headerTitle}>Insights</Text>
        <OverflowMenu
          onExportPDF={handleExportPDF}
          onShareSummary={handleShareSummary}
          onFilters={handleFilters}
        />
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Note Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Summary Note</Text>
          <View style={styles.summaryContent}>
            <Ionicons name="bulb" size={20} color="#F59E0B" />
            <Text style={styles.summaryText}>
              Your cycle has been remarkably consistent over the past 6 months, averaging 28.5 days with minimal variation. 
              Period length is stable at 5.2 days, and ovulation timing is predictable around day 14.3. 
              This consistency suggests good hormonal balance and reproductive health.
            </Text>
          </View>
        </View>

        {/* Charts */}
        <ChartCard
          title="Cycle Length Over Time"
          type="line"
          data={cycleLengthData}
          description="Track your cycle length variations month by month"
        />

        <ChartCard
          title="Period Length Distribution"
          type="bar"
          data={periodLengthData}
          description="See how your period length varies across cycles"
        />

        <ChartCard
          title="Symptom Categories"
          type="pie"
          data={symptomData}
          description="Breakdown of symptoms you've experienced"
        />

        {/* Statistics */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Cycle Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>28.5</Text>
              <Text style={styles.statLabel}>Avg Cycle Length</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5.2</Text>
              <Text style={styles.statLabel}>Avg Period Length</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>14.3</Text>
              <Text style={styles.statLabel}>Avg Ovulation Day</Text>
            </View>
          </View>
        </View>

        {/* Predictions */}
        <View style={styles.predictionsCard}>
          <Text style={styles.sectionTitle}>Predictions</Text>
          <View style={styles.predictionItem}>
            <Ionicons name="calendar" size={20} color="#7C3AED" />
            <Text style={styles.predictionText}>Next period: 3 days</Text>
          </View>
        </View>

        {/* Trends */}
        <View style={styles.trendsCard}>
          <Text style={styles.sectionTitle}>Trends</Text>
          <Text style={styles.placeholderText}>Trend analysis coming soon!</Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  summaryText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginLeft: 12,
  },
  statsCard: {
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
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
  trendsCard: {
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

export default InsightsScreen;
