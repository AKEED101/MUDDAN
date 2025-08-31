import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { adaptiveSupabaseService, InternetSpeed } from '../services/adaptiveSupabase';

/**
 * Adaptive Example Component
 * Shows how the app automatically adapts to different internet speeds
 * Perfect for both rural Somalia (2G/3G) and urban areas (5G)
 */
const AdaptiveExample: React.FC = () => {
  const [currentSpeed, setCurrentSpeed] = useState<InternetSpeed>(InternetSpeed.MEDIUM);
  const [performanceStatus, setPerformanceStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check internet speed on component mount
    checkInternetSpeed();
    
    // Set up periodic speed checking
    const interval = setInterval(checkInternetSpeed, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const checkInternetSpeed = async () => {
    try {
      const status = adaptiveSupabaseService.getPerformanceStatus();
      setCurrentSpeed(status.currentSpeed);
      setPerformanceStatus(status);
      
      console.log(`🌐 Current Internet Speed: ${status.currentSpeed}`);
      console.log(`⚙️ Settings:`, status.settings);
    } catch (error) {
      console.warn('⚠️ Speed detection failed:', error);
    }
  };

  const testDatabaseOperation = async () => {
    setIsLoading(true);
    try {
      // This will automatically use the optimal settings for current speed
      const result = await adaptiveSupabaseService.select('user_profiles', '*', { limit: 5 });
      
      Alert.alert(
        '✅ Database Test Successful',
        `Retrieved ${result.data?.length || 0} users\nSpeed: ${currentSpeed}\nCache: ${performanceStatus?.cacheSize || 0} items`
      );
      
      setUserData(result.data);
    } catch (error) {
      Alert.alert('❌ Database Test Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testImageOptimization = async () => {
    try {
      // This will automatically optimize image quality based on internet speed
      const imageUrl = await adaptiveSupabaseService.getOptimizedImageUrl(
        'profile-images',
        'user-avatar.jpg'
      );
      
      Alert.alert(
        '🖼️ Image Optimization',
        `Speed: ${currentSpeed}\nURL: ${imageUrl}\nQuality: ${performanceStatus?.settings?.imageQuality}`
      );
    } catch (error) {
      Alert.alert('❌ Image Test Failed', error.message);
    }
  };

  const testRealTimeFeatures = async () => {
    try {
      // This will automatically enable/disable based on internet speed
      const channel = await adaptiveSupabaseService.subscribe('user_profiles', (payload) => {
        console.log('📡 Real-time update:', payload);
      });
      
      if (channel) {
        Alert.alert(
          '⚡ Real-time Enabled',
          `Speed: ${currentSpeed}\nReal-time: Active\nUpdates: Live`
        );
      } else {
        Alert.alert(
          '⚠️ Real-time Disabled',
          `Speed: ${currentSpeed}\nReal-time: Disabled\nReason: Slow connection`
        );
      }
    } catch (error) {
      Alert.alert('❌ Real-time Test Failed', error.message);
    }
  };

  const clearCache = () => {
    adaptiveSupabaseService.clearCache();
    setPerformanceStatus(prev => ({ ...prev, cacheSize: 0 }));
    Alert.alert('💾 Cache Cleared', 'All cached data has been removed');
  };

  const getSpeedEmoji = (speed: InternetSpeed) => {
    const emojis = {
      [InternetSpeed.VERY_SLOW]: '🐌',
      [InternetSpeed.SLOW]: '🐢',
      [InternetSpeed.MEDIUM]: '🚶',
      [InternetSpeed.FAST]: '🚀',
      [InternetSpeed.VERY_FAST]: '⚡'
    };
    return emojis[speed] || '❓';
  };

  const getSpeedDescription = (speed: InternetSpeed) => {
    const descriptions = {
      [InternetSpeed.VERY_SLOW]: '2G Rural - Very Slow',
      [InternetSpeed.SLOW]: '3G Rural - Slow',
      [InternetSpeed.MEDIUM]: '4G Urban - Medium',
      [InternetSpeed.FAST]: '5G Urban - Fast',
      [InternetSpeed.VERY_FAST]: '5G+ Urban - Very Fast'
    };
    return descriptions[speed] || 'Unknown';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🌍 MUDDAN Adaptive App</Text>
        <Text style={styles.subtitle}>Perfect for All Internet Conditions</Text>
      </View>

      {/* Current Speed Display */}
      <View style={styles.speedCard}>
        <Text style={styles.speedTitle}>Current Internet Speed</Text>
        <View style={styles.speedInfo}>
          <Text style={styles.speedEmoji}>{getSpeedEmoji(currentSpeed)}</Text>
          <Text style={styles.speedText}>{getSpeedDescription(currentSpeed)}</Text>
        </View>
        
        {performanceStatus && (
          <View style={styles.settingsInfo}>
            <Text style={styles.settingsTitle}>Auto-Configuration:</Text>
            <Text>📡 Connections: {performanceStatus.settings.connectionPoolSize}</Text>
            <Text>💾 Cache: {performanceStatus.settings.cacheTTL / 1000}s</Text>
            <Text>🖼️ Quality: {performanceStatus.settings.imageQuality}</Text>
            <Text>⚡ Real-time: {performanceStatus.settings.realtimeEnabled ? 'Yes' : 'No'}</Text>
            <Text>📦 Batch: {performanceStatus.settings.batchSize} items</Text>
            <Text>🔄 Retries: {performanceStatus.settings.retryAttempts}</Text>
          </View>
        )}
      </View>

      {/* Test Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={testDatabaseOperation}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? '🔄 Testing...' : '🗄️ Test Database'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={testImageOptimization}>
          <Text style={styles.buttonText}>🖼️ Test Images</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={testRealTimeFeatures}>
          <Text style={styles.buttonText}>⚡ Test Real-time</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={clearCache}>
          <Text style={styles.buttonText}>💾 Clear Cache</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={checkInternetSpeed}>
          <Text style={styles.buttonText}>🌐 Check Speed</Text>
        </TouchableOpacity>
      </View>

      {/* User Data Display */}
      {userData && (
        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>📊 Retrieved Data</Text>
          <Text>Users: {userData.length}</Text>
          <Text>Speed: {currentSpeed}</Text>
          <Text>Cache Size: {performanceStatus?.cacheSize || 0}</Text>
        </View>
      )}

      {/* Benefits Info */}
      <View style={styles.benefitsCard}>
        <Text style={styles.benefitsTitle}>🌟 Key Benefits</Text>
        <Text>🌍 Works in rural Somalia (2G/3G)</Text>
        <Text>🏙️ Optimized for urban areas (5G)</Text>
        <Text>🔄 Automatically adapts to conditions</Text>
        <Text>📱 No manual configuration needed</Text>
        <Text>💰 Works on all data plans</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          The app automatically detects your internet speed and optimizes performance accordingly.
          Perfect for both rural and urban users in Somalia! 🇸🇴
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  speedCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  speedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  speedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  speedEmoji: {
    fontSize: 32,
    marginRight: 10,
  },
  speedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  settingsInfo: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dataCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  benefitsCard: {
    backgroundColor: '#e8f5e8',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  footer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AdaptiveExample;
