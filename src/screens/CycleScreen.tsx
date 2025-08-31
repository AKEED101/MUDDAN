import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type CycleScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CycleScreen'>;

const CycleScreen: React.FC = () => {
  const navigation = useNavigation<CycleScreenNavigationProp>();
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedWeek, setSelectedWeek] = useState('week1');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const cycleFeatures = [
    {
      id: 'period-tracker',
      title: 'Period Tracker',
      description: 'Log your period with love and care 💜',
      icon: 'heart',
      gradient: ['#8B5CF6', '#A78BFA'] as const,
      action: 'Track Today',
    },
    {
      id: 'cycle-calendar',
      title: 'Cycle Calendar',
      description: 'Visualize your beautiful cycle patterns 📅',
      icon: 'calendar-outline',
      gradient: ['#06B6D4', '#22D3EE'] as const,
      action: 'View Calendar',
    },
    {
      id: 'cycle-notes',
      title: 'Cycle Notes',
      description: 'Express how you\'re feeling today ✨',
      icon: 'create',
      gradient: ['#EC4899', '#F472B6'] as const,
      action: 'Write Note',
    },
  ];

  // Mock user data - in real app this would come from auth context
  const userName = 'Sarah'; // This would be dynamic based on user login
  
  // Mock cycle data for demonstration - in real app this would come from the cycle service
  const currentCycle = {
    day: 12,
    totalDays: 28,
    nextPeriod: 'April 28, 2024',
    phase: 'Follicular Phase',
    phaseDescription: 'Track your cycle phases and fertility',
    // Live counting data
    daysToNextPeriod: 16,
    daysToOvulation: 2,
    fertileWindowEnds: 7,
    isOnPeriod: false,
    daysInPeriod: 0,
  };

  // Personalized motivational messages based on cycle situation
  const getMotivationalMessage = () => {
    if (currentCycle.isOnPeriod) {
      return {
        title: `You're doing amazing, ${userName}! 💪`,
        subtitle: 'Your body is working perfectly. Remember, this too shall pass.',
        message: 'Take it easy today. You deserve rest, comfort, and maybe some chocolate! 🍫',
        color: '#EC4899',
        gradient: ['#EC4899', '#F472B6'] as const,
      };
    } else if (currentCycle.daysToOvulation > 0 && currentCycle.daysToOvulation <= 5) {
      return {
        title: `Your energy is rising, ${userName}! ✨`,
        subtitle: 'You\'re approaching your most fertile and energetic time.',
        message: 'This is your power phase! Channel this energy into your goals and dreams.',
        color: '#10B981',
        gradient: ['#10B981', '#34D399'] as const,
      };
    } else if (currentCycle.daysToNextPeriod <= 7) {
      return {
        title: `Preparing for your cycle, ${userName} 🌸`,
        subtitle: 'Your body is getting ready for a new beginning.',
        message: 'Listen to your body\'s signals. You might feel more sensitive or intuitive now.',
        color: '#8B5CF6',
        gradient: ['#8B5CF6', '#A78BFA'] as const,
      };
    } else {
      return {
        title: `You're in your flow, ${userName}! 🌊`,
        subtitle: 'Your body is in perfect harmony.',
        message: 'This is a great time for creativity, planning, and self-care.',
        color: '#06B6D4',
        gradient: ['#06B6D4', '#22D3EE'] as const,
      };
    }
  };

  const motivation = getMotivationalMessage();

  const recentPeriods = [
    { date: 'March 30, 2024', flow: 'Medium', symptoms: ['Cramps', 'Fatigue'] },
    { date: 'March 2, 2024', flow: 'Heavy', symptoms: ['Cramps', 'Bloating', 'Mood swings'] },
    { date: 'February 2, 2024', flow: 'Medium', symptoms: ['Cramps'] },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Futuristic Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.hexagonRow}>
          <View style={styles.hexagon} />
          <View style={styles.hexagon} />
          <View style={styles.hexagon} />
        </View>
        <View style={styles.hexagonRow}>
          <View style={styles.hexagon} />
          <View style={styles.hexagon} />
          <View style={styles.hexagon} />
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Personalized Welcome Header */}
        <LinearGradient
          colors={motivation.gradient}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>{motivation.title}</Text>
              <Text style={styles.headerSubtitle}>{motivation.subtitle}</Text>
              <Text style={styles.headerMessage}>{motivation.message}</Text>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                style={styles.backButtonGradient}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Current Cycle Status */}
        <View style={styles.cycleStatusSection}>
          <Text style={styles.sectionTitle}>Current Cycle</Text>
          <View style={styles.cycleStatusCard}>
            <LinearGradient
              colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
              style={styles.cycleStatusGradient}
            >
              <View style={styles.cycleProgressRow}>
                <View style={styles.cycleProgress}>
                  <Text style={styles.cycleDay}>{currentCycle.day}</Text>
                  <Text style={styles.cycleDayLabel}>Day</Text>
                </View>
                <View style={styles.cycleProgress}>
                  <Text style={styles.cycleTotal}>{currentCycle.totalDays}</Text>
                  <Text style={styles.cycleTotalLabel}>Total Days</Text>
                </View>
                <View style={styles.cycleProgress}>
                  <Text style={styles.cyclePhase}>{currentCycle.phase}</Text>
                  <Text style={styles.cyclePhaseLabel}>Phase</Text>
                </View>
              </View>
              <Text style={styles.cycleDescription}>{currentCycle.phaseDescription}</Text>
              
              {/* Personalized Cycle Status */}
              <View style={styles.cycleStatusMessage}>
                <View style={styles.statusIconContainer}>
                  <Text style={styles.statusIcon}>
                    {currentCycle.isOnPeriod ? '💜' : '🌸'}
                  </Text>
                </View>
                <Text style={styles.cycleStatusText}>
                  {currentCycle.isOnPeriod 
                    ? `You're on day ${currentCycle.daysInPeriod} of your period. Take care of yourself! 💜`
                    : `You're ${currentCycle.daysToNextPeriod} days away from your next cycle. You're doing great! 🌸`
                  }
                </Text>
                <View style={styles.statusSparkle}>
                  <Text style={styles.sparkleText}>✨</Text>
                </View>
              </View>
              
              <Text style={styles.nextPeriod}>Next period: {currentCycle.nextPeriod}</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Personalized Welcome Section - Floating Motivational Card */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeCardContainer}>
            <LinearGradient
              colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
              style={styles.welcomeCard}
            >
                             {/* Floating Elements */}
               <View style={styles.floatingHeart1}>
                 <Text style={styles.floatingEmojiText}>💖</Text>
               </View>
               <View style={styles.floatingHeart2}>
                 <Text style={styles.floatingEmojiText}>✨</Text>
               </View>
               <View style={styles.floatingHeart3}>
                 <Text style={styles.floatingEmojiText}>🌸</Text>
               </View>
              
              <View style={styles.welcomeContent}>
                <Text style={styles.welcomeTitle}>Welcome back, {userName}! 👋</Text>
                <Text style={styles.welcomeMessage}>
                  Today is a perfect day to check in with yourself and track how you're feeling. 
                  Remember, every phase of your cycle brings unique gifts and opportunities.
                </Text>
                <View style={styles.welcomeEmoji}>
                  <Text style={styles.emojiText}>💖</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Cycle Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Your Cycle Tools</Text>
          <View style={styles.featuresGrid}>
            {cycleFeatures.map((feature) => (
              <TouchableOpacity 
                key={feature.id} 
                style={styles.featureCard}
                onPress={() => {
                  switch (feature.id) {
                    case 'period-tracker':
                      navigation.navigate('LogPeriodScreen');
                      break;
                    case 'cycle-calendar':
                      navigation.navigate('CycleTrackerScreen');
                      break;
                    case 'cycle-notes':
                      navigation.navigate('CycleNotesScreen');
                      break;

                    default:
                      break;
                  }
                }}
              >
                <LinearGradient
                  colors={feature.gradient}
                  style={styles.featureGradient}
                >
                  <View style={styles.featureIconContainer}>
                    <Ionicons name={feature.icon as any} size={32} color="white" />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureSubtitle}>{feature.description}</Text>
                  <TouchableOpacity 
                    style={styles.featureActionButton}
                    onPress={() => {
                      switch (feature.id) {
                        case 'period-tracker':
                          navigation.navigate('LogPeriodScreen');
                          break;
                        case 'cycle-calendar':
                          navigation.navigate('CycleTrackerScreen');
                          break;
                        case 'cycle-notes':
                          navigation.navigate('CycleNotesScreen');
                          break;

                        default:
                          break;
                      }
                    }}
                  >
                    <Text style={styles.featureActionText}>{feature.action}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Periods */}
        <View style={styles.recentPeriodsSection}>
          <Text style={styles.sectionTitle}>Recent Periods</Text>
          <View style={styles.recentPeriodsCard}>
            {recentPeriods.map((period, index) => (
              <View key={index} style={styles.periodItem}>
                <View style={styles.periodDate}>
                  <Text style={styles.periodDateText}>{period.date}</Text>
                  <View style={styles.periodFlowBadge}>
                    <Text style={styles.periodFlowText}>{period.flow}</Text>
                  </View>
                </View>
                <View style={styles.periodSymptoms}>
                  {period.symptoms.map((symptom, symptomIndex) => (
                    <View key={symptomIndex} style={styles.symptomTag}>
                      <Text style={styles.symptomText}>{symptom}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

                 {/* Supportive Message - Floating Motivational Card */}
         <View style={styles.supportSection}>
           <View style={styles.supportCardContainer}>
             <LinearGradient
               colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
               style={styles.supportCard}
             >
                               {/* Floating Elements */}
                <View style={styles.floatingStar1}>
                  <Text style={styles.floatingEmojiText}>⭐</Text>
                </View>
                <View style={styles.floatingStar2}>
                  <Text style={styles.floatingEmojiText}>🌟</Text>
                </View>
                <View style={styles.floatingStar3}>
                  <Text style={styles.floatingEmojiText}>💫</Text>
                </View>
               
               <View style={styles.supportContent}>
                 <Text style={styles.supportTitle}>You're doing amazing! 🌟</Text>
                 <Text style={styles.supportMessage}>
                   Every woman's cycle is unique and beautiful. Listen to your body, 
                   honor your feelings, and remember that you're stronger than you know.
                 </Text>
                 <View style={styles.supportEmojis}>
                   <Text style={styles.supportEmoji}>💖</Text>
                   <Text style={styles.supportEmoji}>🌸</Text>
                   <Text style={styles.supportEmoji}>✨</Text>
                 </View>
               </View>
             </LinearGradient>
           </View>
         </View>

         {/* Quick Actions */}
         <View style={styles.quickActionsSection}>
           <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('LogPeriodScreen')}
            >
              <LinearGradient
                colors={['#8B5CF6', '#A78BFA']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.quickActionText}>Log Today</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('CycleRecordsScreen')}
            >
              <LinearGradient
                colors={['#06B6D4', '#22D3EE']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="analytics" size={24} color="white" />
                <Text style={styles.quickActionText}>View Insights</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  headerMessage: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 22,
    fontStyle: 'italic',
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.3,
  },
  backButton: {
    width: 48,
    height: 48,
  },
  backButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cycleStatusSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  cycleStatusCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    backgroundColor: 'white',
  },
  cycleStatusGradient: {
    padding: 24,
  },
  cycleProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  cycleProgress: {
    alignItems: 'center',
  },
  cycleDay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 4,
  },
  cycleDayLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  cycleTotal: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4FACFE',
    marginBottom: 4,
  },
  cycleTotalLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  cyclePhase: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A8EDEA',
    marginBottom: 4,
    textAlign: 'center',
  },
  cyclePhaseLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  cycleDescription: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  nextPeriod: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  liveCountingContainer: {
    marginBottom: 16,
    gap: 8,
  },
  countdownChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  countdownText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
  },
  cycleStatusMessage: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cycleStatusText: {
    fontSize: 18,
    color: '#7C3AED',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '600',
    fontFamily: 'System',
    textShadowColor: 'rgba(124, 58, 237, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.2,
    flex: 1,
    marginHorizontal: 16,
  },
  statusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#7C3AED',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  statusIcon: {
    fontSize: 20,
  },
  statusSparkle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sparkleText: {
    fontSize: 18,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  welcomeCardContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  welcomeCard: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
    borderWidth: 2,
    borderColor: 'rgba(236, 72, 153, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  welcomeContent: {
    padding: 28,
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#EC4899',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'System',
    textShadowColor: 'rgba(236, 72, 153, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  welcomeMessage: {
    fontSize: 18,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20,
    fontWeight: '500',
    fontFamily: 'System',
  },
  welcomeEmoji: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#EC4899',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  emojiText: {
    fontSize: 28,
  },
  // Floating Elements for Welcome Card
  floatingHeart1: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 24,
    zIndex: 1,
    opacity: 0.8,
    transform: [{ rotate: '-15deg' }],
  },
  floatingHeart2: {
    position: 'absolute',
    top: 40,
    right: 30,
    fontSize: 20,
    zIndex: 1,
    opacity: 0.6,
    transform: [{ rotate: '15deg' }],
  },
  floatingHeart3: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    fontSize: 22,
    zIndex: 1,
    opacity: 0.7,
    transform: [{ rotate: '10deg' }],
  },
  floatingEmojiText: {
    fontSize: 24,
    color: '#EC4899',
  },
  supportSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  supportCardContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  supportCard: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  supportContent: {
    padding: 28,
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  supportTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#8B5CF6',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'System',
    textShadowColor: 'rgba(139, 92, 246, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  supportMessage: {
    fontSize: 18,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20,
    fontWeight: '500',
    fontFamily: 'System',
  },
  supportEmojis: {
    flexDirection: 'row',
    gap: 20,
  },
  supportEmoji: {
    fontSize: 32,
    textShadowColor: 'rgba(139, 92, 246, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  // Floating Elements for Support Card
  floatingStar1: {
    position: 'absolute',
    top: 25,
    left: 25,
    fontSize: 28,
    zIndex: 1,
    opacity: 0.8,
    transform: [{ rotate: '-20deg' }],
  },
  floatingStar2: {
    position: 'absolute',
    top: 45,
    right: 35,
    fontSize: 24,
    zIndex: 1,
    opacity: 0.6,
    transform: [{ rotate: '25deg' }],
  },
  floatingStar3: {
    position: 'absolute',
    bottom: 35,
    left: 35,
    fontSize: 26,
    zIndex: 1,
    opacity: 0.7,
    transform: [{ rotate: '15deg' }],
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  featuresGrid: {
    gap: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  featureGradient: {
    padding: 16,
    alignItems: 'center',
    textAlign: 'center',
  },
  featureIconContainer: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 6,
    textAlign: 'center',
    lineHeight: 16,
  },
  featureDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  featureActionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'center',
  },
  featureActionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  recentPeriodsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  recentPeriodsCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  periodItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  periodDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  periodDateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  periodFlowBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  periodFlowText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '500',
  },
  periodSymptoms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomTag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  symptomText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '500',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    backgroundColor: 'white',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  quickActionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
  },
  hexagonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  hexagon: {
    width: 40,
    height: 40,
    backgroundColor: '#6366F1',
    transform: [{ rotate: '45deg' }],
  },
});

export default CycleScreen;
