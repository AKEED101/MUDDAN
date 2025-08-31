import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface ModerationQueueScreenProps {
  navigation: any;
  route: any;
}

const ModerationQueueScreen: React.FC<ModerationQueueScreenProps> = ({ navigation, route }) => {
  const [selectedTab, setSelectedTab] = useState<'reported' | 'pending'>('reported');

  // Mock user data - in real app this would come from auth context
  const currentUser = {
    role: 'admin', // Only admins should access this screen
  };

  // Mock reported posts data
  const reportedPosts = [
    {
      id: 1,
      postId: 'post_123',
      author: 'John Doe',
      avatar: 'https://via.placeholder.com/40x40',
      role: 'Member',
      time: '2h ago',
      content: 'This is a post that was reported for inappropriate content...',
      media: 'https://via.placeholder.com/300x200',
      reportReason: 'Inappropriate content',
      reportCount: 3,
      reporter: 'Sarah M.',
      status: 'pending',
    },
    {
      id: 2,
      postId: 'post_456',
      author: 'Jane Smith',
      avatar: 'https://via.placeholder.com/40x40',
      role: 'Member',
      time: '4h ago',
      content: 'Another reported post with different content...',
      media: null,
      reportReason: 'Spam',
      reportCount: 1,
      reporter: 'Mike R.',
      status: 'pending',
    },
    {
      id: 3,
      postId: 'post_789',
      author: 'Bob Johnson',
      avatar: 'https://via.placeholder.com/40x40',
      role: 'Member',
      time: '6h ago',
      content: 'This post contains medical advice that should be reviewed...',
      media: null,
      reportReason: 'Medical advice',
      reportCount: 2,
      reporter: 'Dr. Chen',
      status: 'pending',
    },
  ];

  // Mock pending approval posts data
  const pendingPosts = [
    {
      id: 1,
      postId: 'post_101',
      author: 'New User',
      avatar: 'https://via.placeholder.com/40x40',
      role: 'Member',
      time: '1h ago',
      content: 'This is a new post waiting for admin approval...',
      media: 'https://via.placeholder.com/300x200',
      status: 'pending_approval',
      category: 'Health',
    },
    {
      id: 2,
      postId: 'post_102',
      author: 'Another User',
      avatar: 'https://via.placeholder.com/40x40',
      role: 'Member',
      time: '3h ago',
      content: 'Another post that needs approval before going live...',
      media: null,
      status: 'pending_approval',
      category: 'General',
    },
  ];

  const tabs = [
    { id: 'reported', label: 'Reported Posts', count: reportedPosts.length },
    { id: 'pending', label: 'Pending Approval', count: pendingPosts.length },
  ];

  const currentData = selectedTab === 'reported' ? reportedPosts : pendingPosts;

  const handleApprove = (post: any) => {
    Alert.alert(
      'Approve Post',
      `Are you sure you want to approve this post by ${post.author}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          style: 'default',
          onPress: () => {
            // In real app, make API call to approve post
            console.log('Approving post:', post.postId);
            Alert.alert('Success', 'Post approved successfully!');
          },
        },
      ]
    );
  };

  const handleRemove = (post: any) => {
    Alert.alert(
      'Remove Post',
      `Are you sure you want to remove this post by ${post.author}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            // In real app, make API call to remove post
            console.log('Removing post:', post.postId);
            Alert.alert('Success', 'Post removed successfully!');
          },
        },
      ]
    );
  };

  const handleBanUser = (post: any) => {
    Alert.alert(
      'Ban User',
      `Are you sure you want to ban ${post.author}? This will prevent them from posting in the group.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Ban User',
          style: 'destructive',
          onPress: () => {
            // In real app, make API call to ban user
            console.log('Banning user:', post.author);
            Alert.alert('Success', 'User banned successfully!');
          },
        },
      ]
    );
  };

  const handleViewPost = (post: any) => {
    // In real app, navigate to post detail
    console.log('Viewing post:', post.postId);
  };

  const renderReportedPost = ({ item }: { item: any }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.postAvatar} />
        <View style={styles.postInfo}>
          <Text style={styles.postAuthor}>{item.author}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
        <View style={styles.reportBadge}>
          <Ionicons name="flag" size={16} color="#EF4444" />
          <Text style={styles.reportBadgeText}>{item.reportCount}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.media && (
        <Image source={{ uri: item.media }} style={styles.postMedia} />
      )}

      <View style={styles.reportInfo}>
        <View style={styles.reportReason}>
          <Text style={styles.reportReasonLabel}>Report Reason:</Text>
          <Text style={styles.reportReasonText}>{item.reportReason}</Text>
        </View>
        <View style={styles.reporterInfo}>
          <Text style={styles.reporterLabel}>Reported by:</Text>
          <Text style={styles.reporterText}>{item.reporter}</Text>
        </View>
      </View>

      <View style={styles.moderationActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.approveButton]}
          onPress={() => handleApprove(item)}
        >
          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          <Text style={styles.approveButtonText}>Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.removeButton]}
          onPress={() => handleRemove(item)}
        >
          <Ionicons name="close-circle" size={16} color="#EF4444" />
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.banButton]}
          onPress={() => handleBanUser(item)}
        >
          <Ionicons name="ban" size={16} color="#F59E0B" />
          <Text style={styles.banButtonText}>Ban User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => handleViewPost(item)}
        >
          <Ionicons name="eye" size={16} color="#7C3AED" />
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPendingPost = ({ item }: { item: any }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.postAvatar} />
        <View style={styles.postInfo}>
          <Text style={styles.postAuthor}>{item.author}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
        <View style={styles.pendingBadge}>
          <Ionicons name="time" size={16} color="#F59E0B" />
          <Text style={styles.pendingBadgeText}>Pending</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.media && (
        <Image source={{ uri: item.media }} style={styles.postMedia} />
      )}

      <View style={styles.postMeta}>
        <View style={styles.categoryChip}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.statusText}>Awaiting approval</Text>
      </View>

      <View style={styles.moderationActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.approveButton]}
          onPress={() => handleApprove(item)}
        >
          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          <Text style={styles.approveButtonText}>Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.removeButton]}
          onPress={() => handleRemove(item)}
        >
          <Ionicons name="close-circle" size={16} color="#EF4444" />
          <Text style={styles.removeButtonText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => handleViewPost(item)}
        >
          <Ionicons name="eye" size={16} color="#7C3AED" />
          <Text style={styles.viewButtonText}>Preview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Check if user has admin access
  if (currentUser.role !== 'admin') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.accessDenied}>
          <Ionicons name="lock-closed" size={64} color="#EF4444" />
          <Text style={styles.accessDeniedTitle}>Access Denied</Text>
          <Text style={styles.accessDeniedText}>
            You need admin privileges to access the moderation queue.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Moderation Queue</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="settings" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.tabActive]}
            onPress={() => setSelectedTab(tab.id as any)}
          >
            <Text style={[styles.tabLabel, selectedTab === tab.id && styles.tabLabelActive]}>
              {tab.label}
            </Text>
            <View style={[styles.tabCount, selectedTab === tab.id && styles.tabCountActive]}>
              <Text style={[styles.tabCountText, selectedTab === tab.id && styles.tabCountTextActive]}>
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Posts List */}
      <FlatList
        data={currentData}
        renderItem={selectedTab === 'reported' ? renderReportedPost : renderPendingPost}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsList}
      />

      {/* Empty State */}
      {currentData.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle" size={64} color="#10B981" />
          <Text style={styles.emptyStateTitle}>All Caught Up!</Text>
          <Text style={styles.emptyStateText}>
            {selectedTab === 'reported' 
              ? 'No reported posts to review.' 
              : 'No posts pending approval.'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#7C3AED',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  headerAction: {
    padding: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: '#EDE9FE',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  tabLabelActive: {
    color: '#7C3AED',
  },
  tabCount: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tabCountActive: {
    backgroundColor: '#DDD6FE',
  },
  tabCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabCountTextActive: {
    color: '#7C3AED',
  },
  postsList: {
    padding: 16,
    paddingTop: 0,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  reportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  reportBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  pendingBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
  postContent: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  postMedia: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  reportInfo: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  reportReason: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportReasonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginRight: 8,
  },
  reportReasonText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
  },
  reporterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reporterLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginRight: 8,
  },
  reporterText: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '500',
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C3AED',
  },
  statusText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  moderationActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  approveButton: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  approveButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  removeButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  removeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  banButton: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  banButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
  viewButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C3AED',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  accessDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  accessDeniedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
    marginTop: 16,
    marginBottom: 8,
  },
  accessDeniedText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ModerationQueueScreen;
