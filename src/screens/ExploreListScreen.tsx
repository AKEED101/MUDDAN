import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types';

type ExploreListScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ExploreList'>;

const { width } = Dimensions.get('window');

const ExploreListScreen = () => {
  const navigation = useNavigation<ExploreListScreenNavigationProp>();

  const categories = [
    {
      id: '1',
      title: 'Health & Wellness',
      icon: 'heart',
      gradient: ['#EC4899', '#F472B6'] as const,
      description: 'Tips for overall health and well-being',
      articleCount: 12
    },
    {
      id: '2',
      title: 'Fitness & Exercise',
      icon: 'fitness',
      gradient: ['#06B6D4', '#22D3EE'] as const,
      description: 'Workout routines and fitness advice',
      articleCount: 8
    },
    {
      id: '3',
      title: 'Nutrition & Diet',
      icon: 'nutrition',
      gradient: ['#8B5CF6', '#A78BFA'] as const,
      description: 'Healthy eating and meal planning',
      articleCount: 15
    },
    {
      id: '4',
      title: 'Mental Health',
      icon: 'brain',
      gradient: ['#10B981', '#34D399'] as const,
      description: 'Mental wellness and stress management',
      articleCount: 10
    },
    {
      id: '5',
      title: 'Pregnancy Care',
      icon: 'baby',
      gradient: ['#F59E0B', '#FBBF24'] as const,
      description: 'Pregnancy tips and guidance',
      articleCount: 20
    },
    {
      id: '6',
      title: 'Cycle Tracking',
      icon: 'calendar',
      gradient: ['#EF4444', '#F87171'] as const,
      description: 'Understanding your menstrual cycle',
      articleCount: 14
    }
  ];

  const featuredArticles = [
    {
      id: '1',
      title: 'Understanding Your Cycle',
      excerpt: 'Learn about the different phases of your menstrual cycle and what to expect.',
      readTime: '5 min read',
      category: 'Education'
    },
    {
      id: '2',
      title: 'Nutrition Tips for Period Health',
      excerpt: 'Discover foods that can help manage period symptoms and boost your energy.',
      readTime: '7 min read',
      category: 'Health'
    },
    {
      id: '3',
      title: 'Exercise During Your Period',
      excerpt: 'Safe and effective workout routines that work with your cycle.',
      readTime: '6 min read',
      category: 'Fitness'
    }
  ];

  const handleCategoryPress = (categoryId: string) => {
    // Navigate to category-specific articles
    navigation.navigate('ArticleList');
  };

  const handleArticlePress = (articleId: string) => {
    navigation.navigate('ExploreDetail', { articleId });
  };

  const handleViewAllArticles = () => {
    navigation.navigate('ArticleList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#A855F7']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.sectionSubtitle}>Explore by topic</Text>
          </View>
          
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.id)}
              >
                <LinearGradient
                  colors={category.gradient}
                  style={styles.categoryIcon}
                >
                  <Ionicons name={category.icon as any} size={24} color="white" />
                </LinearGradient>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
                <Text style={styles.articleCount}>{category.articleCount} articles</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Articles Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Articles</Text>
            <TouchableOpacity onPress={handleViewAllArticles}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {featuredArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => handleArticlePress(article.id)}
            >
              <View style={styles.articleHeader}>
                <Text style={styles.articleCategory}>{article.category}</Text>
                <Text style={styles.readTime}>{article.readTime}</Text>
              </View>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
              <View style={styles.articleFooter}>
                <TouchableOpacity style={styles.readMoreButton}>
                  <Text style={styles.readMoreText}>Read More</Text>
                  <Ionicons name="arrow-forward" size={16} color="#7C3AED" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  searchButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  viewAllText: {
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  articleCount: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '500',
  },
  articleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  articleCategory: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '600',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 24,
  },
  articleExcerpt: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  articleFooter: {
    alignItems: 'flex-end',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '600',
  },
});

export default ExploreListScreen;
