import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useI18n } from '../i18n';
import { useNavigation } from '@react-navigation/native';
import { addCycleNote } from '../services/cycleNotes';

const LogPeriodScreen = () => {
  const navigation = useNavigation();
  const { t } = useI18n();
  const [flowIntensity, setFlowIntensity] = useState('medium');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleSavePeriod = async () => {
    try {
      // Mock user ID - in real app this would come from auth context
      const mockUserId = 'user123';
      const todayISO = new Date().toISOString().split('T')[0];
      
      // Save period note to centralized cycle notes system
      if (notes.trim()) {
        await addCycleNote(mockUserId, null, todayISO, 'tracker', notes.trim());
        Alert.alert('Success', 'Period and notes logged successfully!');
      } else {
        Alert.alert('Success', 'Period logged successfully!');
      }
      
      navigation.goBack();
    } catch (error) {
      console.error('Error saving period:', error);
      Alert.alert('Error', 'Failed to save period data');
    }
  };

  const toggleSymptom = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const flowOptions = [
    { key: 'light', label: t('light'), color: '#FEE2E2' },
    { key: 'medium', label: t('medium'), color: '#FCA5A5' },
    { key: 'heavy', label: t('heavy'), color: '#EF4444' },
  ];

  const symptomOptions = [
    'Cramps', 'Bloating', 'Fatigue', 'Mood swings',
    'Headache', 'Back pain', 'Breast tenderness', 'Acne'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#A855F7']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('logPeriod')}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePeriod}>
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.flowCard}>
          <Text style={styles.sectionTitle}>{t('flowIntensity')}</Text>
          <View style={styles.flowOptions}>
            {flowOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.flowOption,
                  { backgroundColor: option.color },
                  flowIntensity === option.key && styles.flowOptionSelected
                ]}
                onPress={() => setFlowIntensity(option.key)}
              >
                <Text style={[
                  styles.flowOptionText,
                  flowIntensity === option.key && styles.flowOptionTextSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.symptomsCard}>
          <Text style={styles.sectionTitle}>{t('symptoms')}</Text>
          <View style={styles.symptomsGrid}>
            {symptomOptions.map((symptom) => (
              <TouchableOpacity
                key={symptom}
                style={[
                  styles.symptomButton,
                  symptoms.includes(symptom) && styles.symptomButtonSelected
                ]}
                onPress={() => toggleSymptom(symptom)}
              >
                <Text style={[
                  styles.symptomButtonText,
                  symptoms.includes(symptom) && styles.symptomButtonTextSelected
                ]}>
                  {symptom}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.notesCard}>
          <Text style={styles.sectionTitle}>{t('additionalNotes')}</Text>
          <Text style={styles.notesDescription}>
            These notes will be saved to your Cycle Notes and can be viewed later
          </Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Any additional notes or observations..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
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
  saveButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  flowCard: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  flowOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flowOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  flowOptionSelected: {
    borderWidth: 2,
    borderColor: '#7C3AED',
  },
  flowOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  flowOptionTextSelected: {
    color: '#7C3AED',
  },
  symptomsCard: {
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
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  symptomButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  symptomButtonSelected: {
    backgroundColor: '#7C3AED',
  },
  symptomButtonText: {
    color: '#374151',
    fontSize: 14,
  },
  symptomButtonTextSelected: {
    color: 'white',
  },
  notesCard: {
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
  notesInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  notesDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default LogPeriodScreen;
