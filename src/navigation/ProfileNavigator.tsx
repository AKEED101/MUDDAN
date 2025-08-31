import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';

// Import screens
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PregnancyScreen from '../screens/PregnancyScreen';
import PregnancySetupScreen from '../screens/PregnancySetupScreen';
import PregnancyWeekOverviewScreen from '../screens/PregnancyWeekOverviewScreen';
import PregnancyNotesRemindersScreen from '../screens/PregnancyNotesRemindersScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
      />
      
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      
      <Stack.Screen 
        name="PrivacySettings" 
        component={PrivacySettingsScreen}
        options={{
          title: 'Privacy Settings',
        }}
      />
      
      <Stack.Screen 
        name="PaymentMethods" 
        component={PaymentMethodsScreen}
        options={{
          title: 'Payment Methods',
        }}
      />
      
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
        }}
      />
      
      <Stack.Screen 
        name="Pregnancy" 
        component={PregnancyScreen}
        options={{
          title: 'Pregnancy Tracking',
        }}
      />
      
      <Stack.Screen 
        name="PregnancySetup" 
        component={PregnancySetupScreen}
        options={{
          title: 'Pregnancy Setup',
        }}
      />
      
      <Stack.Screen 
        name="PregnancyWeekOverview" 
        component={PregnancyWeekOverviewScreen}
        options={{
          title: 'Pregnancy Overview',
        }}
      />
      
      <Stack.Screen 
        name="PregnancyNotesReminders" 
        component={PregnancyNotesRemindersScreen}
        options={{
          title: 'Pregnancy Notes',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
