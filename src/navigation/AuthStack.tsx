import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthWelcomeScreen from '../screens/AuthWelcomeScreen';
import AuthEmailOtpScreen from '../screens/AuthEmailOtpScreen';
import AuthPhoneOtpScreen from '../screens/AuthPhoneOtpScreen';
import ProfileOnboardingScreen from '../screens/ProfileOnboardingScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthWelcome" component={AuthWelcomeScreen} />
      <Stack.Screen name="AuthEmailOtp" component={AuthEmailOtpScreen} />
      <Stack.Screen name="AuthPhoneOtp" component={AuthPhoneOtpScreen} />
      <Stack.Screen name="ProfileOnboarding" component={ProfileOnboardingScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;


