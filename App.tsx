import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import AuthStack from './src/navigation/AuthStack';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const AppContent = () => {
  const { user, loading, needsOnboarding } = useAuth();
  return (
    <NavigationContainer linking={{ prefixes: ['app://'] }}>
      <StatusBar style="auto" />
      {loading ? null : user ? (needsOnboarding ? <AuthStack /> : <RootNavigator />) : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
