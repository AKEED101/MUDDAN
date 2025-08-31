import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleCycleTracker = () => {
    navigation.navigate('CycleTracker' as never);
  };

  const handlePregnancy = () => {
    // TODO: Navigate to Pregnancy screen
    console.log('Pregnancy tracker');
  };

  const handleConsultants = () => {
    // TODO: Navigate to Consultants screen
    console.log('Consultants');
  };

  const handleExplore = () => {
    // TODO: Navigate to Explore screen
    console.log('Explore');
  };

  const renderFeatureCard = (
    icon: string,
    title: string,
    subtitle: string,
    color: string,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={[styles.featureCard, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.featureCardContent}>
        <Ionicons name={icon as any} size={32} color="white" />
        <Text style={styles.featureCardTitle}>{title}</Text>
        <Text style={styles.featureCardSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTodayTip = () => (
    <View style={styles.todayTipCard}>
      <LinearGradient
        colors={['#7C3AED', '#A855F7']}
        style={styles.todayTipGradient}
      >
        <View style={styles.todayTipContent}>
          <Text style={styles.todayTipLabel}>Today's Tip</Text>
          <Text style={styles.todayTipTitle}>
            Stay Hydrated During Your Cycle
          </Text>
          <Text style={styles.todayTipDescription}>
            Drinking plenty of water can help reduce bloating and cramps
          </Text>
          <TouchableOpacity style={styles.todayTipButton}>
            <Text style={styles.todayTipButtonText}>Read Article</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  const renderExplorePreview = () => (
    <View style={styles.explorePreview}>
      <View style={styles.exploreHeader}>
        <Text style={styles.exploreTitle}>Explore</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.exploreCard}>
            <View style={styles.exploreCardImage} />
            <View style={styles.exploreCardContent}>
              <Text style={styles.exploreCardTitle}>
                Healthy Eating During Pregnancy
              </Text>
              <Text style={styles.exploreCardCategory}>Health</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#7C3AED', '#A855F7']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>MUDDAN</Text>
        <Text style={styles.headerSubtitle}>Your Wellness Companion</Text>
      </LinearGradient>

      {/* Feature Grid */}
      <View style={styles.featureGrid}>
        {renderFeatureCard(
          'calendar',
          'Cycle',
          'Track your period',
          '#EC4899',
          handleCycleTracker
        )}
        {renderFeatureCard(
          'heart',
          'Pregnancy',
          'Weekly updates',
          '#F59E0B',
          handlePregnancy
        )}
        {renderFeatureCard(
          'medical',
          'Consultants',
          'Expert advice',
          '#10B981',
          handleConsultants
        )}
        {renderFeatureCard(
          'compass',
          'Explore',
          'Health articles',
          '#3B82F6',
          handleExplore
        )}
      </View>

      {/* Today's Tip */}
      {renderTodayTip()}

      {/* Explore Preview */}
      {renderExplorePreview()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 16,
  },
  featureCard: {
    width: (width - 56) / 2,
    height: 120,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureCardContent: {
    alignItems: 'center',
  },
  featureCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  featureCardSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    textAlign: 'center',
  },
  todayTipCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  todayTipGradient: {
    padding: 24,
  },
  todayTipContent: {
    alignItems: 'center',
  },
  todayTipLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  todayTipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  todayTipDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  todayTipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  todayTipButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  explorePreview: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exploreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '600',
  },
  exploreCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 12,
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
  exploreCardImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#E5E7EB',
  },
  exploreCardContent: {
    padding: 16,
  },
  exploreCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 18,
  },
  exploreCardCategory: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '500',
  },
});

export default HomeScreen;
