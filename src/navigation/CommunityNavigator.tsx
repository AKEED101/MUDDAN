import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommunityStackParamList } from './types';

// Import screens
import CommunityScreen from '../screens/CommunityScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import GroupCreateScreen from '../screens/GroupCreateScreen';
import GroupMembersScreen from '../screens/GroupMembersScreen';
import GroupSettingsScreen from '../screens/GroupSettingsScreen';
import GroupSearchScreen from '../screens/GroupSearchScreen';
import GroupFeedScreen from '../screens/GroupFeedScreen';
import GroupInviteScreen from '../screens/GroupInviteScreen';
import SavedPostsScreen from '../screens/SavedPostsScreen';
import ModerationQueueScreen from '../screens/ModerationQueueScreen';

const Stack = createNativeStackNavigator<CommunityStackParamList>();

const CommunityNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CommunityMain"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="CommunityMain" 
        component={CommunityScreen}
        options={{
          title: 'Community',
        }}
      />
      
      <Stack.Screen 
        name="CreatePost" 
        component={CreatePostScreen}
        options={{
          title: 'Create Post',
        }}
      />
      
      <Stack.Screen 
        name="PostDetail" 
        component={PostDetailScreen}
        options={{
          title: 'Post',
        }}
      />
      
      <Stack.Screen 
        name="GroupDetail" 
        component={GroupDetailScreen}
        options={{
          title: 'Group',
        }}
      />
      
      <Stack.Screen 
        name="GroupCreate" 
        component={GroupCreateScreen}
        options={{
          title: 'Create Group',
        }}
      />
      
      <Stack.Screen 
        name="GroupMembers" 
        component={GroupMembersScreen}
        options={{
          title: 'Group Members',
        }}
      />
      
      <Stack.Screen 
        name="GroupSettings" 
        component={GroupSettingsScreen}
        options={{
          title: 'Group Settings',
        }}
      />
      
      <Stack.Screen 
        name="GroupSearch" 
        component={GroupSearchScreen}
        options={{
          title: 'Search Groups',
        }}
      />
      
      <Stack.Screen 
        name="GroupFeed" 
        component={GroupFeedScreen}
        options={{
          title: 'Group Feed',
        }}
      />
      
      <Stack.Screen 
        name="GroupInvite" 
        component={GroupInviteScreen}
        options={{
          title: 'Invite Members',
        }}
      />
      
      <Stack.Screen 
        name="SavedPosts" 
        component={SavedPostsScreen}
        options={{
          title: 'Saved Posts',
        }}
      />
      
      <Stack.Screen 
        name="ModerationQueue" 
        component={ModerationQueueScreen}
        options={{
          title: 'Moderation',
        }}
      />
    </Stack.Navigator>
  );
};

export default CommunityNavigator;
