import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MockSearchResult } from '../types';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', name: 'All', icon: 'grid' },
    { id: 'health', name: 'Health', icon: 'medical' },
    { id: 'fitness', name: 'Fitness', icon: 'fitness' },
    { id: 'beauty', name: 'Beauty', icon: 'rose' },
    { id: 'lifestyle', name: 'Lifestyle', icon: 'heart' },
  ];

  const searchResults: MockSearchResult[] = [
    {
      id: 1,
      type: 'article',
      title: 'Best Exercises for First Trimester',
      category: 'Fitness',
      image: 'https://via.placeholder.com/60x60',
      author: 'Dr. Sarah Johnson',
      date: '2 days ago',
    },
    {
      id: 2,
      type: 'consultant',
      title: 'Dr. Fatima Ahmed',
      category: 'Prenatal Fitness',
      image: 'https://via.placeholder.com/60x60',
      rating: 4.8,
      price: '$75',
    },
    {
      id: 3,
      type: 'community',
      title: 'Pregnancy Sleep Tips',
      category: 'Health',
      image: 'https://via.placeholder.com/60x60',
      author: 'Sarah M.',
      replies: 12,
    },
  ];

  const renderSearchResult = (result: MockSearchResult) => {
    if (result.type === 'article') {
      return (
        <TouchableOpacity key={result.id} style={styles.resultCard}>
          <Image source={{ uri: result.image }} style={styles.resultImage} />
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>{result.title}</Text>
            <Text style={styles.resultCategory}>{result.category}</Text>
            <Text style={styles.resultMeta}>{result.author} • {result.date}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      );
    } else if (result.type === 'consultant') {
      return (
        <TouchableOpacity key={result.id} style={styles.resultCard}>
          <Image source={{ uri: result.image }} style={styles.resultImage} />
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>{result.title}</Text>
            <Text style={styles.resultCategory}>{result.category}</Text>
            <View style={styles.resultMeta}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.resultRating}>{result.rating}</Text>
              <Text style={styles.resultPrice}>{result.price}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity key={result.id} style={styles.resultCard}>
          <Image source={{ uri: result.image }} style={styles.resultImage} />
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>{result.title}</Text>
            <Text style={styles.resultCategory}>{result.category}</Text>
            <View style={styles.resultMetaContainer}>
              <Text style={styles.resultMetaText}>{result.author} • {result.replies} replies</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search articles, consultants, community..."
              style={styles.searchInput}
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                activeTab === tab.id && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon as any}
                size={16}
                color={activeTab === tab.id ? '#7C3AED' : '#6B7280'}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results */}
        <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
          {searchQuery.length > 0 ? (
            searchResults.map(renderSearchResult)
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateTitle}>Search for anything</Text>
              <Text style={styles.emptyStateSubtitle}>
                Find articles, consultants, and community posts
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  placeholder: {
    width: 32,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeTabButton: {
    backgroundColor: '#EDE9FE',
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#7C3AED',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 14,
    color: '#7C3AED',
    marginBottom: 4,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultMetaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  resultRating: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  resultPrice: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SearchModal;
