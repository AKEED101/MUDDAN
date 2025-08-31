import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CycleNote } from '../types';

const CycleNotesScreen = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState<CycleNote[]>([
    {
      id: '1',
      date: new Date('2024-03-10'),
      text: 'Experienced mild cramps on day 2, took ibuprofen. Flow was medium.',
      tags: ['cramps', 'medium flow', 'medication'],
    },
    {
      id: '2',
      date: new Date('2024-03-08'),
      text: 'Started period today. Feeling tired but overall okay. Light flow.',
      tags: ['start', 'tired', 'light flow'],
    },
    {
      id: '3',
      date: new Date('2024-02-28'),
      text: 'Ovulation symptoms: increased libido, slight breast tenderness.',
      tags: ['ovulation', 'libido', 'breast tenderness'],
    },
  ]);
  
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = [
    'cramps', 'mood', 'flow', 'tired', 'bloating', 'headache',
    'back pain', 'breast tenderness', 'libido', 'ovulation',
    'medication', 'start', 'end', 'heavy', 'medium', 'light'
  ];

  const handleAddNote = () => {
    if (newNoteText.trim() === '') {
      Alert.alert('Error', 'Please enter a note');
      return;
    }

    const newNote: CycleNote = {
      id: Date.now().toString(),
      date: new Date(),
      text: newNoteText.trim(),
      tags: selectedTags,
    };

    setNotes([newNote, ...notes]);
    setNewNoteText('');
    setSelectedTags([]);
    setIsAddingNote(false);
  };

  const handleDeleteNote = (noteId: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNotes(notes.filter(note => note.id !== noteId));
          },
        },
      ]
    );
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const renderTag = (tag: string, isSelected: boolean = false) => (
    <TouchableOpacity
      key={tag}
      style={[
        styles.tag,
        isSelected && styles.selectedTag
      ]}
      onPress={() => handleTagToggle(tag)}
    >
      <Text style={[
        styles.tagText,
        isSelected && styles.selectedTagText
      ]}>
        {tag}
      </Text>
    </TouchableOpacity>
  );

  const renderNote = ({ item }: { item: CycleNote }) => (
    <View style={styles.noteCard}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteDate}>
          {item.date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </Text>
        <TouchableOpacity
          onPress={() => handleDeleteNote(item.id)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.noteText}>{item.text}</Text>
      
      <View style={styles.noteTags}>
        {item.tags.map(tag => renderTag(tag))}
      </View>
    </View>
  );

  const renderAddNoteForm = () => (
    <View style={styles.addNoteForm}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Add New Note</Text>
        <TouchableOpacity
          onPress={() => setIsAddingNote(false)}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.noteInput}
        placeholder="Write your note here..."
        value={newNoteText}
        onChangeText={setNewNoteText}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      
      <Text style={styles.tagsLabel}>Select Tags:</Text>
      <View style={styles.tagsContainer}>
        {availableTags.map(tag => renderTag(tag, selectedTags.includes(tag)))}
      </View>
      
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleAddNote}
        activeOpacity={0.8}
      >
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Cycle Notes</Text>
        <TouchableOpacity
          onPress={() => setIsAddingNote(true)}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isAddingNote && renderAddNoteForm()}
        
        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Your Notes</Text>
          {notes.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No notes yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Start tracking your cycle symptoms and experiences
              </Text>
            </View>
          ) : (
            <FlatList
              data={notes}
              renderItem={renderNote}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
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
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  addNoteForm: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 16,
    minHeight: 100,
  },
  tagsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  selectedTag: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  tagText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedTagText: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  notesContainer: {
    padding: 20,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  noteCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  noteDate: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 4,
  },
  noteText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 22,
    marginBottom: 12,
  },
  noteTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default CycleNotesScreen;
