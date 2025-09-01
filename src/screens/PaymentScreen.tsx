import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConsultantStackParamList } from '../navigation/types';
import { useI18n } from '../i18n';
import { supabase } from '../services/supabase';

type PaymentScreenNavigationProp = NativeStackNavigationProp<ConsultantStackParamList, 'Payment'>;
type PaymentScreenRouteProp = RouteProp<ConsultantStackParamList, 'Payment'>;

const PaymentScreen = () => {
  const navigation = useNavigation<PaymentScreenNavigationProp>();
  const route = useRoute<PaymentScreenRouteProp>();
  const { consultationId } = route.params;
  const [method, setMethod] = useState<'stripe' | 'mobile_money'>('stripe');
  const [processing, setProcessing] = useState(false);
  const { t } = useI18n();

  const confirmPayment = async () => {
    setProcessing(true);
    await supabase.from('booking_requests').update({ payment_method: method === 'stripe' ? 'card' : 'wallet', payment_ref: 'TEST-OK', status: 'confirmed' }).eq('id', consultationId);
    setProcessing(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.paymentCard}>
          <Text style={styles.paymentTitle}>Payment for Session {consultationId}</Text>
          <Text style={styles.paymentContent}>{t('chooseMethod')}</Text>
          <View style={styles.methodsRow}>
            <TouchableOpacity style={[styles.methodChip, method === 'stripe' && styles.methodChipActive]} onPress={() => setMethod('stripe')}>
              <Text style={[styles.methodText, method === 'stripe' && styles.methodTextActive]}>Stripe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.methodChip, method === 'mobile_money' && styles.methodChipActive]} onPress={() => setMethod('mobile_money')}>
              <Text style={[styles.methodText, method === 'mobile_money' && styles.methodTextActive]}>Mobile Money</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.payBtn, processing && { opacity: 0.5 }]} disabled={processing} onPress={confirmPayment}>
            <Text style={styles.payText}>{processing ? 'Processing…' : t('confirmPayment')}</Text>
          </TouchableOpacity>
        </View>
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
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  paymentContent: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  methodsRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  methodChip: { backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12 },
  methodChipActive: { backgroundColor: '#7C3AED' },
  methodText: { color: '#374151', fontWeight: '700' },
  methodTextActive: { color: 'white' },
  payBtn: { backgroundColor: '#7C3AED', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  payText: { color: 'white', fontWeight: '700' },
});

export default PaymentScreen;
