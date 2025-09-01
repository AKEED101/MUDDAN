import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConsultantStackParamList } from '../navigation/types';

type PrescriptionScreenNavigationProp = NativeStackNavigationProp<ConsultantStackParamList, 'Prescription'>;
type PrescriptionScreenRouteProp = RouteProp<ConsultantStackParamList, 'Prescription'>;

const PrescriptionScreen = () => {
  const navigation = useNavigation<PrescriptionScreenNavigationProp>();
  const route = useRoute<PrescriptionScreenRouteProp>();
  const { consultationId } = route.params;

  const handleOpenPdf = async () => {
    try {
      const uri = FileSystem.documentDirectory + `prescription-${consultationId}.pdf`;
      // Placeholder: ensure a file exists (in real app, download actual PDF)
      await FileSystem.writeAsStringAsync(uri, 'PDF_CONTENT_PLACEHOLDER');
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      }
    } catch (e) {
      // noop
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prescription</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.prescriptionCard}>
          <Text style={styles.prescriptionTitle}>Prescription • Session {consultationId}</Text>
          <Text style={styles.prescriptionContent}>Tap below to preview/download the prescription PDF.</Text>
          <TouchableOpacity style={styles.openBtn} onPress={handleOpenPdf}>
            <Ionicons name="document" size={18} color="white" />
            <Text style={styles.openText}>Open PDF</Text>
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
  prescriptionCard: {
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
  prescriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  prescriptionContent: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  openBtn: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#7C3AED',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  openText: { color: 'white', fontWeight: '700' },
});

export default PrescriptionScreen;
