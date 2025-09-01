import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabase';

const AuthPhoneOtpScreen = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phase, setPhase] = useState<'request' | 'verify'>('request');
  const [loading, setLoading] = useState(false);

  const requestOtp = async () => {
    if (!phone) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    setLoading(false);
    if (error) Alert.alert('Error', error.message);
    else setPhase('verify');
  };

  const verifyOtp = async () => {
    if (!phone || !otp) return;
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
    setLoading(false);
    if (error) Alert.alert('Error', error.message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
        <Text style={styles.title}>Phone OTP</Text>
      </LinearGradient>
      <View style={styles.content}>
        {phase === 'request' ? (
          <>
            <Text style={styles.label}>Phone (E.164)</Text>
            <TextInput value={phone} onChangeText={setPhone} placeholder="+14155551234" style={styles.input} placeholderTextColor="#9CA3AF" keyboardType="phone-pad" />
            <TouchableOpacity style={[styles.btn, loading && { opacity: 0.5 }]} onPress={requestOtp} disabled={loading}>
              <Ionicons name="call" size={18} color="white" />
              <Text style={styles.btnText}>Send OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Enter Code</Text>
            <TextInput value={otp} onChangeText={setOtp} placeholder="6-digit code" style={styles.input} placeholderTextColor="#9CA3AF" keyboardType="number-pad" />
            <TouchableOpacity style={[styles.btn, loading && { opacity: 0.5 }]} onPress={verifyOtp} disabled={loading}>
              <Ionicons name="checkmark-circle" size={18} color="white" />
              <Text style={styles.btnText}>Verify</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { padding: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20, gap: 12 },
  label: { color: '#374151', fontWeight: '700' },
  input: { backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: '#111827' },
  btn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#7C3AED', padding: 14, borderRadius: 12, marginTop: 8, justifyContent: 'center' },
  btnText: { color: 'white', fontWeight: '700' },
});

export default AuthPhoneOtpScreen;


