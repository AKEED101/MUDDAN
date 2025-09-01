import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConsultantStackParamList } from '../navigation/types';

type ChatScreenNavigationProp = NativeStackNavigationProp<ConsultantStackParamList, 'Chat'>;
type ChatScreenRouteProp = RouteProp<ConsultantStackParamList, 'Chat'>;

const ChatScreen = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const route = useRoute<ChatScreenRouteProp>();
  const { consultationId } = route.params;
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleAttachSample = () => {
    // Attach a sample asset to simulate file upload without extra deps
    setAttachments(prev => [...prev, 'assets/icon.png']);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={styles.placeholder} />
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.chatCard}>
          <Text style={styles.chatTitle}>Chat Session {consultationId}</Text>
          <Text style={styles.chatContent}>Attach files and send messages.</Text>
          {attachments.length > 0 && (
            <View style={styles.attachmentsRow}>
              {attachments.map((a, idx) => (
                <View key={idx} style={styles.attachmentChip}>
                  <Ionicons name="document-attach" size={16} color="#7C3AED" />
                  <Text style={styles.attachmentText}>{a.split('/').pop()}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.composer}>
        <TouchableOpacity style={styles.attachBtn} onPress={handleAttachSample}>
          <Ionicons name="attach" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TextInput value={message} onChangeText={setMessage} placeholder="Type a message" placeholderTextColor="#9CA3AF" style={styles.input} />
        <TouchableOpacity style={styles.sendBtn}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
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
  chatCard: {
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
  chatTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  chatContent: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  attachBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#111827',
  },
  sendBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
  },
});

export default ChatScreen;
