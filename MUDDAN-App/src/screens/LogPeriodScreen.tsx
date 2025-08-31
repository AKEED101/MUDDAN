import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CycleData } from '../types';

const LogPeriodScreen = () => {
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    duration: '',
    flow: 'medium',
    symptoms: [] as string[],
    painLevel: 3,
    medications: [] as string[],
    comments: '',
  });

  const availableSymptoms = [
    'cramps', 'tired', 'bloating', 'headache', 'back pain',
    'breast tenderness', 'mood swings', 'acne', 'food cravings',
    'insomnia', 'nausea', 'dizziness'
  ];

  const availableMedications = [
    'ibuprofen', 'acetaminophen', 'naproxen', 'heating pad',
    'ice pack', 'vitamins', 'herbal tea', 'none'
  ];

  const handleSymptomToggle = (symptom: string) => {
    if (formData.symptoms.includes(symptom)) {
      setFormData({
        ...formData,
        symptoms: formData.symptoms.filter(s => s !== symptom)
      });
    } else {
      setFormData({
        ...formData,
        symptoms: [...formData.symptoms, symptom]
      });
    }
  };

  const handleMedicationToggle = (medication: string) => {
    if (formData.medications.includes(medication)) {
      setFormData({
        ...formData,
        medications: formData.medications.filter(m => m !== medication)
      });
    } else {
      setFormData({
        ...formData,
        medications: [...formData.medications, medication]
      });
    }
  };

  const handleSave = () => {
    if (!formData.startDate) {
      Alert.alert('Error', 'Please select a start date');
      return;
    }

    if (!formData.duration || parseInt(formData.duration) <= 0) {
      Alert.alert('Error', 'Please enter a valid duration');
      return;
    }

    // Here you would typically save to your database
    const newCycleData: CycleData = {
      id: Date.now().toString(),
      startDate: new Date(formData.startDate),
      duration: parseInt(formData.duration),
      flow: formData.flow as 'light' | 'medium' | 'heavy',
      symptoms: formData.symptoms,
      painLevel: formData.painLevel,
      medications: formData.medications.filter(m => m !== 'none'),
      notes: formData.comments,
      tags: [...formData.symptoms, formData.flow, `pain-${formData.painLevel}`],
    };

    console.log('New cycle data:', newCycleData);
    
    Alert.alert(
      'Success',
      'Period logged successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const renderDateInput = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Start Date</Text>
      <View style={styles.dateInput}>
        <Ionicons name="calendar" size={20} color="#7C3AED" />
        <Text style={styles.dateText}>{formData.startDate}</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateButtonText}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDurationInput = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Duration (days)</Text>
      <TextInput
        style={styles.textInput}
        value={formData.duration}
        onChangeText={(text) => setFormData({ ...formData, duration: text })}
        placeholder="Enter number of days"
        keyboardType="numeric"
        maxLength={2}
      />
    </View>
  );

  const renderFlowSelection = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Flow Intensity</Text>
      <View style={styles.flowOptions}>
        {[
          { value: 'light', label: 'Light', color: '#10B981' },
          { value: 'medium', label: 'Medium', color: '#F59E0B' },
          { value: 'heavy', label: 'Heavy', color: '#EF4444' }
        ].map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.flowOption,
              formData.flow === option.value && styles.selectedFlowOption,
              { borderColor: option.color }
            ]}
            onPress={() => setFormData({ ...formData, flow: option.value as 'light' | 'medium' | 'heavy' })}
          >
            <View style={[styles.flowIndicator, { backgroundColor: option.color }]} />
            <Text style={[
              styles.flowOptionText,
              formData.flow === option.value && styles.selectedFlowOptionText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderPainLevel = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Pain Level (1-5)</Text>
      <View style={styles.painLevelContainer}>
        {[1, 2, 3, 4, 5].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.painLevelButton,
              formData.painLevel === level && styles.selectedPainLevel
            ]}
            onPress={() => setFormData({ ...formData, painLevel: level })}
          >
            <Text style={[
              styles.painLevelText,
              formData.painLevel === level && styles.selectedPainLevelText
            ]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.painLevelDescription}>
        {formData.painLevel === 1 && 'No pain'}
        {formData.painLevel === 2 && 'Mild discomfort'}
        {formData.painLevel === 3 && 'Moderate pain'}
        {formData.painLevel === 4 && 'Significant pain'}
        {formData.painLevel === 5 && 'Severe pain'}
      </Text>
    </View>
  );

  const renderSymptoms = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Symptoms (select all that apply)</Text>
      <View style={styles.symptomsGrid}>
        {availableSymptoms.map((symptom) => (
          <TouchableOpacity
            key={symptom}
            style={[
              styles.symptomChip,
              formData.symptoms.includes(symptom) && styles.selectedSymptomChip
            ]}
            onPress={() => handleSymptomToggle(symptom)}
          >
            <Text style={[
              styles.symptomChipText,
              formData.symptoms.includes(symptom) && styles.selectedSymptomChipText
            ]}>
              {symptom}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderMedications = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Medications & Treatments</Text>
      <View style={styles.medicationsGrid}>
        {availableMedications.map((medication) => (
          <TouchableOpacity
            key={medication}
            style={[
              styles.medicationChip,
              formData.medications.includes(medication) && styles.selectedMedicationChip
            ]}
            onPress={() => handleMedicationToggle(medication)}
          >
            <Text style={[
              styles.medicationChipText,
              formData.medications.includes(medication) && styles.selectedMedicationChipText
            ]}>
              {medication}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderComments = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Additional Comments</Text>
      <TextInput
        style={styles.commentsInput}
        value={formData.comments}
        onChangeText={(text) => setFormData({ ...formData, comments: text })}
        placeholder="Any additional notes or observations..."
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#7C3AED" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log Period</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.formDescription}>
            Track your period details to better understand your cycle patterns
          </Text>

          {renderDateInput()}
          {renderDurationInput()}
          {renderFlowSelection()}
          {renderPainLevel()}
          {renderSymptoms()}
          {renderMedications()}
          {renderComments()}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save Period Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  formDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  dateButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
    color: '#1F2937',
  },
  flowOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  flowOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
  },
  selectedFlowOption: {
    borderColor: '#7C3AED',
    backgroundColor: '#F3F4F6',
  },
  flowIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  flowOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedFlowOptionText: {
    color: '#7C3AED',
  },
  painLevelContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  painLevelButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
  },
  selectedPainLevel: {
    borderColor: '#7C3AED',
    backgroundColor: '#7C3AED',
  },
  painLevelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  selectedPainLevelText: {
    color: 'white',
  },
  painLevelDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
  },
  selectedSymptomChip: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  symptomChipText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedSymptomChipText: {
    color: 'white',
  },
  medicationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  medicationChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
  },
  selectedMedicationChip: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  medicationChipText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedMedicationChipText: {
    color: 'white',
  },
  commentsInput: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
    color: '#1F2937',
    minHeight: 100,
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LogPeriodScreen;
