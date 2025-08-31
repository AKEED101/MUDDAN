import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CycleStackParamList } from '../../navigation/types';
import { addCycleNote, listCycleNotes, CycleNote } from '../../services/cycleNotes';

type CycleNotesScreenNavigationProp = NativeStackNavigationProp<CycleStackParamList, 'CycleNotesScreen'>;

const CycleNotesScreen = () => {
  const navigation = useNavigation<CycleNotesScreenNavigationProp>();
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<CycleNote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user ID - in real app this would come from auth context
  const mockUserId = 'user123';

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const fetchedNotes = await listCycleNotes(mockUserId);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
      Alert.alert('Error', 'Failed to load notes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!note.trim()) {
      Alert.alert('Error', 'Please enter a note');
      return;
    }

    try {
      const todayISO = new Date().toISOString().split('T')[0];
      await addCycleNote(mockUserId, null, todayISO, 'manual', note.trim());
      
      // Refresh notes list
      await loadNotes();
      
      setNote('');
      Alert.alert('Success', 'Note saved successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save note');
    }
  };

  const getNoteIcon = (source: string) => {
    switch (source) {
      case 'calendar':
        return 'calendar';
      case 'tracker':
        return 'medical';
      case 'notes':
        return 'document-text';
      case 'manual':
        return 'create';
      default:
        return 'document-text';
    }
  };

  const getNoteColor = (source: string) => {
    switch (source) {
      case 'calendar':
        return '#EF4444';
      case 'tracker':
        return '#10B981';
      case 'notes':
        return '#3B82F6';
      case 'manual':
        return '#8B5CF6';
      default:
        return '#7C3AED';
    }
  };

  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderNote = ({ item }: { item: CycleNote }) => (
    <View style={styles.noteItem}>
      <View style={styles.noteHeader}>
        <View style={styles.noteSource}>
          <Ionicons 
            name={getNoteIcon(item.source) as any} 
            size={16} 
            color={getNoteColor(item.source)} 
          />
          <Text style={styles.noteSourceText}>
            {item.source.charAt(0).toUpperCase() + item.source.slice(1)}
          </Text>
        </View>
        <Text style={styles.noteDate}>{formatDate(item.dateISO)}</Text>
      </View>
      <Text style={styles.noteContent}>{item.text}</Text>
    </View>
  );

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
        <Text style={styles.headerTitle}>Cycle Notes</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.noteInputCard}>
          <Text style={styles.sectionTitle}>Add New Note</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="How are you feeling today? Any symptoms or observations?"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
          />
        </View>

        <View style={styles.quickNotesCard}>
          <Text style={styles.sectionTitle}>Quick Notes</Text>
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
          <Text style={styles.sectionTitle}>All Notes</Text>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading notes...</Text>
          ) : notes.length > 0 ? (
            <FlatList
              data={notes}
              renderItem={renderNote}
              keyExtractor={(item) => item.id || item.dateISO}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.placeholderText}>No notes yet</Text>
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
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 100,
    textAlignVertical: 'top',
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickNoteText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
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
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
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
