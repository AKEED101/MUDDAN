import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ExploreScreenProps {
  navigation: any;
}

const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const exploreCategories = [
    { id: 'all', label: 'All', icon: 'grid', gradient: ['#6366F1', '#8B5CF6'] as const },
    { id: 'health', label: 'Health', icon: 'medical', gradient: ['#EC4899', '#F472B6'] as const },
    { id: 'fitness', label: 'Fitness', icon: 'fitness', gradient: ['#06B6D4', '#22D3EE'] as const },
    { id: 'beauty', label: 'Beauty', icon: 'sparkles', gradient: ['#8B5CF6', '#A78BFA'] as const },
    { id: 'nutrition', label: 'Nutrition', icon: 'restaurant', gradient: ['#10B981', '#34D399'] as const },
  ];

  const featuredArticles = [
    {
      id: 1,
      title: '5 Foods for Healthy Skin During Pregnancy',
      category: 'Nutrition',
      readTime: '5 min read',
      image: 'https://via.placeholder.com/300x200/A8EDEA/FED6E3?text=Nutrition',
      gradient: ['#10B981', '#34D399'] as const,
      excerpt: 'Discover the best foods to nourish your skin and support your baby\'s development...',
    },
    {
      id: 2,
      title: 'Safe Pregnancy Exercises for Each Trimester',
      category: 'Fitness',
      readTime: '8 min read',
      image: 'https://via.placeholder.com/300x200/4FACFE/00F2FE?text=Fitness',
      gradient: ['#06B6D4', '#22D3EE'] as const,
      excerpt: 'Learn which exercises are safe and beneficial during each stage of pregnancy...',
    },
    {
      id: 3,
      title: 'Natural Skincare Routine for Expecting Moms',
      category: 'Beauty',
      readTime: '6 min read',
      image: 'https://via.placeholder.com/300x200/FA709A/FEE140?text=Beauty',
      gradient: ['#F59E0B', '#FBBF24'] as const,
      excerpt: 'Create a safe and effective skincare routine using pregnancy-safe ingredients...',
    },
  ];

  const quickTopics = [
    { title: 'Pregnancy Tips', icon: 'heart', gradient: ['#EC4899', '#F472B6'] as const, count: '24 articles' },
    { title: 'Cycle Health', icon: 'calendar', gradient: ['#06B6D4', '#22D3EE'] as const, count: '18 articles' },
    { title: 'Mental Wellness', icon: 'heart-outline', gradient: ['#8B5CF6', '#A78BFA'] as const, count: '15 articles' },
    { title: 'Nutrition Guide', icon: 'restaurant', gradient: ['#10B981', '#34D399'] as const, count: '22 articles' },
  ];

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
          colors={['#6366F1', '#8B5CF6']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Explore</Text>
              <Text style={styles.headerSubtitle}>Discover health insights and tips</Text>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                style={styles.backButtonGradient}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <Text style={styles.searchPlaceholder}>Search articles, topics, or tips...</Text>
          </View>
        </LinearGradient>

        {/* Category Filter */}
        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {exploreCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={selectedCategory === category.id ? category.gradient : ['#F1F5F9', '#E2E8F0']}
                  style={styles.categoryChip}
                >
                  <Ionicons 
                    name={category.icon as any} 
                    size={18} 
                    color={selectedCategory === category.id ? 'white' : '#6B7280'} 
                  />
                  <Text style={[
                    styles.categoryLabel,
                    selectedCategory === category.id && styles.categoryLabelActive
                  ]}>
                    {category.label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Articles */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Articles</Text>
          {featuredArticles.map((article) => (
            <TouchableOpacity key={article.id} style={styles.articleCard}>
              <LinearGradient
                colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                style={styles.articleGradient}
              >
                <View style={styles.articleHeader}>
                  <View style={styles.articleMeta}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{article.category}</Text>
                    </View>
                    <Text style={styles.readTime}>{article.readTime}</Text>
                  </View>
                  <TouchableOpacity style={styles.bookmarkButton}>
                    <LinearGradient
                      colors={['#F3E8FF', '#E9D5FF']}
                      style={styles.bookmarkGradient}
                    >
                      <Ionicons name="bookmark-outline" size={20} color="#7C3AED" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
                <TouchableOpacity style={styles.readMoreButton}>
                  <LinearGradient
                    colors={article.gradient}
                    style={styles.readMoreGradient}
                  >
                    <Text style={styles.readMoreText}>Read More</Text>
                    <Ionicons name="arrow-forward" size={16} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Topics */}
        <View style={styles.quickTopicsSection}>
          <Text style={styles.sectionTitle}>Quick Topics</Text>
          <View style={styles.quickTopicsGrid}>
            {quickTopics.map((topic, index) => (
              <TouchableOpacity key={index} style={styles.topicCard}>
                <LinearGradient
                  colors={topic.gradient}
                  style={styles.topicGradient}
                >
                  <View style={styles.topicIconContainer}>
                    <Ionicons name={topic.icon as any} size={28} color="white" />
                  </View>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicCount}>{topic.count}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Now */}
        <View style={styles.trendingSection}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <View style={styles.trendingCard}>
            <LinearGradient
              colors={['#8B5CF6', '#A78BFA']}
              style={styles.trendingGradient}
            >
              <View style={styles.trendingContent}>
                <View style={styles.trendingTextContainer}>
                  <Text style={styles.trendingTitle}>Weekly Wellness Challenge</Text>
                  <Text style={styles.trendingDescription}>
                    Join thousands of women in our weekly wellness challenge. Track your progress and earn rewards!
                  </Text>
                  <TouchableOpacity style={styles.trendingButton}>
                    <Text style={styles.trendingButtonText}>Join Challenge</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.trendingIconContainer}>
                  <Ionicons name="trophy" size={40} color="white" />
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
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
    marginTop: 50,
  },
  hexagon: {
    width: 40,
    height: 40,
    backgroundColor: '#6366F1',
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
    marginBottom: 20,
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
  backButton: {
    width: 48,
    height: 48,
  },
  backButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  searchBar: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  searchPlaceholder: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginLeft: 12,
  },
  categorySection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    backgroundColor: 'white',
  },
  categoryLabel: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#6B7280',
    fontSize: 14,
  },
  categoryLabelActive: {
    color: 'white',
  },
  featuredSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  articleCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    backgroundColor: 'white',
  },
  articleGradient: {
    padding: 20,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '600',
  },
  readTime: {
    color: '#6B7280',
    fontSize: 14,
  },
  bookmarkButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  bookmarkGradient: {
    padding: 12,
    borderRadius: 20,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
    lineHeight: 28,
  },
  articleExcerpt: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 24,
  },
  readMoreButton: {
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  readMoreGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  readMoreText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  quickTopicsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  quickTopicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  topicCard: {
    width: '48%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    backgroundColor: 'white',
  },
  topicGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
  },
  topicIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  },
  topicCount: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  trendingSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 32,
  },
  trendingCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    backgroundColor: 'white',
  },
  trendingGradient: {
    padding: 24,
  },
  trendingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trendingTextContainer: {
    flex: 1,
  },
  trendingTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  trendingDescription: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  trendingButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  trendingButtonText: {
    color: '#C44569',
    fontWeight: '600',
    fontSize: 14,
  },
  trendingIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExploreScreen;
