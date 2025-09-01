import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConsultantStackParamList } from '../navigation/types';
import { MockConsultant } from '../types';
import { useI18n } from '../i18n';

const { width } = Dimensions.get('window');

type ConsultantsScreenNavigationProp = NativeStackNavigationProp<ConsultantStackParamList, 'ConsultantsMain'>;

const ConsultantsScreen = () => {
  const navigation = useNavigation<ConsultantsScreenNavigationProp>();
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for consultants
  const consultants: MockConsultant[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Obstetrician & Gynecologist',
      experience: '15 years',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      availability: 'Available Today',
      price: '$150',
      languages: ['English', 'Spanish'],
      education: 'Harvard Medical School',
      hospital: 'Women\'s Health Center',
      isVerified: true,
      category: 'obgyn',
    },
    {
      id: '2',
      name: 'Dr. Maria Rodriguez',
      specialty: 'Reproductive Endocrinologist',
      experience: '12 years',
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      availability: 'Available Tomorrow',
      price: '$180',
      languages: ['English', 'Portuguese'],
      education: 'Stanford Medical School',
      hospital: 'Fertility Institute',
      isVerified: true,
      category: 'fertility',
    },
    {
      id: '3',
      name: 'Dr. Fatima Ahmed',
      specialty: 'Midwife & Doula',
      experience: '8 years',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
      availability: 'Available Now',
      price: '$120',
      languages: ['English', 'Arabic', 'Somali'],
      education: 'Yale School of Nursing',
      hospital: 'Natural Birth Center',
      isVerified: true,
      category: 'midwifery',
    },
    {
      id: '4',
      name: 'Dr. Emily Chen',
      specialty: 'Mental Health Specialist',
      experience: '10 years',
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face',
      availability: 'Available This Week',
      price: '$130',
      languages: ['English', 'Mandarin'],
      education: 'UCLA Medical School',
      hospital: 'Mental Wellness Clinic',
      isVerified: true,
      category: 'mental-health',
    },
    {
      id: '5',
      name: 'Dr. Lisa Thompson',
      specialty: 'Nutritionist & Dietitian',
      experience: '6 years',
      rating: 4.6,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face',
      availability: 'Available Today',
      price: '$90',
      languages: ['English'],
      education: 'Cornell University',
      hospital: 'Nutrition & Wellness Center',
      isVerified: true,
      category: 'nutrition',
    },
    {
      id: '6',
      name: 'Dr. Amina Hassan',
      specialty: 'Pediatrician',
      experience: '11 years',
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face',
      availability: 'Available Tomorrow',
      price: '$140',
      languages: ['English', 'Arabic', 'Somali'],
      education: 'Johns Hopkins Medical School',
      hospital: 'Children\'s Medical Center',
      isVerified: true,
      category: 'pediatrics',
    },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: 'grid', color: '#7C3AED' },
    { id: 'obgyn', name: 'OB/GYN', icon: 'medical', color: '#EC4899' },
    { id: 'fertility', name: 'Fertility', icon: 'heart', color: '#10B981' },
    { id: 'midwifery', name: 'Midwifery', icon: 'baby', color: '#F59E0B' },
    { id: 'mental-health', name: 'Mental Health', icon: 'brain', color: '#06B6D4' },
    { id: 'nutrition', name: 'Nutrition', icon: 'nutrition', color: '#8B5CF6' },
    { id: 'pediatrics', name: 'Pediatrics', icon: 'medical-outline', color: '#EF4444' },
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
        color={selectedCategory === category.id ? category.color : '#6B7280'} 
      />
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && { color: category.color }
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderConsultantCard = (consultant: MockConsultant) => (
    <TouchableOpacity
      key={consultant.id}
      style={styles.consultantCard}
      onPress={() => navigation.navigate('ConsultantProfile', { consultantId: consultant.id })}
    >
      <Image source={{ uri: consultant.image }} style={styles.consultantImage} />
      <View style={styles.consultantInfo}>
        <View style={styles.consultantHeader}>
          <View style={styles.consultantNameSection}>
            <Text style={styles.consultantName}>{consultant.name}</Text>
            {consultant.isVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              </View>
            )}
          </View>
          <View style={styles.ratingSection}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>{consultant.rating}</Text>
            <Text style={styles.reviewsText}>({consultant.reviews})</Text>
          </View>
        </View>
        
        <Text style={styles.consultantSpecialty}>{consultant.specialty}</Text>
        <Text style={styles.consultantExperience}>{consultant.experience} experience</Text>
        
        <View style={styles.consultantDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="school" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{consultant.education}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="business" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{consultant.hospital}</Text>
          </View>
        </View>
        
        <View style={styles.consultantLanguages}>
          {consultant.languages.map((language: string, index: number) => (
            <View key={index} style={styles.languageTag}>
              <Text style={styles.languageText}>{language}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.consultantFooter}>
          <View style={styles.availabilitySection}>
            <Ionicons name="time" size={16} color="#10B981" />
            <Text style={styles.availabilityText}>{consultant.availability}</Text>
          </View>
          <View style={styles.priceSection}>
            <Text style={styles.priceText}>{consultant.price}</Text>
            <Text style={styles.priceLabel}>per session</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking', { consultantId: consultant.id })}
        >
          <LinearGradient
            colors={['#7C3AED', '#A855F7']}
            style={styles.bookButtonGradient}
          >
            <Ionicons name="calendar" size={20} color="white" />
            <Text style={styles.bookButtonText}>Book Consultation</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredConsultants = selectedCategory === 'all' 
    ? consultants 
    : consultants.filter(c => c.category === selectedCategory);

  const searchFilteredConsultants = searchQuery 
    ? filteredConsultants.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredConsultants;

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
              <Text style={styles.headerTitle}>{t('consultants')}</Text>
              <Text style={styles.headerSubtitle}>{t('expertPros')}</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                style={styles.filterButtonGradient}
              >
                <Ionicons name="filter" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search consultants, specialties..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(renderCategoryButton)}
          </ScrollView>
        </View>

        {/* Consultants List */}
        <View style={styles.consultantsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? 'Search Results' : 'Available Consultants'}
            </Text>
            <Text style={styles.consultantsCount}>
              {searchFilteredConsultants.length} consultants
            </Text>
          </View>
          {searchFilteredConsultants.map(renderConsultantCard)}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Booking', { consultantId: '1' })}
            >
              <LinearGradient
                colors={['#EC4899', '#F472B6']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="calendar" size={24} color="white" />
                <Text style={styles.quickActionText}>{t('bookAppointment')}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Chat', { consultationId: '1' })}
            >
              <LinearGradient
                colors={['#10B981', '#34D399']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="chatbubble" size={24} color="white" />
                <Text style={styles.quickActionText}>{t('chatSupport')}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('MyConsultations')}
            >
              <LinearGradient
                colors={['#7C3AED', '#4F46E5']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="time" size={24} color="white" />
                <Text style={styles.quickActionText}>{t('myConsultations')}</Text>
              </LinearGradient>
            </TouchableOpacity>
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
  filterButton: {
    width: 48,
    height: 48,
  },
  filterButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
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
  consultantsSection: {
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
  consultantsCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  consultantCard: {
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
  consultantImage: {
    width: '100%',
    height: 200,
  },
  consultantInfo: {
    padding: 20,
  },
  consultantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  consultantNameSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  consultantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginRight: 8,
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  consultantSpecialty: {
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '600',
    marginBottom: 4,
  },
  consultantExperience: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  consultantDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  consultantLanguages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  languageTag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  languageText: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '600',
  },
  consultantFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  availabilitySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 4,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  bookButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 40,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ConsultantsScreen;


