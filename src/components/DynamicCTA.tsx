import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CTA } from '../types';

interface DynamicCTAProps {
  cta: CTA;
  onPress?: () => void;
  className?: string;
}

const DynamicCTA: React.FC<DynamicCTAProps> = ({ cta, onPress, className }) => {
  const getCTAColor = () => {
    switch (cta.type) {
      case 'book':
        return '#0EA5E9';
      case 'buy':
        return '#10B981';
      case 'consult':
        return '#7C3AED';
      case 'learn':
        return '#F59E0B';
      case 'contact':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getCTAIcon = () => {
    switch (cta.type) {
      case 'book':
        return 'calendar';
      case 'buy':
        return 'cart';
      case 'consult':
        return 'medical';
      case 'learn':
        return 'school';
      case 'contact':
        return 'mail';
      default:
        return 'arrow-forward';
    }
  };

  const handleCTAPress = async () => {
    if (onPress) {
      onPress();
      return;
    }

    try {
      // Check if URL is a deep link or external URL
      const supported = await Linking.canOpenURL(cta.url);
      
      if (supported) {
        await Linking.openURL(cta.url);
      } else {
        Alert.alert(
          'Cannot Open Link',
          'This link cannot be opened. Please check the URL and try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to open the link. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const formatExpiryDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[getCTAColor(), getCTAColor() + 'CC']}
        style={styles.ctaButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.ctaButtonContent}
          onPress={handleCTAPress}
          activeOpacity={0.8}
        >
          <Ionicons name={getCTAIcon() as any} size={24} color="white" />
          <Text style={styles.ctaText}>
            {cta.label}
          </Text>
          <Ionicons name="arrow-forward" size={24} color="white" style={styles.arrowIcon} />
        </TouchableOpacity>
      </LinearGradient>
      
      {/* Expiry indicator */}
      {cta.expiresAt && (
        <View style={styles.expiryContainer}>
          <Ionicons name="time-outline" size={14} color="#6B7280" />
          <Text style={styles.expiryText}>
            Expires {formatExpiryDate(cta.expiresAt)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles
  },
  ctaButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  ctaButtonContent: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 16,
  },
  arrowIcon: {
    marginLeft: 12,
  },
  expiryContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expiryText: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default DynamicCTA;
