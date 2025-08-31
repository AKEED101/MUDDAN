import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DoctorProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F4F8' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#7C3AED' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Doctor Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1E293B', marginBottom: 16 }}>
          Dr. Sarah Johnson
        </Text>
        <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', lineHeight: 24 }}>
          Obstetrician & Gynecologist with 15 years of experience
        </Text>
        <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 16 }}>
          Doctor profile functionality coming soon!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DoctorProfileScreen;
