import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import CycleTrackerScreen from './src/screens/CycleTrackerScreen';
import CycleNotesScreen from './src/screens/CycleNotesScreen';
import CycleRecordsScreen from './src/screens/CycleRecordsScreen';
import LogPeriodScreen from './src/screens/LogPeriodScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import ConsultantsScreen from './src/screens/ConsultantsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createBottomTabNavigator();

// Home Stack Navigator
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeMain" 
      component={HomeScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="CycleTracker" 
      component={CycleTrackerScreen}
      options={{ title: 'Cycle Tracker' }}
    />
    <Stack.Screen 
      name="CycleNotes" 
      component={CycleNotesScreen}
      options={{ title: 'Cycle Notes' }}
    />
    <Stack.Screen 
      name="CycleRecords" 
      component={CycleRecordsScreen}
      options={{ title: 'Cycle Records' }}
    />
    <Stack.Screen 
      name="LogPeriod" 
      component={LogPeriodScreen}
      options={{ title: 'Log Period' }}
    />
  </Stack.Navigator>
);

// Community Stack Navigator
const CommunityStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CommunityMain" 
      component={CommunityScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Consultants Stack Navigator
const ConsultantsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ConsultantsMain" 
      component={ConsultantsScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Profile Stack Navigator
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileMain" 
      component={ProfileScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Tab Bar Icon Component
const TabBarIcon = ({ name, color, size }: { name: string; color: string; size: number }) => (
  <Ionicons name={name as any} size={size} color={color} />
);

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName: string;

                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Community') {
                  iconName = 'people';
                } else if (route.name === 'Consultants') {
                  iconName = 'medical';
                } else if (route.name === 'Profile') {
                  iconName = 'person';
                } else {
                  iconName = 'help';
                }

                return <TabBarIcon name={iconName} color={color} size={size} />;
              },
              tabBarActiveTintColor: '#7C3AED',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Community" component={CommunityStack} />
            <Tab.Screen name="Consultants" component={ConsultantsStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
