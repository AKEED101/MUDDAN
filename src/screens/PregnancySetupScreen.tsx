import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenWithNavBar from '../components/ScreenWithNavBar';

interface PregnancySetupScreenProps {
  navigation: any;
}

const PregnancySetupScreen: React.FC<PregnancySetupScreenProps> = ({ navigation }) => {
  const [inputType, setInputType] = useState<'lmp' | 'dueDate'>('lmp');
  const [lmpDate, setLmpDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  const calculateCurrentWeek = () => {
    let targetDate: Date;
    
    if (inputType === 'lmp' && lmpDate) {
      targetDate = new Date(lmpDate);
      const today = new Date();
      const diffTime = today.getTime() - targetDate.getTime();
      const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
      setCurrentWeek(diffWeeks);
    } else if (inputType === 'dueDate' && dueDate) {
      targetDate = new Date(dueDate);
      const today = new Date();
      const diffTime = targetDate.getTime() - today.getTime();
      const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
      setCurrentWeek(40 - diffWeeks);
    }
  };

  const handleSave = () => {
    if (currentWeek && currentWeek > 0 && currentWeek <= 40) {
      // Save pregnancy data
      Alert.alert('Success', 'Pregnancy tracking has been set up successfully!');
      navigation.navigate('PregnancyWeekOverview', { currentWeek });
    } else {
      Alert.alert('Error', 'Please enter a valid date to calculate the current week.');
    }
  };

  const getTrimester = (week: number) => {
    if (week <= 12) return 1;
    if (week <= 26) return 2;
    return 3;
  };

  return (
    <ScreenWithNavBar>
      <ScrollView style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={['#7C3AED', '#0EA5E9']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.headerTitle}>Pregnancy Setup</Text>
          <Text style={styles.headerSubtitle}>Let's track your pregnancy journey</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Input Type Toggle */}
          <View style={styles.inputTypeCard}>
            <Text style={styles.sectionTitle}>How would you like to start?</Text>
            
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  inputType === 'lmp' && styles.toggleButtonActive
                ]}
                onPress={() => setInputType('lmp')}
              >
                <Text style={[
                  styles.toggleButtonText,
                  inputType === 'lmp' && styles.toggleButtonTextActive
                ]}>
                  LMP (Last Menstrual Period)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  inputType === 'dueDate' && styles.toggleButtonActive
                ]}
                onPress={() => setInputType('dueDate')}
              >
                <Text style={[
                  styles.toggleButtonText,
                  inputType === 'dueDate' && styles.toggleButtonTextActive
                ]}>
                  Due Date
                </Text>
              </TouchableOpacity>
            </View>

            {/* Date Input */}
            {inputType === 'lmp' ? (
              <View>
                <Text style={styles.inputLabel}>First day of your last period</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="MM/DD/YYYY"
                  value={lmpDate}
                  onChangeText={setLmpDate}
                />
              </View>
            ) : (
              <View>
                <Text style={styles.inputLabel}>Expected due date</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="MM/DD/YYYY"
                  value={dueDate}
                  onChangeText={setDueDate}
                />
              </View>
            )}

            <TouchableOpacity
              style={styles.calculateButton}
              onPress={calculateCurrentWeek}
            >
              <Text style={styles.calculateButtonText}>Calculate Current Week</Text>
            </TouchableOpacity>
          </View>

          {/* Current Week Display */}
          {currentWeek && (
            <View style={styles.weekDisplayCard}>
              <Text style={styles.weekNumber}>
                Week {currentWeek}
              </Text>
              <Text style={styles.trimesterText}>
                Trimester {getTrimester(currentWeek)}
              </Text>
              <Text style={styles.weekDescription}>
                You're {currentWeek} weeks into your pregnancy journey!
              </Text>
            </View>
          )}

          {/* Reminders Section */}
          <View style={styles.remindersCard}>
            <View style={styles.remindersHeader}>
              <View style={styles.remindersInfo}>
                <Text style={styles.remindersTitle}>Enable Reminders</Text>
                <Text style={styles.remindersSubtitle}>Get notified about important pregnancy milestones</Text>
              </View>
              <Switch
                value={remindersEnabled}
                onValueChange={setRemindersEnabled}
                trackColor={{ false: '#E5E7EB', true: '#7C3AED' }}
                thumbColor={remindersEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              currentWeek ? styles.saveButtonActive : styles.saveButtonDisabled
            ]}
            onPress={handleSave}
            disabled={!currentWeek}
          >
            <Text style={[
              styles.saveButtonText,
              currentWeek ? styles.saveButtonTextActive : styles.saveButtonTextDisabled
            ]}>
              Start Tracking
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWithNavBar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 20,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  inputTypeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 8,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  toggleButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color: '#6B7280',
  },
  toggleButtonTextActive: {
    color: '#7C3AED',
  },
  inputLabel: {
    color: '#374151',
    marginBottom: 12,
    fontWeight: '600',
    fontSize: 18,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    color: '#111827',
    fontSize: 18,
  },
  calculateButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  calculateButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  weekDisplayCard: {
    backgroundColor: '#F3E8FF',
    borderRadius: 16,
    padding: 32,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  weekNumber: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 12,
  },
  trimesterText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#7C3AED',
    marginBottom: 12,
  },
  weekDescription: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 18,
    marginTop: 12,
  },
  remindersCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  remindersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  remindersInfo: {
    flex: 1,
  },
  remindersTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  remindersSubtitle: {
    color: '#6B7280',
    fontSize: 18,
  },
  saveButton: {
    paddingVertical: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonActive: {
    backgroundColor: '#7C3AED',
  },
  saveButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  saveButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  saveButtonTextActive: {
    color: 'white',
  },
  saveButtonTextDisabled: {
    color: '#6B7280',
  },
});

export default PregnancySetupScreen;
