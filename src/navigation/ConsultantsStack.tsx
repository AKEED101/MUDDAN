import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsultantsScreen from '../screens/ConsultantsScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import ConsultantProfileScreen from '../screens/ConsultantProfileScreen';
import BookingScreen from '../screens/BookingScreen';
import ConsultationScreen from '../screens/ConsultationScreen';
import ChatScreen from '../screens/ChatScreen';
import AudioCallScreen from '../screens/AudioCallScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import PrescriptionScreen from '../screens/PrescriptionScreen';
import PaymentScreen from '../screens/PaymentScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';

const Stack = createStackNavigator();

const ConsultantsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ConsultantsMain" component={ConsultantsScreen} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <Stack.Screen name="ConsultantProfile" component={ConsultantProfileScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
      <Stack.Screen name="Consultation" component={ConsultationScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="AudioCall" component={AudioCallScreen} />
      <Stack.Screen name="VideoCall" component={VideoCallScreen} />
      <Stack.Screen name="Prescription" component={PrescriptionScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default ConsultantsStack;
