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
import { useI18n } from '../i18n';

const { width } = Dimensions.get('window');

interface PregnancyScreenProps {
  navigation: any;
}

const PregnancyScreen: React.FC<PregnancyScreenProps> = ({ navigation }) => {
  const { t } = useI18n();
  const [selectedWeek, setSelectedWeek] = useState('week12');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock user data - in real app this would come from auth context
  const userName = 'Sarah'; // This would be dynamic based on user login

  const pregnancyFeatures = [
    {
      id: 'week-overview',
      title: t('weekOverview'),
      description: 'See your baby\'s development and your body changes',
      icon: 'calendar',
      gradient: ['#EC4899', '#F472B6'] as const,
      action: t('viewWeek'),
    },
    {
      id: 'baby-development',
      title: t('babyDevelopment'),
      description: 'Learn about your baby\'s size and milestones',
      icon: 'heart',
      gradient: ['#8B5CF6', '#A78BFA'] as const,
      action: t('learnMore'),
    },
    {
      id: 'health-tips',
      title: t('healthTips'),
      description: 'Get personalized nutrition and exercise advice',
      icon: 'medical',
      gradient: ['#06B6D4', '#22D3EE'] as const,
      action: t('getTips'),
    },
    {
      id: 'appointments',
      title: t('appointments'),
      description: 'Schedule and track prenatal appointments',
      icon: 'calendar-outline',
      gradient: ['#10B981', '#34D399'] as const,
      action: t('schedule'),
    },
  ];

  const currentWeek = {
    week: 12,
    trimester: 'First Trimester',
    babySize: 'Lime',
    babyLength: '5.4 cm',
    babyWeight: '14 grams',
    description: 'Your baby is now fully formed with all major organs in place!',
  };

  // Personalized motivational messages based on pregnancy week
  const getPregnancyMotivation = () => {
    if (currentWeek.week <= 12) {
      return {
        title: `You're creating magic, ${userName}! ✨`,
        subtitle: 'The first trimester is a time of incredible transformation.',
        message: 'Every day, you\'re growing a tiny human. You\'re already an amazing mother! 💖',
        color: '#EC4899',
        gradient: ['#EC4899', '#F472B6'] as const,
      };
    } else if (currentWeek.week <= 26) {
      return {
        title: `You're glowing, ${userName}! 🌟`,
        subtitle: 'The second trimester brings energy and the joy of feeling your baby move.',
        message: 'Your body is doing something miraculous. Trust in your strength! 🌸',
        color: '#8B5CF6',
        gradient: ['#8B5CF6', '#A78BFA'] as const,
      };
    } else {
      return {
        title: `Almost there, ${userName}! 🎉`,
        subtitle: 'You\'re in the final stretch of this incredible journey.',
        message: 'You\'ve come so far. Soon you\'ll hold your precious little one! 👶',
        color: '#10B981',
        gradient: ['#10B981', '#34D399'] as const,
      };
    }
  };

  const motivation = getPregnancyMotivation();

  const weeklyMilestones = [
    { week: 8, milestone: 'Heart starts beating', icon: 'heart', gradient: ['#EC4899', '#F472B6'] as const },
    { week: 12, milestone: 'All organs formed', icon: 'medical', gradient: ['#06B6D4', '#22D3EE'] as const },
    { week: 16, milestone: 'Gender can be determined', icon: 'person', gradient: ['#8B5CF6', '#A78BFA'] as const },
    { week: 20, milestone: 'Halfway there!', icon: 'star', gradient: ['#10B981', '#34D399'] as const },
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

                 {/* Personalized Welcome Section - Floating Motivational Card */}
         <View style={styles.welcomeSection}>
           <View style={styles.welcomeCardContainer}>
             <LinearGradient
               colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
               style={styles.welcomeCard}
             >
                               {/* Floating Elements */}
                <View style={styles.floatingBaby1}>
                  <Text style={styles.floatingEmojiText}>👶</Text>
                </View>
                <View style={styles.floatingBaby2}>
                  <Text style={styles.floatingEmojiText}>💝</Text>
                </View>
                <View style={styles.floatingBaby3}>
                  <Text style={styles.floatingEmojiText}>🌟</Text>
                </View>
               
               <View style={styles.welcomeContent}>
                 <Text style={styles.welcomeTitle}>You're creating life, {userName}! ✨</Text>
                 <Text style={styles.welcomeMessage}>
                   Every kick, every flutter, every moment is a miracle. 
                   You're not just growing a baby - you're growing a future.
                 </Text>
                 <View style={styles.welcomeEmoji}>
                   <Text style={styles.emojiText}>💖</Text>
                 </View>
               </View>
             </LinearGradient>
           </View>
         </View>

         {/* Current Week Status */}
         <View style={styles.weekStatusSection}>
           <Text style={styles.sectionTitle}>{t('week')} {currentWeek.week}</Text>
          <View style={styles.weekStatusCard}>
            <LinearGradient
              colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
              style={styles.weekStatusGradient}
            >
              <View style={styles.weekHeader}>
                <Text style={styles.weekNumber}>{t('week')} {currentWeek.week}</Text>
                <Text style={styles.trimester}>{currentWeek.trimester}</Text>
              </View>
              <View style={styles.babyInfoRow}>
                <View style={styles.babyInfo}>
                  <Text style={styles.babySizeLabel}>{t('babySize')}</Text>
                  <Text style={styles.babySize}>{currentWeek.babySize}</Text>
                </View>
                <View style={styles.babyInfo}>
                  <Text style={styles.babyLengthLabel}>{t('length')}</Text>
                  <Text style={styles.babyLength}>{currentWeek.babyLength}</Text>
                </View>
                <View style={styles.babyInfo}>
                  <Text style={styles.babyWeightLabel}>{t('weight')}</Text>
                  <Text style={styles.babyWeight}>{currentWeek.babyWeight}</Text>
                </View>
              </View>
              <Text style={styles.weekDescription}>{currentWeek.description}</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Pregnancy Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Track & Learn</Text>
          <View style={styles.featuresGrid}>
            {pregnancyFeatures.map((feature) => (
              <TouchableOpacity key={feature.id} style={styles.featureCard}>
                <LinearGradient
                  colors={feature.gradient}
                  style={styles.featureGradient}
                >
                  <View style={styles.featureIconContainer}>
                    <Ionicons name={feature.icon as any} size={32} color="white" />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureSubtitle}>{feature.description}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                  <TouchableOpacity style={styles.featureActionButton}>
                    <Text style={styles.featureActionText}>{feature.action}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weekly Milestones */}
        <View style={styles.milestonesSection}>
          <Text style={styles.sectionTitle}>Weekly Milestones</Text>
          <View style={styles.milestonesCard}>
            {weeklyMilestones.map((milestone, index) => (
              <View key={index} style={styles.milestoneItem}>
                <LinearGradient
                  colors={milestone.gradient}
                  style={styles.milestoneIconGradient}
                >
                  <Ionicons name={milestone.icon as any} size={20} color="white" />
                </LinearGradient>
                <View style={styles.milestoneContent}>
                  <Text style={styles.milestoneWeek}>Week {milestone.week}</Text>
                  <Text style={styles.milestoneText}>{milestone.milestone}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
                         <TouchableOpacity style={styles.quickActionCard}>
               <LinearGradient
                 colors={['#EC4899', '#F472B6']}
                 style={styles.quickActionGradient}
               >
                 <Ionicons name="add" size={24} color="white" />
                 <Text style={styles.quickActionText}>Log Symptoms</Text>
               </LinearGradient>
             </TouchableOpacity>
             <TouchableOpacity style={styles.quickActionCard}>
               <LinearGradient
                 colors={['#8B5CF6', '#A78BFA']}
                 style={styles.quickActionGradient}
               >
                 <Ionicons name="calendar" size={24} color="white" />
                 <Text style={styles.quickActionText}>Book Appointment</Text>
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
  // Welcome Section Styles
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
  floatingBaby1: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 24,
    zIndex: 1,
    opacity: 0.8,
    transform: [{ rotate: '-15deg' }],
  },
  floatingBaby2: {
    position: 'absolute',
    top: 40,
    right: 30,
    fontSize: 20,
    zIndex: 1,
    opacity: 0.6,
    transform: [{ rotate: '15deg' }],
  },
  floatingBaby3: {
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
  weekStatusSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  weekStatusCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    backgroundColor: 'white',
  },
  weekStatusGradient: {
    padding: 24,
  },
  weekHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weekNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A8E6CF',
    marginBottom: 4,
  },
  trimester: {
    fontSize: 18,
    color: '#7FCDCD',
    fontWeight: '600',
  },
  babyInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  babyInfo: {
    alignItems: 'center',
  },
  babySizeLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  babySize: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B9D',
  },
  babyLengthLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  babyLength: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4FACFE',
  },
  babyWeightLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  babyWeight: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A8EDEA',
  },
  weekDescription: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    backgroundColor: 'white',
  },
  featureGradient: {
    padding: 20,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
    lineHeight: 20,
  },
  featureActionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'flex-start',
  },
  featureActionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  milestonesSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  milestonesCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  milestoneIconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneWeek: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  milestoneText: {
    fontSize: 14,
    color: '#6B7280',
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

export default PregnancyScreen;
