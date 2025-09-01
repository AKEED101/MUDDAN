import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../services/supabase';

const LANGS = ['en', 'so', 'ar'];

const ProfileOnboardingScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('en');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!res.canceled) {
      setAvatarUri(res.assets[0].uri);
    }
  };

  const uploadAvatar = async (userId: string) => {
    if (!avatarUri) return null;
    const blob = await (await fetch(avatarUri)).blob();
    const path = `avatars/${userId}.jpg`;
    const { error } = await supabase.storage.from('user-avatars').upload(path, blob, { upsert: true, contentType: 'image/jpeg' });
    if (error) { Alert.alert('Upload error', error.message); return null; }
    const { data } = supabase.storage.from('user-avatars').getPublicUrl(path);
    return data.publicUrl;
  };

  const save = async () => {
    if (!name) { Alert.alert('Name is required'); return; }
    setSaving(true);
    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userRes.user) { setSaving(false); return; }
    const userId = userRes.user.id;
    const avatarUrl = await uploadAvatar(userId);
    await supabase.from('user_profiles').upsert({ id: userId, email: userRes.user.email, name, phone, language, avatar_url: avatarUrl });
    setSaving(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#A855F7']} style={styles.header}>
        <Text style={styles.title}>Set up your profile</Text>
      </LinearGradient>
      <View style={styles.content}>
        <TouchableOpacity style={styles.avatar} onPress={pickImage}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
          ) : (
            <Ionicons name="person" size={36} color="#7C3AED" />
          )}
        </TouchableOpacity>
        <Text style={styles.label}>Full name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Your name" placeholderTextColor="#9CA3AF" />
        <Text style={styles.label}>Phone</Text>
        <TextInput value={phone} onChangeText={setPhone} style={styles.input} placeholder="+14155551234" placeholderTextColor="#9CA3AF" />
        <Text style={styles.label}>Language</Text>
        <View style={styles.langRow}>
          {LANGS.map(l => (
            <TouchableOpacity key={l} style={[styles.langChip, language === l && styles.langChipActive]} onPress={() => setLanguage(l)}>
              <Text style={[styles.langText, language === l && styles.langTextActive]}>{l.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={[styles.saveBtn, saving && { opacity: 0.5 }]} onPress={save} disabled={saving}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { padding: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 16 },
  avatarImg: { width: 96, height: 96, borderRadius: 48 },
  label: { color: '#374151', fontWeight: '700', marginTop: 8 },
  input: { backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: '#111827', marginTop: 6 },
  langRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  langChip: { backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12 },
  langChipActive: { backgroundColor: '#7C3AED' },
  langText: { color: '#374151', fontWeight: '700' },
  langTextActive: { color: 'white' },
  saveBtn: { backgroundColor: '#7C3AED', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  saveText: { color: 'white', fontWeight: '700' },
});

export default ProfileOnboardingScreen;


