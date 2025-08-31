import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface ChartCardProps {
  title: string;
  type: 'line' | 'bar' | 'pie';
  data: any[];
  height?: number;
  description?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  type,
  data,
  height = 200,
  description,
}) => {
  const renderChart = () => {
    // For now, show placeholder charts until victory-native is properly configured
    switch (type) {
      case 'line':
        return (
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>Line Chart</Text>
            <Text style={styles.chartPlaceholderSubtext}>Cycle length over time</Text>
          </View>
        );

      case 'bar':
        return (
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>Bar Chart</Text>
            <Text style={styles.chartPlaceholderSubtext}>Period length distribution</Text>
          </View>
        );

      case 'pie':
        return (
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>Pie Chart</Text>
            <Text style={styles.chartPlaceholderSubtext}>Symptom categories</Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.chartContainer}>
        {renderChart()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    height: '100%',
  },
  chartPlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 8,
  },
  chartPlaceholderSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default ChartCard;
