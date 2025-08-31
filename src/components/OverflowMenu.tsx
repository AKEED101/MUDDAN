import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface OverflowMenuProps {
  onExportPDF: () => void;
  onShareSummary: () => void;
  onFilters: () => void;
}

const OverflowMenu: React.FC<OverflowMenuProps> = ({
  onExportPDF,
  onShareSummary,
  onFilters,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const menuItems = [
    {
      id: 'export',
      title: 'Export to PDF',
      subtitle: 'Generate and share cycle insights',
      icon: 'document-text',
      gradient: ['#10B981', '#34D399'] as [string, string],
      onPress: () => {
        setIsVisible(false);
        onExportPDF();
      },
    },
    {
      id: 'share',
      title: 'Share Summary',
      subtitle: 'Share insights with healthcare provider',
      icon: 'share-social',
      gradient: ['#3B82F6', '#60A5FA'] as [string, string],
      onPress: () => {
        setIsVisible(false);
        onShareSummary();
      },
    },
    {
      id: 'filters',
      title: 'Filters',
      subtitle: 'Customize data view',
      icon: 'filter',
      gradient: ['#8B5CF6', '#A78BFA'] as [string, string],
      onPress: () => {
        setIsVisible(false);
        onFilters();
      },
    },
  ];

  return (
    <>
      <TouchableOpacity
        style={styles.overflowButton}
        onPress={() => setIsVisible(true)}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
          style={styles.overflowButtonGradient}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <LinearGradient
                  colors={item.gradient}
                  style={styles.menuItemGradient}
                >
                  <Ionicons name={item.icon as any} size={20} color="white" />
                </LinearGradient>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overflowButton: {
    width: 48,
    height: 48,
  },
  overflowButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default OverflowMenu;
