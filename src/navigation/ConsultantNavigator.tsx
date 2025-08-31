import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConsultantStackParamList } from './types';

// Import screens
import ConsultantsScreen from '../screens/ConsultantsScreen';
import ConsultantProfileScreen from '../screens/ConsultantProfileScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import BookingScreen from '../screens/BookingScreen';
import ConsultationScreen from '../screens/ConsultationScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import AudioCallScreen from '../screens/AudioCallScreen';
import ChatScreen from '../screens/ChatScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PrescriptionScreen from '../screens/PrescriptionScreen';
import MyConsultationsScreen from '../screens/MyConsultationsScreen';
import HealthRecordsScreen from '../screens/HealthRecordsScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ExploreListScreen from '../screens/ExploreListScreen';
import ExploreDetailScreen from '../screens/ExploreDetailScreen';
import ArticleListScreen from '../screens/ArticleListScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';

const Stack = createNativeStackNavigator<ConsultantStackParamList>();

const ConsultantNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ConsultantsMain"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="ConsultantsMain" 
        component={ConsultantsScreen}
        options={{
          title: 'Consultants',
        }}
      />
      
      <Stack.Screen 
        name="ConsultantProfile" 
        component={ConsultantProfileScreen}
        options={{
          title: 'Consultant Profile',
        }}
      />
      
      <Stack.Screen 
        name="DoctorProfile" 
        component={DoctorProfileScreen}
        options={{
          title: 'Doctor Profile',
        }}
      />
      
      <Stack.Screen 
        name="Booking" 
        component={BookingScreen}
        options={{
          title: 'Book Appointment',
        }}
      />
      
      <Stack.Screen 
        name="Consultation" 
        component={ConsultationScreen}
        options={{
          title: 'Consultation',
        }}
      />
      
      <Stack.Screen 
        name="VideoCall" 
        component={VideoCallScreen}
        options={{
          title: 'Video Call',
        }}
      />
      
      <Stack.Screen 
        name="AudioCall" 
        component={AudioCallScreen}
        options={{
          title: 'Audio Call',
        }}
      />
      
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          title: 'Chat',
        }}
      />
      
      <Stack.Screen 
        name="Payment" 
        component={PaymentScreen}
        options={{
          title: 'Payment',
        }}
      />
      
      <Stack.Screen 
        name="Prescription" 
        component={PrescriptionScreen}
        options={{
          title: 'Prescription',
        }}
      />
      
      <Stack.Screen 
        name="MyConsultations" 
        component={MyConsultationsScreen}
        options={{
          title: 'My Consultations',
        }}
      />
      
      <Stack.Screen 
        name="HealthRecords" 
        component={HealthRecordsScreen}
        options={{
          title: 'Health Records',
        }}
      />
      
      <Stack.Screen 
        name="Explore" 
        component={ExploreScreen}
        options={{
          title: 'Explore',
        }}
      />
      
      <Stack.Screen 
        name="ExploreList" 
        component={ExploreListScreen}
        options={{
          title: 'Explore List',
        }}
      />
      
      <Stack.Screen 
        name="ExploreDetail" 
        component={ExploreDetailScreen}
        options={{
          title: 'Explore Detail',
        }}
      />
      
      <Stack.Screen 
        name="ArticleList" 
        component={ArticleListScreen}
        options={{
          title: 'Articles',
        }}
      />
      
      <Stack.Screen 
        name="ArticleDetail" 
        component={ArticleDetailScreen}
        options={{
          title: 'Article',
        }}
      />
    </Stack.Navigator>
  );
};

export default ConsultantNavigator;
