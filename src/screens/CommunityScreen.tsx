import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommunityStackParamList } from '../navigation/types';
import { MockPost } from '../types';
import { useI18n } from '../i18n';

const { width } = Dimensions.get('window');

type CommunityScreenNavigationProp = NativeStackNavigationProp<CommunityStackParamList, 'GroupList'>;

const CommunityScreen = () => {
  const navigation = useNavigation<CommunityScreenNavigationProp>();
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for community groups
  const communityGroups = [
    {
      id: '1',
      name: 'Cycle Support Group',
      members: 1247,
      posts: 89,
      category: 'Cycle Health',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      description: 'Support and advice for menstrual health',
      isJoined: true,
    },
    {
      id: '2',
      name: 'Pregnancy Journey',
      members: 2156,
      posts: 156,
      category: 'Pregnancy',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      description: 'Share your pregnancy experience',
      isJoined: false,
    },
    {
      id: '3',
      name: 'Wellness & Fitness',
      members: 892,
      posts: 67,
      category: 'Fitness',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      description: 'Health and fitness tips for women',
      isJoined: true,
    },
    {
      id: '4',
      name: 'Mental Health Support',
      members: 1567,
      posts: 234,
      category: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      description: 'Mental wellness and support',
      isJoined: false,
    },
    {
      id: '5',
      name: 'Nutrition & Diet',
      members: 743,
      posts: 45,
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      description: 'Healthy eating for women',
      isJoined: true,
    },
    {
      id: '6',
      name: 'Career & Motherhood',
      members: 1123,
      posts: 78,
      category: 'Career',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      description: 'Balancing work and family',
      isJoined: false,
    },
  ];

  // Mock data for recent posts
  const recentPosts: MockPost[] = [
    {
      id: '1',
      author: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: 'Just started tracking my cycle and it\'s been so helpful! Anyone else using the app?',
      likes: 23,
      comments: 8,
      time: '2 hours ago',
      group: 'Cycle Support Group',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      author: 'Emma L.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: 'Week 12 of pregnancy and feeling great! Any tips for the second trimester?',
      likes: 45,
      comments: 12,
      time: '4 hours ago',
      group: 'Pregnancy Journey',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      author: 'Maria K.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'Morning workout routine that fits my busy schedule. What\'s your favorite exercise?',
      likes: 67,
      comments: 15,
      time: '6 hours ago',
      group: 'Wellness & Fitness',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: 'grid' },
    { id: 'cycle', name: 'Cycle Health', icon: 'calendar' },
    { id: 'pregnancy', name: 'Pregnancy', icon: 'heart' },
    { id: 'fitness', name: 'Fitness', icon: 'fitness' },
    { id: 'mental', name: 'Mental Health', icon: 'brain' },
    { id: 'nutrition', name: 'Nutrition', icon: 'nutrition' },
  ];

  const renderCategoryButton = (category: any) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons 
        name={category.icon as any} 
        size={20} 
        color={selectedCategory === category.id ? '#7C3AED' : '#6B7280'} 
      />
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && styles.categoryButtonTextActive
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderGroupCard = (group: any) => (
    <TouchableOpacity
      key={group.id}
      style={styles.groupCard}
      onPress={() => navigation.navigate('GroupDetailScreen', { groupId: group.id })}
    >
      <Image source={{ uri: group.image }} style={styles.groupImage} />
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupCategory}>{group.category}</Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
        <View style={styles.groupStats}>
          <View style={styles.groupStat}>
            <Ionicons name="people" size={16} color="#6B7280" />
            <Text style={styles.groupStatText}>{group.members} members</Text>
          </View>
          <View style={styles.groupStat}>
            <Ionicons name="chatbubble" size={16} color="#6B7280" />
            <Text style={styles.groupStatText}>{group.posts} posts</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.joinButton,
            group.isJoined && styles.joinedButton
          ]}
          onPress={() => navigation.navigate('GroupDetailScreen', { groupId: group.id })}
        >
          <Text style={[
            styles.joinButtonText,
            group.isJoined && styles.joinedButtonText
          ]}>
            {group.isJoined ? t('viewGroup') : t('joinGroup')}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderPostCard = (post: MockPost) => (
    <TouchableOpacity
      key={post.id}
      style={styles.postCard}
      onPress={() => navigation.navigate('PostDetailScreen', { postId: post.id })}
    >
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.postAuthor}>{post.author}</Text>
          <Text style={styles.postGroup}>{post.group}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}
      <View style={styles.postActions}>
        <View style={styles.postAction}>
          <Ionicons name="heart-outline" size={20} color="#6B7280" />
          <Text style={styles.postActionText}>{post.likes}</Text>
        </View>
        <View style={styles.postAction}>
          <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
          <Text style={styles.postActionText}>{post.comments}</Text>
        </View>
        <View style={styles.postAction}>
          <Ionicons name="share-outline" size={20} color="#6B7280" />
          <Text style={styles.postActionText}>Share</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Futuristic Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.hexagonRow}>
          <View style={styles.hexagon} />
          <View style={styles.hexagon} />
          <View style={styles.hexagon} />
        </View>
        <View style={styles.hexagonRow}>
          <View style={styles.hexagon} />
          <View style={styles.hexagon} />
          <View style={styles.hexagon} />
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#7C3AED', '#A855F7']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>{t('community')}</Text>
              <Text style={styles.headerSubtitle}>{t('connectWomen')}</Text>
            </View>
            <TouchableOpacity style={styles.searchButton}>
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                style={styles.searchButtonGradient}
              >
                <Ionicons name="search" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(renderCategoryButton)}
          </ScrollView>
        </View>

        {/* Popular Groups */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('popularGroups')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('GroupSearchScreen')}>
              <Text style={styles.seeAllText}>{t('seeAll')}</Text>
            </TouchableOpacity>
          </View>
          {communityGroups.slice(0, 3).map(renderGroupCard)}
        </View>

        {/* Recent Posts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('recentPosts')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreatePostScreen', { groupId: '1' })}>
              <Text style={styles.seeAllText}>{t('createPost')}</Text>
            </TouchableOpacity>
          </View>
          {recentPosts.map(renderPostCard)}
        </View>

        {/* Create Post Button */}
        <TouchableOpacity
          style={styles.createPostButton}
                      onPress={() => navigation.navigate('CreatePostScreen', { groupId: '1' })}
        >
          <LinearGradient
            colors={['#7C3AED', '#A855F7']}
            style={styles.createPostGradient}
          >
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.createPostText}>{t('createNewPost')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
  },
  hexagonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 100,
  },
  hexagon: {
    width: 60,
    height: 60,
    backgroundColor: '#7C3AED',
    transform: [{ rotate: '45deg' }],
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  searchButton: {
    width: 48,
    height: 48,
  },
  searchButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryButtonActive: {
    backgroundColor: '#F3E8FF',
    borderWidth: 2,
    borderColor: '#7C3AED',
  },
  categoryButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryButtonTextActive: {
    color: '#7C3AED',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  seeAllText: {
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '600',
  },
  groupCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  groupImage: {
    width: '100%',
    height: 120,
  },
  groupInfo: {
    padding: 20,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  groupCategory: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '600',
    marginBottom: 8,
  },
  groupDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  groupStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  groupStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  groupStatText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: '#F3E8FF',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  joinedButtonText: {
    color: '#7C3AED',
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  postAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  postHeaderInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  postGroup: {
    fontSize: 14,
    color: '#7C3AED',
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  postContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postActionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  createPostButton: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 40,
  },
  createPostGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  createPostText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CommunityScreen;
