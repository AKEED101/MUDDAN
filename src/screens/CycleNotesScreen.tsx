import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from '../i18n';

const CycleNotesScreen = () => {
  const navigation = useNavigation();
  const { t } = useI18n();
  const [note, setNote] = useState('');

  // Mock data for demonstration - in real app this would come from storage
  const [allNotes, setAllNotes] = useState([
    {
      id: '1',
      type: 'period',
      date: '2024-01-15',
      content: 'Heavy flow today, experiencing cramps. Taking pain medication.',
      source: 'Period Tracker'
    },
    {
      id: '2',
      type: 'general',
      date: '2024-01-14',
      content: 'Feeling tired and moody. Noticed some bloating.',
      source: 'Cycle Notes'
    },
    {
      id: '3',
      type: 'period',
      date: '2024-01-13',
      content: 'Light flow, feeling better today.',
      source: 'Period Tracker'
    }
  ]);

  const handleSaveNote = () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now().toString(),
        type: 'general',
        date: new Date().toISOString().split('T')[0],
        content: note.trim(),
        source: 'Cycle Notes'
      };
      setAllNotes([newNote, ...allNotes]);
      setNote('');
      Alert.alert('Success', 'Note saved successfully!');
    } else {
      Alert.alert('Error', 'Please enter a note');
    }
  };

  const getNoteIcon = (type: string) => {
    switch (type) {
      case 'period':
        return 'water';
      case 'general':
        return 'document-text';
      default:
        return 'document-text';
    }
  };

  const getNoteColor = (type: string) => {
    switch (type) {
      case 'period':
        return '#EF4444';
      case 'general':
        return '#10B981';
      default:
        return '#7C3AED';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

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
        <Text style={styles.headerTitle}>{t('cycleNotes')}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.noteInputCard}>
          <Text style={styles.sectionTitle}>{t('addNewNote')}</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="How are you feeling today? Any symptoms or observations?"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={6}
            value={note}
            onChangeText={setNote}
          />
        </View>

        <View style={styles.quickNotesCard}>
          <Text style={styles.sectionTitle}>{t('quickNotes')}</Text>
          <View style={styles.quickNoteButtons}>
            <TouchableOpacity style={styles.quickNoteButton}>
              <Text style={styles.quickNoteText}>Feeling tired</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickNoteButton}>
              <Text style={styles.quickNoteText}>Mood swings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickNoteButton}>
              <Text style={styles.quickNoteText}>Cramps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickNoteButton}>
              <Text style={styles.quickNoteText}>Bloating</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.allNotesCard}>
          <Text style={styles.sectionTitle}>{t('allNotes')}</Text>
          {allNotes.length > 0 ? (
            allNotes.map((noteItem) => (
              <View key={noteItem.id} style={styles.noteItem}>
                <View style={styles.noteHeader}>
                  <View style={styles.noteSource}>
                    <Ionicons 
                      name={getNoteIcon(noteItem.type) as any} 
                      size={16} 
                      color={getNoteColor(noteItem.type)} 
                    />
                    <Text style={styles.noteSourceText}>{noteItem.source}</Text>
                  </View>
                  <Text style={styles.noteDate}>{formatDate(noteItem.date)}</Text>
                </View>
                <Text style={styles.noteContent}>{noteItem.content}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.placeholderText}>{t('noNotes')}</Text>
          )}
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
  noteInputCard: {
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
  noteInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    textAlignVertical: 'top',
    minHeight: 120,
  },
  quickNotesCard: {
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
  quickNoteButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickNoteButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quickNoteText: {
    color: '#374151',
    fontSize: 14,
  },
  allNotesCard: {
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
  noteItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteSource: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  noteSourceText: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  noteDate: {
    color: '#6B7280',
    fontSize: 12,
  },
  noteContent: {
    fontSize: 16,
    color: '#374151',
  },
  recentNotesCard: {
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
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default CycleNotesScreen;
