import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CycleStackParamList } from './types';

// Import screens
import CycleHomeScreen from '../screens/CycleHomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import InsightsScreen from '../screens/InsightsScreen';
import CycleTrackerScreen from '../screens/CycleTrackerScreen';
import CycleNotesScreen from '../screens/CycleNotesScreen';
import CycleRecordsScreen from '../screens/CycleRecordsScreen';
import LogPeriodScreen from '../screens/LogPeriodScreen';

const Stack = createNativeStackNavigator<CycleStackParamList>();

const CycleNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CycleHomeScreen" component={CycleHomeScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="InsightsScreen" component={InsightsScreen} />
      <Stack.Screen name="CycleTrackerScreen" component={CycleTrackerScreen} />
      <Stack.Screen name="CycleNotesScreen" component={CycleNotesScreen} />
      <Stack.Screen name="CycleRecordsScreen" component={CycleRecordsScreen} />
      <Stack.Screen name="LogPeriodScreen" component={LogPeriodScreen} />
    </Stack.Navigator>
  );
};

export default CycleNavigator;
