import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConsultantStackParamList } from '../navigation/types';

type BookingScreenNavigationProp = NativeStackNavigationProp<ConsultantStackParamList, 'Booking'>;
type BookingScreenRouteProp = RouteProp<ConsultantStackParamList, 'Booking'>;

const BookingScreen = () => {
  const navigation = useNavigation<BookingScreenNavigationProp>();
  const route = useRoute<BookingScreenRouteProp>();
  const { consultantId } = route.params;
  const [mode, setMode] = useState<'chat' | 'audio' | 'video'>('chat');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'cash'>('card');

  const next7Days = useMemo(() => {
    const days: { key: string; label: string }[] = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      days.push({ key, label });
    }
    return days;
  }, []);

  const slots = useMemo(() => ['09:00', '10:30', '13:00', '15:00', '17:30'], []);

  const handleConfirm = () => {
    const bookingId = Math.random().toString(36).slice(2, 8).toUpperCase();
    navigation.navigate('BookingConfirmation', {
      bookingId,
      consultantId,
      mode,
      date: selectedDate,
      slot: selectedSlot,
      amount: 150,
      paymentMethod,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Select Mode</Text>
          <View style={styles.modeRow}>
            <TouchableOpacity style={[styles.modeChip, mode === 'chat' && styles.modeChipActive]} onPress={() => setMode('chat')}>
              <Ionicons name="chatbubble" size={18} color={mode === 'chat' ? 'white' : '#6B7280'} />
              <Text style={[styles.modeText, mode === 'chat' && styles.modeTextActive]}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modeChip, mode === 'audio' && styles.modeChipActive]} onPress={() => setMode('audio')}>
              <Ionicons name="mic" size={18} color={mode === 'audio' ? 'white' : '#6B7280'} />
              <Text style={[styles.modeText, mode === 'audio' && styles.modeTextActive]}>Audio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modeChip, mode === 'video' && styles.modeChipActive]} onPress={() => setMode('video')}>
              <Ionicons name="videocam" size={18} color={mode === 'video' ? 'white' : '#6B7280'} />
              <Text style={[styles.modeText, mode === 'video' && styles.modeTextActive]}>Video</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.datesRow}>
              {next7Days.map((d) => (
                <TouchableOpacity key={d.key} style={[styles.dateChip, selectedDate === d.key && styles.dateChipActive]} onPress={() => setSelectedDate(d.key)}>
                  <Text style={[styles.dateText, selectedDate === d.key && styles.dateTextActive]}>{d.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.slotsRow}>
            {slots.map((s) => (
              <TouchableOpacity key={s} style={[styles.slotChip, selectedSlot === s && styles.slotChipActive]} onPress={() => setSelectedSlot(s)}>
                <Text style={[styles.slotText, selectedSlot === s && styles.slotTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentRow}>
            <TouchableOpacity style={[styles.payChip, paymentMethod === 'card' && styles.payChipActive]} onPress={() => setPaymentMethod('card')}>
              <Ionicons name="card" size={18} color={paymentMethod === 'card' ? 'white' : '#6B7280'} />
              <Text style={[styles.payText, paymentMethod === 'card' && styles.payTextActive]}>Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.payChip, paymentMethod === 'wallet' && styles.payChipActive]} onPress={() => setPaymentMethod('wallet')}>
              <Ionicons name="wallet" size={18} color={paymentMethod === 'wallet' ? 'white' : '#6B7280'} />
              <Text style={[styles.payText, paymentMethod === 'wallet' && styles.payTextActive]}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.payChip, paymentMethod === 'cash' && styles.payChipActive]} onPress={() => setPaymentMethod('cash')}>
              <Ionicons name="cash" size={18} color={paymentMethod === 'cash' ? 'white' : '#6B7280'} />
              <Text style={[styles.payText, paymentMethod === 'cash' && styles.payTextActive]}>Cash</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.confirmButton, !(selectedDate && selectedSlot) && { opacity: 0.5 }]}
          disabled={!(selectedDate && selectedSlot)}
          onPress={handleConfirm}
        >
          <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.confirmGradient}>
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text style={styles.confirmText}>Confirm Booking</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
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
  placeholder: { width: 48 },
  content: { flex: 1, padding: 20 },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  modeRow: { flexDirection: 'row', gap: 12 },
  modeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  modeChipActive: { backgroundColor: '#7C3AED' },
  modeText: { color: '#6B7280', fontWeight: '600' },
  modeTextActive: { color: 'white' },
  datesRow: { flexDirection: 'row', gap: 12 },
  dateChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  dateChipActive: { backgroundColor: '#7C3AED' },
  dateText: { color: '#374151', fontWeight: '600' },
  dateTextActive: { color: 'white' },
  slotsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  slotChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  slotChipActive: { backgroundColor: '#7C3AED' },
  slotText: { color: '#374151', fontWeight: '600' },
  slotTextActive: { color: 'white' },
  paymentRow: { flexDirection: 'row', gap: 12 },
  payChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  payChipActive: { backgroundColor: '#7C3AED' },
  payText: { color: '#6B7280', fontWeight: '600' },
  payTextActive: { color: 'white' },
  confirmButton: { borderRadius: 16, overflow: 'hidden', marginTop: 8 },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  confirmText: { color: 'white', fontSize: 16, fontWeight: '700' },
});

export default BookingScreen;
