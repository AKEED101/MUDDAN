import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList, RootTabParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>,
  BottomTabNavigationProp<RootTabParamList>
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const features = [
    {
      id: 1,
      title: 'Cycle',
      subtitle: 'Track your journey',
      description: 'Monitor your menstrual cycle with precision',
      icon: 'calendar',
      gradient: ['#8B5CF6', '#A78BFA'] as const,
      accent: '#8B5CF6',
    },
    {
      id: 2,
      title: 'Pregnancy',
      subtitle: 'Beautiful journey',
      description: 'Week-by-week pregnancy guidance',
      icon: 'heart',
      gradient: ['#EC4899', '#F472B6'] as const,
      accent: '#EC4899',
    },
    {
      id: 3,
      title: 'Explore',
      subtitle: 'Discover more',
      description: 'Latest health tips and insights',
      icon: 'compass',
      gradient: ['#10B981', '#34D399'] as const,
      accent: '#10B981',
    },
  ];

  const renderFeatureContent = (feature: any) => {
    switch (feature.title) {
      case 'Cycle':
        return (
          <View style={styles.featureContent}>
            <Text style={styles.featureContentTitle}>Your Cycle Overview</Text>
            <View style={styles.cycleStats}>
              <View style={styles.cycleStat}>
                <Text style={styles.cycleStatValue}>28</Text>
                <Text style={styles.cycleStatLabel}>Days</Text>
              </View>
              <View style={styles.cycleStat}>
                <Text style={styles.cycleStatValue}>Apr 14</Text>
                <Text style={styles.cycleStatLabel}>Last Period</Text>
              </View>
              <View style={styles.cycleStat}>
                <Text style={styles.cycleStatValue}>5</Text>
                <Text style={styles.cycleStatLabel}>Days Left</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.featureActionButton}>
              <Text style={styles.featureActionText}>Track Today</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Pregnancy':
        return (
          <View style={styles.featureContent}>
            <Text style={styles.featureContentTitle}>Pregnancy Tracker</Text>
            <View style={styles.pregnancyInfo}>
              <Text style={styles.pregnancyWeek}>Week 12</Text>
              <Text style={styles.pregnancyTrimester}>First Trimester</Text>
              <Text style={styles.pregnancyTip}>Your baby is now the size of a lime!</Text>
            </View>
            <TouchableOpacity style={styles.featureActionButton}>
              <Text style={styles.featureActionText}>View Details</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Explore':
        return (
          <View style={styles.featureContent}>
            <Text style={styles.featureContentTitle}>Today's Insights</Text>
            <View style={styles.exploreItems}>
              <View style={styles.exploreItem}>
                <Ionicons name="restaurant" size={20} color="#FF6B6B" />
                <Text style={styles.exploreItemText}>5 Foods for Healthy Skin</Text>
              </View>
              <View style={styles.exploreItem}>
                <Ionicons name="fitness" size={20} color="#A8E6CF" />
                <Text style={styles.exploreItemText}>Pregnancy Exercise Guide</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.featureActionButton}
                                onPress={() => navigation.navigate('Consultant', { screen: 'ExploreList' })}
            >
              <Text style={styles.featureActionText}>Read More</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  const handleCycleTracker = () => {
    navigation.navigate('Cycle');
  };

  const handlePregnancy = () => {
    navigation.navigate('Profile', { screen: 'Pregnancy' });
  };



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
      
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Top Greeting Section */}
        <View style={styles.greetingSection}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.greetingGradient}
          >
            <View style={styles.greetingContent}>
              <View style={styles.greetingTextContainer}>
                <Text style={styles.greetingText}>{getGreeting()}</Text>
                <Text style={styles.greetingSubtext}>How are you feeling today?</Text>
              </View>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                  style={styles.avatarGradient}
                >
                  <Text style={styles.avatarText}>EryS</Text>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Feature Cards Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={styles.featureCard}
                onPress={() => {
                  switch (feature.title) {
                    case 'Cycle':
                      handleCycleTracker();
                      break;
                    case 'Pregnancy':
                      handlePregnancy();
                      break;
                    case 'Explore':
                      navigation.navigate('Consultant', { screen: 'ExploreList' });
                      break;
                    default:
                      setSelectedFeature(selectedFeature === feature.title ? null : feature.title);
                  }
                }}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={feature.gradient}
                  style={styles.featureGradient}
                >
                  <View style={styles.featureHeader}>
                    <View style={styles.featureIconContainer}>
                      <Ionicons name={feature.icon as any} size={28} color="white" />
                    </View>
                    <View style={styles.featureTextContainer}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                    </View>
                  </View>
                  
                  {selectedFeature === feature.title && (
                    <View style={styles.featureExpanded}>
                      {renderFeatureContent(feature)}
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Tip Banner */}
        <View style={styles.tipSection}>
          <Text style={styles.sectionTitle}>Today's Wellness Tip</Text>
          <LinearGradient
            colors={['#06B6D4', '#0891B2']}
            style={styles.tipBanner}
          >
            <View style={styles.tipContent}>
              <View style={styles.tipTextContainer}>
                <Text style={styles.tipTitle}>
                  Stay Hydrated During Pregnancy
                </Text>
                <Text style={styles.tipDescription}>
                  Drink 8-10 glasses of water daily to support your baby's development
                </Text>
                <TouchableOpacity style={styles.tipButton}>
                  <Text style={styles.tipButtonText}>Learn More</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tipImageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop&crop=center' }}
                  style={styles.tipImage}
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Explore Section with Posts */}
        <View style={styles.exploreSection}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <View style={styles.postsList}>
            <TouchableOpacity 
              style={styles.postCard}
                            onPress={() => navigation.navigate('Consultant', { screen: 'ExploreList' })}
              >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=150&fit=crop&crop=center' }}
                style={styles.postImage}
              />
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>5 Foods for Healthy Skin</Text>
                <Text style={styles.postMeta}>Beauty · April 16</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.postCard}
              onPress={() => navigation.navigate('Consultant', { screen: 'ExploreList' })}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop&crop=center' }}
                style={styles.postImage}
              />
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>Pregnancy Exercise Guide</Text>
                <Text style={styles.postMeta}>Fitness · April 15</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.postCard}
                            onPress={() => navigation.navigate('Consultant', { screen: 'ExploreList' })}
              >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop&crop=center' }}
                style={styles.postImage}
              />
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>Mental Wellness Tips</Text>
                <Text style={styles.postMeta}>Health · April 14</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Test Component */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>🧪 Mobile Test</Text>
          <Text style={styles.sectionDescription}>
            Test navigation and adaptive features on your phone
          </Text>
          <TouchableOpacity 
            style={styles.testButton}
            onPress={() => navigation.navigate('Profile', { screen: 'Settings' })}
          >
            <Text style={styles.testButtonText}>Open Test Component</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Cycle tracking completed</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="heart" size={20} color="#EF4444" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Pregnancy week updated</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
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
  greetingSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  greetingGradient: {
    borderRadius: 24,
    padding: 24,
  },
  greetingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  greetingSubtext: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  avatarContainer: {
    width: 60,
    height: 60,
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  featuresSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
      },
    }),
    // Platform-specific responsive design
    ...(Platform.OS === 'ios' ? { paddingTop: 8 } : { paddingTop: 4 }),
  },
  featureGradient: {
    padding: 20,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  featureExpanded: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 16,
  },
  featureContent: {
    alignItems: 'center',
  },
  featureContentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  cycleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  cycleStat: {
    alignItems: 'center',
  },
  cycleStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cycleStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  pregnancyInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pregnancyWeek: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  pregnancyTrimester: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  pregnancyTip: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  exploreItems: {
    marginBottom: 16,
  },
  exploreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exploreItemText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
  },
  featureActionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  featureActionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  tipSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  tipBanner: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    backgroundColor: 'white',
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  tipDescription: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  tipButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  tipButtonText: {
    color: '#4facfe',
    fontWeight: '600',
    fontSize: 14,
  },
  tipImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  tipImage: {
    width: '100%',
    height: '100%',
  },
  exploreSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  postsList: {
    gap: 16,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postImage: {
    width: 80,
    height: 80,
  },
  postContent: {
    flex: 1,
    padding: 16,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  postMeta: {
    fontSize: 14,
    color: '#64748B',
  },
  activitySection: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    color: '#64748B',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  testButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  testButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;
