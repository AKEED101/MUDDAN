import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ConsultantProfile {
  id: number;
  name: string;
  specialization: string;
  bio: string;
  rating: number;
  reviews: number;
  pricePerHour: number;
  currency: string;
  isAvailable: boolean;
  canPrescribe: boolean;
  isVerified: boolean;
  avatar: string;
  coverImage: string;
  category: string;
  specialties: string[];
  languages: string[];
  experience: number;
  education: string;
  license?: string;
  availability: {
    day: string;
    slots: string[];
  }[];
  portfolio: string[];
  services: {
    name: string;
    description: string;
    price: number;
  }[];
}

const ConsultantProfileScreen: React.FC<{ navigation: any; route: any }> = ({ 
  navigation, 
  route 
}) => {
  const { consultantId } = route.params;
  const [isSaved, setIsSaved] = useState(false);

  // Mock consultant profile data based on ID
  const consultantProfile: ConsultantProfile = {
    id: parseInt(consultantId),
    name: 'Dr. Sarah Johnson',
    specialization: 'Obstetrician & Gynecologist',
    bio: "I'm a dedicated healthcare professional with over 10 years of experience in women's health. I specialize in providing comprehensive care during pregnancy, focusing on both physical and emotional well-being. My approach combines evidence-based medicine with personalized care plans tailored to each individual's needs.",
    rating: 4.9,
    reviews: 127,
    pricePerHour: 150,
    currency: 'USD',
    isAvailable: true,
    canPrescribe: true,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://via.placeholder.com/400x200',
    category: 'Health',
    specialties: ['Prenatal Care', 'Postpartum Support', 'Nutrition Guidance', 'Exercise Planning'],
    languages: ['English', 'Somali', 'Arabic'],
    experience: 12,
    education: 'MD - University of Medical Sciences',
    license: 'LIC-12345',
    availability: [
      { day: 'Mon', slots: ['9:00 AM', '2:00 PM', '4:00 PM'] },
      { day: 'Tue', slots: ['10:00 AM', '3:00 PM'] },
      { day: 'Wed', slots: ['9:00 AM', '1:00 PM', '5:00 PM'] },
      { day: 'Thu', slots: ['11:00 AM', '2:00 PM'] },
      { day: 'Fri', slots: ['9:00 AM', '3:00 PM'] },
    ],
    portfolio: [
      'https://via.placeholder.com/200x200',
      'https://via.placeholder.com/200x200',
      'https://via.placeholder.com/200x200',
    ],
    services: [
      {
        name: 'Initial Consultation',
        description: 'Comprehensive health assessment and care planning',
        price: 150,
      },
      {
        name: 'Follow-up Session',
        description: 'Progress review and treatment adjustments',
        price: 112.5,
      },
      {
        name: 'Emergency Consultation',
        description: 'Urgent care and immediate support',
        price: 225,
      },
    ],
  };

  const handleBookConsultation = () => {
    navigation.navigate('BookingMode', { consultant: consultantProfile });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share consultant profile');
  };

  const renderRating = (rating: number, reviews: number) => {
    return (
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={20} color="#F59E0B" />
        <Text style={styles.ratingText}>{rating}</Text>
        <Text style={styles.reviewsText}>({reviews} reviews)</Text>
      </View>
    );
  };

  const renderBadges = () => {
    return (
      <View style={styles.badgesContainer}>
        {consultantProfile.isVerified && (
          <View style={styles.badge}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text style={styles.badgeText}>Verified</Text>
          </View>
        )}
        {consultantProfile.canPrescribe && (
          <View style={styles.badge}>
            <Ionicons name="medical" size={16} color="#3B82F6" />
            <Text style={styles.badgeText}>Can Prescribe</Text>
          </View>
        )}
        <View style={styles.badge}>
          <Ionicons name="time" size={16} color="#8B5CF6" />
          <Text style={styles.badgeText}>{consultantProfile.experience} years</Text>
        </View>
      </View>
    );
  };

  const renderAvailabilityPreview = () => {
    return (
      <View style={styles.availabilitySection}>
        <Text style={styles.sectionTitle}>Next 7 Days Availability</Text>
        <View style={styles.availabilityGrid}>
          {consultantProfile.availability.slice(0, 7).map((day, index) => (
            <View key={index} style={styles.daySlot}>
              <Text style={styles.dayText}>{day.day}</Text>
              <Text style={styles.slotsText}>{day.slots.length} slots</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderPortfolio = () => {
    if (consultantProfile.portfolio.length === 0) return null;
    
    return (
      <View style={styles.portfolioSection}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {consultantProfile.portfolio.map((image, index) => (
            <TouchableOpacity key={index} style={styles.portfolioImage}>
              <Image source={{ uri: image }} style={styles.portfolioImageSource} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderServices = () => {
    return (
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Services & Programs</Text>
        {consultantProfile.services.map((service, index) => (
          <View key={index} style={styles.serviceCard}>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </View>
            <Text style={styles.servicePrice}>${service.price}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: consultantProfile.coverImage }} style={styles.coverImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Image source={{ uri: consultantProfile.avatar }} style={styles.heroAvatar} />
              <View style={styles.heroInfo}>
                <Text style={styles.heroName}>{consultantProfile.name}</Text>
                <Text style={styles.heroSpecialization}>{consultantProfile.specialization}</Text>
                {renderRating(consultantProfile.rating, consultantProfile.reviews)}
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookConsultation}>
            <Ionicons name="calendar" size={20} color="white" />
            <Text style={styles.bookButtonText}>Book Consultation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons 
              name={isSaved ? "bookmark" : "bookmark-outline"} 
              size={20} 
              color={isSaved ? "#7C3AED" : "#6B7280"} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Badges */}
        <View style={styles.badgesSection}>
          {renderBadges()}
        </View>

        {/* Bio */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{consultantProfile.bio}</Text>
        </View>

        {/* Specialties */}
        <View style={styles.specialtiesSection}>
          <Text style={styles.sectionTitle}>Specialties</Text>
          <View style={styles.specialtiesGrid}>
            {consultantProfile.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Languages */}
        <View style={styles.languagesSection}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.languagesGrid}>
            {consultantProfile.languages.map((language, index) => (
              <View key={index} style={styles.languageTag}>
                <Text style={styles.languageText}>{language}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Price */}
        <View style={styles.priceSection}>
          <Text style={styles.sectionTitle}>Consultation Fee</Text>
          <View style={styles.priceCard}>
            <Text style={styles.priceAmount}>${consultantProfile.pricePerHour}</Text>
            <Text style={styles.priceLabel}>per hour</Text>
          </View>
        </View>

        {/* Availability Preview */}
        {renderAvailabilityPreview()}

        {/* Portfolio */}
        {renderPortfolio()}

        {/* Services */}
        {renderServices()}

        {/* Admin-only License Verification */}
        {consultantProfile.license && (
          <View style={styles.licenseSection}>
            <Text style={styles.sectionTitle}>License Information</Text>
            <View style={styles.licenseCard}>
              <Ionicons name="shield-checkmark" size={24} color="#10B981" />
              <Text style={styles.licenseText}>License: {consultantProfile.license}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  heroSection: {
    position: 'relative',
    height: 250,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'flex-end',
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  heroAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    marginRight: 16,
  },
  heroInfo: {
    flex: 1,
  },
  heroName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  heroSpecialization: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  shareButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  badgesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  bioSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  specialtiesSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  specialtiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyTag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  specialtyText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500',
  },
  languagesSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  languagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageTag: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  languageText: {
    fontSize: 14,
    color: '#0284C7',
    fontWeight: '500',
  },
  priceSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  priceCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3E8FF',
    borderRadius: 16,
  },
  priceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  priceLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  availabilitySection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  availabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  daySlot: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    minWidth: 60,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  slotsText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  portfolioSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  portfolioImage: {
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  portfolioImageSource: {
    width: 120,
    height: 120,
  },
  servicesSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  licenseSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  licenseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    gap: 12,
  },
  licenseText: {
    fontSize: 16,
    color: '#166534',
    fontWeight: '500',
  },
});

export default ConsultantProfileScreen;
