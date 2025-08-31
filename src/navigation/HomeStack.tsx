import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CycleScreen from '../screens/CycleScreen';
import CycleTrackerScreen from '../screens/CycleTrackerScreen';
import CycleNotesScreen from '../screens/CycleNotesScreen';
import CycleRecordsScreen from '../screens/CycleRecordsScreen';
import LogPeriodScreen from '../screens/LogPeriodScreen';
import PregnancyScreen from '../screens/PregnancyScreen';
import PregnancySetupScreen from '../screens/PregnancySetupScreen';
import PregnancyWeekOverviewScreen from '../screens/PregnancyWeekOverviewScreen';
import PregnancyNotesRemindersScreen from '../screens/PregnancyNotesRemindersScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Cycle" component={CycleScreen} />
      <Stack.Screen name="CycleTracker" component={CycleTrackerScreen} />
      <Stack.Screen name="CycleNotes" component={CycleNotesScreen} />
      <Stack.Screen name="CycleRecords" component={CycleRecordsScreen} />
      <Stack.Screen name="LogPeriod" component={LogPeriodScreen} />
      <Stack.Screen name="Pregnancy" component={PregnancyScreen} />
      <Stack.Screen name="PregnancySetup" component={PregnancySetupScreen} />
      <Stack.Screen name="PregnancyWeekOverview" component={PregnancyWeekOverviewScreen} />
      <Stack.Screen name="PregnancyNotesReminders" component={PregnancyNotesRemindersScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
