import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityScreen from '../screens/CommunityScreen';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import GroupFeedScreen from '../screens/GroupFeedScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import GroupMembersScreen from '../screens/GroupMembersScreen';
import ModerationQueueScreen from '../screens/ModerationQueueScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import GroupSearchScreen from '../screens/GroupSearchScreen';

const Stack = createStackNavigator();

const CommunityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CommunityMain" component={CommunityScreen} />
      <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
      <Stack.Screen name="GroupFeed" component={GroupFeedScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="GroupMembers" component={GroupMembersScreen} />
      <Stack.Screen name="ModerationQueue" component={ModerationQueueScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="GroupSearch" component={GroupSearchScreen} />
    </Stack.Navigator>
  );
};

export default CommunityStack;
