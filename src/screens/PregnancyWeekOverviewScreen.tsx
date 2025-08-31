import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenWithNavBar from '../components/ScreenWithNavBar';

interface PregnancyWeekOverviewScreenProps {
  navigation: any;
  route: any;
}

type TabType = 'development' | 'health' | 'nutrition' | 'todos';

const PregnancyWeekOverviewScreen: React.FC<PregnancyWeekOverviewScreenProps> = ({ navigation, route }) => {
  const { currentWeek = 1 } = route.params;
  const [activeTab, setActiveTab] = useState<TabType>('development');

  const getTrimester = (week: number) => {
    if (week <= 12) return 1;
    if (week <= 26) return 2;
    return 3;
  };

  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: 'development', label: 'Baby Development', icon: 'heart' },
    { id: 'health', label: 'Mother\'s Health', icon: 'medical' },
    { id: 'nutrition', label: 'Nutrition', icon: 'nutrition' },
    { id: 'todos', label: 'To-Dos', icon: 'checkmark-circle' },
  ];

  const babyDevelopmentData = {
    1: {
      title: 'Conception & Implantation',
      description: 'The fertilized egg implants in the uterine wall. The embryo begins to develop.',
      size: 'Size of a poppy seed',
      milestones: ['Egg fertilized', 'Cell division begins', 'Implantation occurs'],
    },
    8: {
      title: 'Major Organs Forming',
      description: 'All major organs are beginning to form. The heart starts beating.',
      size: 'Size of a raspberry',
      milestones: ['Heart beats', 'Brain develops', 'Limb buds appear'],
    },
    12: {
      title: 'First Trimester Complete',
      description: 'Risk of miscarriage decreases significantly. Baby\'s gender can be determined.',
      size: 'Size of a lime',
      milestones: ['All organs formed', 'Gender visible', 'Risk reduced'],
    },
  };

  const healthTips = [
    'Get plenty of rest and sleep 8-10 hours per night',
    'Stay hydrated - drink 8-10 glasses of water daily',
    'Exercise regularly with pregnancy-safe activities',
    'Avoid alcohol, smoking, and recreational drugs',
    'Take prenatal vitamins as prescribed',
    'Attend all prenatal appointments',
  ];

  const nutritionTips = [
    'Eat a balanced diet rich in fruits, vegetables, and lean proteins',
    'Include folic acid-rich foods like leafy greens and legumes',
    'Consume adequate calcium from dairy or fortified alternatives',
    'Eat small, frequent meals to manage nausea',
    'Avoid raw fish, unpasteurized dairy, and undercooked meats',
    'Limit caffeine intake to 200mg per day',
  ];

  const todos = [
    'Schedule first prenatal appointment',
    'Start taking prenatal vitamins',
    'Research childbirth classes',
    'Create a birth plan',
    'Pack hospital bag',
    'Install car seat',
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'development':
        const weekData = babyDevelopmentData[currentWeek as keyof typeof babyDevelopmentData] || babyDevelopmentData[1];
        return (
          <View style={styles.contentCard}>
            <View style={styles.developmentHeader}>
              <View style={styles.developmentIcon}>
                <Ionicons name="heart" size={56} color="#7C3AED" />
              </View>
              <Text style={styles.developmentTitle}>
                {weekData.title}
              </Text>
              <Text style={styles.developmentSize}>
                {weekData.size}
              </Text>
            </View>
            
            <Text style={styles.developmentDescription}>
              {weekData.description}
            </Text>
            
            <View style={styles.milestonesContainer}>
              <Text style={styles.milestonesTitle}>Key Milestones:</Text>
              {weekData.milestones.map((milestone, index) => (
                <View key={index} style={styles.milestoneItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.milestoneText}>{milestone}</Text>
                </View>
              ))}
            </View>
          </View>
        );
        
      case 'health':
        return (
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Mother's Health Tips</Text>
            {healthTips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Ionicons name="medical" size={20} color="#7C3AED" />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        );
        
      case 'nutrition':
        return (
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Nutrition Guidelines</Text>
            {nutritionTips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Ionicons name="nutrition" size={20} color="#10B981" />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        );
        
      case 'todos':
        return (
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Pregnancy To-Dos</Text>
            {todos.map((todo, index) => (
              <View key={index} style={styles.todoItem}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#6B7280" />
                <Text style={styles.todoText}>{todo}</Text>
              </View>
            ))}
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <ScreenWithNavBar showBackButton title={`Week ${currentWeek}`}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={['#7C3AED', '#0EA5E9']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.headerTitle}>
            Week {currentWeek} (Trimester {getTrimester(currentWeek)})
          </Text>
          <Text style={styles.headerSubtitle}>
            Track your pregnancy progress
          </Text>
        </LinearGradient>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                activeTab === tab.id && styles.activeTabButton
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon as any}
                size={20}
                color={activeTab === tab.id ? '#7C3AED' : '#6B7280'}
              />
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.actionButtonText}>Add Note</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="alarm" size={24} color="white" />
            <Text style={styles.actionButtonText}>Set Reminder</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: '#EDE9FE',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  contentCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  developmentHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  developmentIcon: {
    width: 144,
    height: 144,
    backgroundColor: '#EDE9FE',
    borderRadius: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  developmentTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  developmentSize: {
    fontSize: 20,
    color: '#7C3AED',
    fontWeight: '600',
    marginBottom: 12,
  },
  developmentDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  milestonesContainer: {
    marginTop: 16,
  },
  milestonesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  milestoneText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  todoText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default PregnancyWeekOverviewScreen;
