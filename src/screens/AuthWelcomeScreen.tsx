import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AuthWelcomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </LinearGradient>
      <View style={styles.content}>
        <TouchableOpacity style={styles.action} onPress={() => navigation.navigate('AuthEmailOtp')}>
          <Ionicons name="mail" size={18} color="#7C3AED" />
          <Text style={styles.actionText}>Continue with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => navigation.navigate('AuthPhoneOtp')}>
          <Ionicons name="call" size={18} color="#7C3AED" />
          <Text style={styles.actionText}>Continue with Phone</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { padding: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: 'white', opacity: 0.9, marginTop: 4 },
  content: { padding: 20, gap: 12 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'white', padding: 16, borderRadius: 12 },
  actionText: { color: '#7C3AED', fontWeight: '700' },
});

export default AuthWelcomeScreen;


