import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CycleScreen from '../screens/CycleScreen';
import CycleHomeScreen from '../screens/CycleHomeScreen';
import LogPeriodScreen from '../screens/LogPeriodScreen';
import CalendarScreen from '../screens/CalendarScreen';
import InsightsScreen from '../screens/InsightsScreen';
import CycleNotesScreen from '../screens/CycleNotesScreen';
import CycleTrackerScreen from '../screens/CycleTrackerScreen';
import CycleRecordsScreen from '../screens/CycleRecordsScreen';
import CycleHistoryScreen from '../screens/CycleHistoryScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      
      <Stack.Screen 
        name="Cycle" 
        component={CycleScreen}
        options={{
          title: 'Cycle Tracking',
        }}
      />
      
      <Stack.Screen 
        name="CycleHome" 
        component={CycleHomeScreen}
        options={{
          title: 'Cycle Overview',
        }}
      />
      
      <Stack.Screen 
        name="LogPeriod" 
        component={LogPeriodScreen}
        options={{
          title: 'Log Period',
        }}
      />
      
      <Stack.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{
          title: 'Calendar',
        }}
      />
      
      <Stack.Screen 
        name="Insights" 
        component={InsightsScreen}
        options={{
          title: 'Insights',
        }}
      />
      
      <Stack.Screen 
        name="CycleNotes" 
        component={CycleNotesScreen}
        options={{
          title: 'Cycle Notes',
        }}
      />
      
      <Stack.Screen 
        name="CycleTracker" 
        component={CycleTrackerScreen}
        options={{
          title: 'Cycle Tracker',
        }}
      />
      
      <Stack.Screen 
        name="CycleRecords" 
        component={CycleRecordsScreen}
        options={{
          title: 'Cycle Records',
        }}
      />
      
      <Stack.Screen 
        name="CycleHistory" 
        component={CycleHistoryScreen}
        options={{
          title: 'Cycle History',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
