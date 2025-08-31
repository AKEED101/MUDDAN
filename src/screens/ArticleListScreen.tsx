import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types';

type ArticleListScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ExploreList'>;

const ArticleListScreen = () => {
  const navigation = useNavigation<ArticleListScreenNavigationProp>();

  const articles = [
    {
      id: '1',
      title: 'Understanding Your Cycle',
      excerpt: 'Learn about the different phases of your menstrual cycle and what to expect.',
      readTime: '5 min read',
      category: 'Education',
    },
    {
      id: '2',
      title: 'Nutrition Tips for Period Health',
      excerpt: 'Discover foods that can help manage period symptoms and boost your energy.',
      readTime: '7 min read',
      category: 'Health',
    },
    {
      id: '3',
      title: 'Exercise During Your Period',
      excerpt: 'Safe and effective workout routines that work with your cycle.',
      readTime: '6 min read',
      category: 'Fitness',
    },
    {
      id: '4',
      title: 'Mental Health and Hormones',
      excerpt: 'How hormonal changes affect your mood and mental well-being.',
      readTime: '8 min read',
      category: 'Wellness',
    },
  ];

  const handleArticlePress = (articleId: string) => {
    navigation.navigate('ExploreDetail', { articleId });
  };

  const renderArticle = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => handleArticlePress(item.id)}
    >
      <View style={styles.articleHeader}>
        <Text style={styles.articleCategory}>{item.category}</Text>
        <Text style={styles.readTime}>{item.readTime}</Text>
      </View>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleExcerpt}>{item.excerpt}</Text>
      <View style={styles.articleFooter}>
        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read More</Text>
          <Ionicons name="arrow-forward" size={16} color="#7C3AED" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Articles</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  articleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  articleCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C3AED',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 24,
  },
  articleExcerpt: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C3AED',
  },
});

export default ArticleListScreen;
