import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CTA, UserRole } from '../types';

interface CTAComposerProps {
  userRole: UserRole;
  onSubmit: (content: string, cta?: CTA) => void;
  onCancel: () => void;
  visible: boolean;
}

const CTAComposer: React.FC<CTAComposerProps> = ({ userRole, onSubmit, onCancel, visible }) => {
  const [content, setContent] = useState('');
  const [selectedCTA, setSelectedCTA] = useState<CTA | null>(null);
  const [showCTASelector, setShowCTASelector] = useState(false);

  const availableCTATypes = () => {
    const types: Array<{ type: CTA['type']; label: string; icon: string; color: string }> = [];
    
    // Admin and Verified Pros can use all CTA types
    if (userRole.role === 'admin' || (userRole.role === 'professional' && userRole.isVerified)) {
      types.push(
        { type: 'book', label: 'Book Appointment', icon: 'calendar', color: 'bg-blue-500' },
        { type: 'buy', label: 'Buy Product', icon: 'cart', color: 'bg-green-500' },
        { type: 'consult', label: 'Consult Expert', icon: 'medical', color: 'bg-purple-500' },
        { type: 'learn', label: 'Learn More', icon: 'school', color: 'bg-orange-500' },
        { type: 'contact', label: 'Contact Us', icon: 'mail', color: 'bg-pink-500' }
      );
    }
    // Premium users can use book and consult
    else if (userRole.role === 'premium') {
      types.push(
        { type: 'book', label: 'Book Appointment', icon: 'calendar', color: 'bg-purple-500' },
        { type: 'consult', label: 'Consult Expert', icon: 'medical', color: 'bg-purple-500' }
      );
    }
    // Free users cannot add CTAs
    else {
      return [];
    }
    
    return types;
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please write some content before posting.');
      return;
    }

    onSubmit(content.trim(), selectedCTA || undefined);
    setContent('');
    setSelectedCTA(null);
  };

  const createCTA = (type: CTA['type']) => {
    const cta: CTA = {
      type,
      label: getDefaultLabel(type),
      url: getDefaultURL(type),
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    };
    
    setSelectedCTA(cta);
    setShowCTASelector(false);
  };

  const getDefaultLabel = (type: CTA['type']): string => {
    switch (type) {
      case 'book': return 'Book Now';
      case 'buy': return 'Buy Now';
      case 'consult': return 'Get Consultation';
      case 'learn': return 'Learn More';
      case 'contact': return 'Contact Us';
      default: return 'Learn More';
    }
  };

  const getDefaultURL = (type: CTA['type']): string => {
    switch (type) {
      case 'book': return 'muddan://book-appointment';
      case 'buy': return 'muddan://shop';
      case 'consult': return 'muddan://consultations';
      case 'learn': return 'muddan://learn';
      case 'contact': return 'muddan://contact';
      default: return 'muddan://learn';
    }
  };

  const removeCTA = () => {
    setSelectedCTA(null);
  };

  const getCTAButtonColor = (type: CTA['type']): string => {
    switch (type) {
      case 'book': return '#3B82F6';
      case 'buy': return '#10B981';
      case 'consult': return '#8B5CF6';
      case 'learn': return '#F59E0B';
      case 'contact': return '#EC4899';
      default: return '#8B5CF6';
    }
  };

  const getCTABackgroundColor = (type: CTA['type']): string => {
    switch (type) {
      case 'book': return '#DBEAFE';
      case 'buy': return '#D1FAE5';
      case 'consult': return '#EDE9FE';
      case 'learn': return '#FEF3C7';
      case 'contact': return '#FCE7F3';
      default: return '#EDE9FE';
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Post</Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={[
              styles.submitButton,
              content.trim() ? styles.submitButtonActive : styles.submitButtonInactive
            ]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Content Input */}
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>What's on your mind?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Share your thoughts, questions, or experiences..."
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* CTA Section */}
          <View style={styles.ctaCard}>
            <View style={styles.ctaHeader}>
              <Text style={styles.ctaTitle}>Call to Action</Text>
              {!selectedCTA && (
                <TouchableOpacity
                  style={styles.addCTAButton}
                  onPress={() => setShowCTASelector(true)}
                >
                  <Ionicons name="add" size={24} color="white" />
                  <Text style={styles.addCTAText}>Add CTA</Text>
                </TouchableOpacity>
              )}
            </View>

            {selectedCTA ? (
              <View style={[
                styles.ctaDisplay,
                { backgroundColor: getCTABackgroundColor(selectedCTA.type) }
              ]}>
                <View style={styles.ctaInfo}>
                  <View style={styles.ctaTypeRow}>
                    <View style={[
                      styles.ctaTypeIndicator,
                      { backgroundColor: getCTAButtonColor(selectedCTA.type) }
                    ]} />
                    <Text style={styles.ctaTypeText}>
                      {getDefaultLabel(selectedCTA.type)}
                    </Text>
                  </View>
                  <Text style={styles.ctaDescription}>
                    {selectedCTA.label}
                  </Text>
                  {selectedCTA.expiresAt && (
                    <Text style={styles.ctaExpiry}>
                      Expires: {selectedCTA.expiresAt.toLocaleDateString()}
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={removeCTA} style={styles.removeCTAButton}>
                  <Ionicons name="close" size={20} color="#7C3AED" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.noCTACard}>
                <Ionicons name="megaphone-outline" size={48} color="#9CA3AF" />
                <Text style={styles.noCTAText}>No CTA added</Text>
                <Text style={styles.noCTASubtext}>
                  Add a call-to-action to engage your audience
                </Text>
              </View>
            )}
          </View>

          {/* Role Info */}
          <View style={styles.roleInfoCard}>
            <View style={styles.roleRow}>
              <Ionicons name="information-circle" size={20} color="#1D4ED8" />
              <Text style={styles.roleText}>Your Role: {userRole.role}</Text>
            </View>
            <Text style={styles.roleDescription}>
              {userRole.role === 'admin' || (userRole.role === 'professional' && userRole.isVerified)
                ? 'You can add all types of CTAs'
                : userRole.role === 'premium'
                ? 'You can add book and consult CTAs'
                : 'Free users cannot add CTAs'}
            </Text>
          </View>
        </ScrollView>

        {/* CTA Type Selector Modal */}
        <Modal
          visible={showCTASelector}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCTASelector(false)}
        >
          <View style={styles.ctaSelectorOverlay}>
            <View style={styles.ctaSelectorContent}>
              <Text style={styles.ctaSelectorTitle}>Select CTA Type</Text>
              
              <View style={styles.ctaTypeList}>
                {availableCTATypes().map((ctaType) => (
                  <LinearGradient
                    key={ctaType.type}
                    colors={[getCTAButtonColor(ctaType.type), getCTAButtonColor(ctaType.type) + 'CC']}
                    style={styles.ctaTypeButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <TouchableOpacity
                      style={styles.ctaTypeButtonContent}
                      onPress={() => createCTA(ctaType.type)}
                    >
                      <Ionicons name={ctaType.icon as any} size={24} color="white" />
                      <Text style={styles.ctaTypeButtonText}>
                        {ctaType.label}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                ))}
              </View>

              <TouchableOpacity
                style={styles.cancelCTAButton}
                onPress={() => setShowCTASelector(false)}
              >
                <Text style={styles.cancelCTAText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelButton: {
    color: '#6B7280',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  submitButton: {
    fontWeight: '600',
  },
  submitButtonActive: {
    color: '#7C3AED',
  },
  submitButtonInactive: {
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  inputCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputLabel: {
    color: '#1F2937',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  textInput: {
    color: '#1F2937',
    fontSize: 18,
    lineHeight: 24,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  ctaCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ctaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  addCTAButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCTAText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
  ctaDisplay: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#7C3AED',
  },
  ctaInfo: {
    flex: 1,
  },
  ctaTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ctaTypeIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  ctaTypeText: {
    color: '#7C3AED',
    fontWeight: 'bold',
    fontSize: 18,
  },
  ctaDescription: {
    color: '#7C3AED',
    fontSize: 16,
  },
  ctaExpiry: {
    color: '#7C3AED',
    fontSize: 14,
    marginTop: 8,
  },
  removeCTAButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  noCTACard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  noCTAText: {
    color: '#6B7280',
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  noCTASubtext: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  roleInfoCard: {
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  roleText: {
    color: '#1E40AF',
    fontWeight: '500',
    marginLeft: 8,
  },
  roleDescription: {
    color: '#1E40AF',
    fontSize: 14,
  },
  ctaSelectorOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  ctaSelectorContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  ctaSelectorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  ctaTypeList: {
    gap: 12,
  },
  ctaTypeButton: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaTypeButtonContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
  },
  ctaTypeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 12,
  },
  cancelCTAButton: {
    backgroundColor: '#D1D5DB',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 24,
  },
  cancelCTAText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#374151',
  },
});

export default CTAComposer;
