import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConsultantStackParamList } from '../navigation/types';
import { supabase } from '../services/supabase';

type Nav = NativeStackNavigationProp<ConsultantStackParamList, 'BookingConfirmation'>;
type Rt = RouteProp<ConsultantStackParamList, 'BookingConfirmation'>;

const BookingConfirmationScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { bookingId, consultantId, mode, date, slot, amount, paymentMethod } = route.params;

  const persistBooking = async () => {
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id || null;
      await supabase.from('booking_requests').insert({
        id: bookingId,
        user_id: userId,
        consultant_code: consultantId,
        consultation_type: mode,
        date_iso: date,
        slot,
        amount,
        payment_method: paymentMethod,
        status: 'pending',
      });
    } catch {}
  };

  persistBooking();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
        <Ionicons name="checkmark-circle" size={28} color="white" />
        <Text style={styles.headerTitle}>Booking Confirmed</Text>
        <View style={{ width: 28 }} />
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.bookingId}>ID: {bookingId}</Text>
        <Text style={styles.line}>Consultant: {consultantId}</Text>
        <Text style={styles.line}>Mode: {mode.toUpperCase()}</Text>
        <Text style={styles.line}>Date: {date}</Text>
        <Text style={styles.line}>Time: {slot}</Text>
        <Text style={styles.line}>Amount: ${amount}</Text>
        <Text style={styles.line}>Payment: {paymentMethod}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Chat', { consultationId: bookingId })}>
          <Ionicons name="chatbubble" size={18} color="#7C3AED" />
          <Text style={styles.actionText}>Go to Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('AudioCall', { consultationId: bookingId })}>
          <Ionicons name="mic" size={18} color="#7C3AED" />
          <Text style={styles.actionText}>Start Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('VideoCall', { consultationId: bookingId })}>
          <Ionicons name="videocam" size={18} color="#7C3AED" />
          <Text style={styles.actionText}>Start Video</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  card: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  bookingId: { fontSize: 16, color: '#6B7280', marginBottom: 8 },
  line: { fontSize: 16, color: '#111827', marginBottom: 6, fontWeight: '600' },
  actions: { paddingHorizontal: 20, gap: 12 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  actionText: { color: '#7C3AED', fontWeight: '700' },
});

export default BookingConfirmationScreen;


