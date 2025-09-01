import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConsultantStackParamList } from '../navigation/types';
import { supabase } from '../services/supabase';

type MyConsultationsScreenNavigationProp = NativeStackNavigationProp<ConsultantStackParamList, 'MyConsultations'>;

const MyConsultationsScreen = () => {
  const navigation = useNavigation<MyConsultationsScreenNavigationProp>();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) { setItems([]); setLoading(false); return; }
      const { data } = await supabase
        .from('booking_requests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      setItems(data || []);
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Consultations</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.consultationsCard}>
          <Text style={styles.consultationsTitle}>My Consultations</Text>
          {loading ? (
            <Text style={styles.consultationsContent}>Loading…</Text>
          ) : items.length === 0 ? (
            <Text style={styles.consultationsContent}>No consultations yet.</Text>
          ) : (
            items.map((bk) => (
              <View key={bk.id} style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{(bk.consultation_type || '').toUpperCase()} • {bk.date_iso} {bk.slot}</Text>
                  <Text style={styles.itemSub}>Consultant: {bk.consultant_code} • ${bk.amount} • {bk.payment_method}</Text>
                </View>
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Chat', { consultationId: bk.id })}>
                    <Ionicons name="chatbubble" size={16} color="#7C3AED" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('AudioCall', { consultationId: bk.id })}>
                    <Ionicons name="mic" size={16} color="#7C3AED" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('VideoCall', { consultationId: bk.id })}>
                    <Ionicons name="videocam" size={16} color="#7C3AED" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
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
  consultationsCard: {
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
  consultationsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  consultationsContent: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemTitle: { color: '#111827', fontWeight: '700' },
  itemSub: { color: '#6B7280', marginTop: 2 },
  actionsRow: { flexDirection: 'row', gap: 8 },
  actionBtn: { backgroundColor: '#F3E8FF', padding: 8, borderRadius: 8 },
});

export default MyConsultationsScreen;
