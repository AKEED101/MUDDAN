import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWithNavBar from '../components/ScreenWithNavBar';

interface PregnancyNotesRemindersScreenProps {
  navigation: any;
}

interface Note {
  id: string;
  text: string;
  date: Date;
  week: number;
}

interface Reminder {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly';
  time: string;
  enabled: boolean;
}

const PregnancyNotesRemindersScreen: React.FC<PregnancyNotesRemindersScreenProps> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      text: 'First ultrasound appointment scheduled for next week',
      date: new Date(),
      week: 8,
    },
    {
      id: '2',
      text: 'Started taking prenatal vitamins daily',
      date: new Date(Date.now() - 86400000),
      week: 7,
    },
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Take prenatal vitamins',
      frequency: 'daily',
      time: '09:00',
      enabled: true,
    },
    {
      id: '2',
      title: 'Drink water',
      frequency: 'daily',
      time: '12:00',
      enabled: true,
    },
    {
      id: '3',
      title: 'Prenatal appointment reminder',
      frequency: 'weekly',
      time: '10:00',
      enabled: false,
    },
  ]);

  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    frequency: 'daily' as 'daily' | 'weekly',
    time: '09:00',
  });

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        text: newNote.trim(),
        date: new Date(),
        week: 8, // This should come from pregnancy context
      };
      setNotes([note, ...notes]);
      setNewNote('');
      setShowAddNote(false);
    }
  };

  const addReminder = () => {
    if (newReminder.title.trim()) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        title: newReminder.title.trim(),
        frequency: newReminder.frequency,
        time: newReminder.time,
        enabled: true,
      };
      setReminders([reminder, ...reminders]);
      setNewReminder({ title: '', frequency: 'daily', time: '09:00' });
      setShowAddReminder(false);
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  const deleteNote = (id: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setNotes(notes.filter(note => note.id !== id)) }
      ]
    );
  };

  const deleteReminder = (id: string) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setReminders(reminders.filter(reminder => reminder.id !== id)) }
      ]
    );
  };

  const renderNote = ({ item }: { item: Note }) => (
    <View style={styles.noteCard}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteWeek}>
          Week {item.week}
        </Text>
        <Text style={styles.noteDate}>
          {item.date.toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.noteText}>
        {item.text}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNote(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  const renderReminder = ({ item }: { item: Reminder }) => (
    <View style={styles.reminderCard}>
      <View style={styles.reminderHeader}>
        <View style={styles.reminderInfo}>
          <Text style={styles.reminderTitle}>
            {item.title}
          </Text>
          <Text style={styles.reminderDetails}>
            {item.frequency} at {item.time}
          </Text>
        </View>
        <Switch
          value={item.enabled}
          onValueChange={() => toggleReminder(item.id)}
          trackColor={{ false: '#E5E7EB', true: '#10B981' }}
          thumbColor={item.enabled ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteReminder(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWithNavBar showBackButton title="Notes & Reminders">
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notes & Reminders</Text>
          <Text style={styles.headerSubtitle}>Track your pregnancy journey</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Notes Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddNote(true)}
              >
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.addButtonText}>Add Note</Text>
              </TouchableOpacity>
            </View>

            {notes.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="document-text-outline" size={64} color="#9CA3AF" />
                <Text style={styles.emptyStateText}>No notes yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Start documenting your pregnancy journey with notes and observations
                </Text>
              </View>
            ) : (
              <FlatList
                data={notes}
                renderItem={renderNote}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            )}
          </View>

          {/* Reminders Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reminders</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddReminder(true)}
              >
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.addButtonText}>Add Reminder</Text>
              </TouchableOpacity>
            </View>

            {reminders.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="alarm-outline" size={64} color="#9CA3AF" />
                <Text style={styles.emptyStateText}>No reminders yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Set reminders for important pregnancy tasks and appointments
                </Text>
              </View>
            ) : (
              <FlatList
                data={reminders}
                renderItem={renderReminder}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add Note Modal */}
      <Modal
        visible={showAddNote}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddNote(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Note</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Write your note here..."
              value={newNote}
              onChangeText={setNewNote}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddNote(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={addNote}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Reminder Modal */}
      <Modal
        visible={showAddReminder}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddReminder(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Reminder</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Reminder title..."
              value={newReminder.title}
              onChangeText={(text) => setNewReminder({ ...newReminder, title: text })}
            />
            <View style={styles.frequencyButtons}>
              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  newReminder.frequency === 'daily' && styles.frequencyButtonActive
                ]}
                onPress={() => setNewReminder({ ...newReminder, frequency: 'daily' })}
              >
                <Text style={[
                  styles.frequencyButtonText,
                  newReminder.frequency === 'daily' && styles.frequencyButtonTextActive
                ]}>
                  Daily
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  newReminder.frequency === 'weekly' && styles.frequencyButtonActive
                ]}
                onPress={() => setNewReminder({ ...newReminder, frequency: 'weekly' })}
              >
                <Text style={[
                  styles.frequencyButtonText,
                  newReminder.frequency === 'weekly' && styles.frequencyButtonTextActive
                ]}>
                  Weekly
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Time (e.g., 09:00)"
              value={newReminder.time}
              onChangeText={(text) => setNewReminder({ ...newReminder, time: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddReminder(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={addReminder}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 32,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyStateText: {
    color: '#6B7280',
    fontSize: 20,
    marginTop: 12,
    fontWeight: '600',
  },
  emptyStateSubtext: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 18,
  },
  noteCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  noteWeek: {
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '600',
  },
  noteDate: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  noteText: {
    color: '#111827',
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 16,
  },
  reminderCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  reminderDetails: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  deleteButton: {
    alignSelf: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#111827',
    marginBottom: 16,
    fontSize: 16,
  },
  frequencyButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  frequencyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  frequencyButtonActive: {
    borderColor: '#7C3AED',
    backgroundColor: '#7C3AED',
  },
  frequencyButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#6B7280',
  },
  frequencyButtonTextActive: {
    color: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#D1D5DB',
    paddingVertical: 12,
    borderRadius: 12,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#374151',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 12,
  },
  saveButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
  },
});

export default PregnancyNotesRemindersScreen;
