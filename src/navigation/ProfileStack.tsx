import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import MyConsultationsScreen from '../screens/MyConsultationsScreen';
import SavedPostsScreen from '../screens/SavedPostsScreen';
import CycleHistoryScreen from '../screens/CycleHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HealthRecordsScreen from '../screens/HealthRecordsScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  MyConsultations: undefined;
  SavedPosts: undefined;
  CycleHistory: undefined;
  Settings: undefined;
  ProfileEditor: undefined;
  AvailabilityCalendar: undefined;
  Payouts: undefined;
};

const Stack = createStackNavigator();

const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="MyConsultations" component={MyConsultationsScreen} />
      <Stack.Screen name="SavedPosts" component={SavedPostsScreen} />
      <Stack.Screen name="CycleHistory" component={CycleHistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="HealthRecords" component={HealthRecordsScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
