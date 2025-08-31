import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types';

type ExploreDetailScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ExploreDetail'>;
type ExploreDetailScreenRouteProp = RouteProp<HomeStackParamList, 'ExploreDetail'>;

const ExploreDetailScreen = () => {
  const navigation = useNavigation<ExploreDetailScreenNavigationProp>();
  const route = useRoute<ExploreDetailScreenRouteProp>();
  const { articleId } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F4F8' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#7C3AED' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Article</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1E293B', marginBottom: 16 }}>
          Article {articleId}
        </Text>
        <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', lineHeight: 24 }}>
          This is a sample article detail. The full content would be displayed here with proper formatting, images, and interactive elements.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ExploreDetailScreen;
