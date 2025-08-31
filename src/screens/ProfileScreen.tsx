import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const profileStats = [
    { label: 'Consultations', value: '12', icon: 'medical', gradient: ['#EC4899', '#F472B6'] as const, color: '#EC4899' },
    { label: 'Saved Posts', value: '28', icon: 'bookmark', gradient: ['#06B6D4', '#22D3EE'] as const, color: '#06B6D4' },
    { label: 'Cycles Tracked', value: '8', icon: 'calendar', gradient: ['#8B5CF6', '#A78BFA'] as const, color: '#8B5CF6' },
    { label: 'Points Earned', value: '1,250', icon: 'star', gradient: ['#10B981', '#34D399'] as const, color: '#10B981' },
  ];

  const menuItems = [
    { 
      title: 'My Consultations', 
      subtitle: 'View your booking history',
      icon: 'medical', 
      gradient: ['#FF6B9D', '#C44569'] as const,
      badge: '2 upcoming'
    },
    { 
      title: 'Saved Posts', 
      subtitle: 'Your bookmarked content',
      icon: 'bookmark', 
      gradient: ['#06B6D4', '#22D3EE'] as const
    },
    { 
      title: 'Cycle History', 
      subtitle: 'Track your menstrual cycles',
      icon: 'calendar', 
      gradient: ['#8B5CF6', '#A78BFA'] as const
    },
    { 
      title: 'Health Records', 
      subtitle: 'Manage your medical data',
      icon: 'document-text', 
      gradient: ['#6366F1', '#8B5CF6'] as const
    },
    { 
      title: 'Payment Methods', 
      subtitle: 'Manage your billing',
      icon: 'card', 
      gradient: ['#10B981', '#34D399'] as const
    },
    { 
      title: 'Privacy Settings', 
      subtitle: 'Control your data',
      icon: 'shield-checkmark', 
      gradient: ['#F59E0B', '#FBBF24'] as const
    },
  ];

  const recentActivity = [
    { action: 'Booked consultation with Dr. Sarah', time: '2 hours ago', type: 'booking', icon: 'calendar', gradient: ['#EC4899', '#F472B6'] as const },
    { action: 'Saved post about pregnancy nutrition', time: '1 day ago', type: 'save', icon: 'bookmark', gradient: ['#06B6D4', '#22D3EE'] as const },
    { action: 'Completed cycle tracking', time: '3 days ago', type: 'tracking', icon: 'checkmark-circle', gradient: ['#8B5CF6', '#A78BFA'] as const },
    { action: 'Earned 50 points for daily check-in', time: '1 week ago', type: 'points', icon: 'star', gradient: ['#F59E0B', '#FBBF24'] as const },
  ];

  const handleMenuPress = (title: string) => {
    switch (title) {
      case 'Cycle History':
        navigation.navigate('CycleHistoryScreen');
        break;
      case 'Health Records':
        navigation.navigate('HealthRecordsScreen');
        break;
      case 'Payment Methods':
        navigation.navigate('PaymentMethodsScreen');
        break;
      case 'Privacy Settings':
        navigation.navigate('PrivacySettingsScreen');
        break;
      default:
        break;
    }
  };

  const handleQuickActionPress = (action: string) => {
    switch (action) {
      case 'Booked consultation with Dr. Sarah':
        navigation.navigate('MyConsultationsScreen');
        break;
      case 'Saved post about pregnancy nutrition':
        navigation.navigate('SavedPostsScreen');
        break;
      case 'Completed cycle tracking':
        navigation.navigate('CycleHistoryScreen');
        break;
      case 'Earned 50 points for daily check-in':
        // Handle points action
        break;
      default:
        break;
    }
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
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.profileHeader}
        >
          <View style={styles.profileContent}>
            <View style={styles.avatarSection}>
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                style={styles.avatarGradient}
              >
                <Text style={styles.avatarText}>EryS</Text>
              </LinearGradient>
              <View style={styles.avatarBadge}>
                <Ionicons name="star" size={16} color="#FFD93D" />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>EryS</Text>
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                style={styles.premiumBadge}
              >
                <Text style={styles.premiumText}>Premium Member</Text>
              </LinearGradient>
              <Text style={styles.memberSince}>Member since March 2024</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                style={styles.editButtonGradient}
              >
                <Ionicons name="pencil" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Activity</Text>
          <View style={styles.statsGrid}>
            {profileStats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard}>
                <LinearGradient
                  colors={stat.gradient}
                  style={styles.statGradient}
                >
                  <View style={styles.statIconContainer}>
                    <Ionicons name={stat.icon as any} size={28} color="white" />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#FF6B9D', '#C44569']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.quickActionText}>Book Consultation</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#4FACFE', '#00F2FE']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="calendar" size={24} color="white" />
                <Text style={styles.quickActionText}>Track Cycle</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.title)}
            >
              <LinearGradient
                colors={item.gradient}
                style={styles.menuIconGradient}
              >
                <Ionicons name={item.icon as any} size={24} color="white" />
              </LinearGradient>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.menuRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <LinearGradient
                  colors={['#EC4899', '#F472B6'] as const}
                  style={styles.settingIconGradient}
                >
                  <Ionicons name="notifications" size={20} color="white" />
                </LinearGradient>
                <Text style={styles.settingText}>Push Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E7EB', true: '#FF6B9D' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <LinearGradient
                  colors={['#8B5CF6', '#A78BFA'] as const}
                  style={styles.settingIconGradient}
                >
                  <Ionicons name="moon" size={20} color="white" />
                </LinearGradient>
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#E5E7EB', true: '#6C5CE7' }}
                thumbColor={darkModeEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            {recentActivity.map((activity, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.activityItem}
                onPress={() => handleQuickActionPress(activity.action)}
              >
                <LinearGradient
                  colors={activity.gradient}
                  style={styles.activityIconGradient}
                >
                  <Ionicons name={activity.icon as any} size={16} color="white" />
                </LinearGradient>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{activity.action}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <LinearGradient
              colors={['#EF4444', '#DC2626'] as const}
              style={styles.logoutButtonGradient}
            >
              <Ionicons name="log-out-outline" size={20} color="white" />
              <Text style={styles.logoutText}>Log Out</Text>
            </LinearGradient>
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
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
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
  profileHeader: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSection: {
    position: 'relative',
    marginRight: 16,
  },
  avatarGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  avatarBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  premiumBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  premiumText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  memberSince: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  editButton: {
    width: 48,
    height: 48,
  },
  editButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
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
    // Platform-specific responsive design for statCard
    ...(Platform.OS === 'ios' ? { paddingTop: 8 } : { paddingTop: 4 }),
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    textAlign: 'center',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
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
    // Platform-specific responsive design for quickActionCard
    ...(Platform.OS === 'ios' ? { paddingTop: 8 } : { paddingTop: 4 }),
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
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  menuIconGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    color: '#1E293B',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 4,
  },
  menuSubtitle: {
    color: '#6B7280',
    fontSize: 14,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  badgeText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '500',
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  settingsCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    color: '#1E293B',
    fontWeight: '500',
    fontSize: 16,
  },
  activitySection: {
    paddingHorizontal: 20,
    marginTop: 24,
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
  activityIconGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    color: '#6B7280',
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 32,
  },
  logoutButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    backgroundColor: 'white',
  },
  logoutButtonGradient: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default ProfileScreen;













image.png