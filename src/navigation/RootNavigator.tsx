import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootTabParamList } from './types';
import { useI18n } from '../i18n';

// Import navigators
import HomeNavigator from './HomeNavigator';
import CommunityNavigator from './CommunityNavigator';
import ConsultantNavigator from './ConsultantNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

const RootNavigator = () => {
  const { t } = useI18n();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Consultant') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} options={{ title: t('home') }} />
      <Tab.Screen name="Community" component={CommunityNavigator} options={{ title: t('community') }} />
      <Tab.Screen name="Consultant" component={ConsultantNavigator} options={{ title: t('consultant') }} />
      <Tab.Screen name="Profile" component={ProfileNavigator} options={{ title: t('profile') }} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
