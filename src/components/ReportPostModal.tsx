import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReportPostModalProps {
  visible: boolean;
  onClose: () => void;
  postId?: string;
  postTitle?: string;
}

const ReportPostModal: React.FC<ReportPostModalProps> = ({
  visible,
  onClose,
  postId,
  postTitle,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [description, setDescription] = useState('');

  const reportReasons = [
    { id: 'inappropriate', label: 'Inappropriate Content', icon: 'warning' },
    { id: 'spam', label: 'Spam or Misleading', icon: 'alert-circle' },
    { id: 'harassment', label: 'Harassment or Bullying', icon: 'shield' },
    { id: 'fake_news', label: 'False Information', icon: 'close-circle' },
    { id: 'copyright', label: 'Copyright Violation', icon: 'document' },
    { id: 'other', label: 'Other', icon: 'ellipsis-horizontal' },
  ];

  const handleSubmitReport = () => {
    if (!selectedReason) {
      Alert.alert('Error', 'Please select a reason for reporting');
      return;
    }

    if (description.trim().length < 10) {
      Alert.alert('Error', 'Please provide more details (at least 10 characters)');
      return;
    }

    // In real app, send report to backend
    Alert.alert(
      'Report Submitted',
      'Thank you for your report. Our team will review it within 24 hours.',
      [
        {
          text: 'OK',
          onPress: () => {
            onClose();
            setSelectedReason('');
            setDescription('');
          },
        },
      ]
    );
  };

  const renderReasonOption = (reason: any) => (
    <TouchableOpacity
      key={reason.id}
      style={[
        styles.reasonOption,
        selectedReason === reason.id && styles.reasonOptionSelected,
      ]}
      onPress={() => setSelectedReason(reason.id)}
    >
      <Ionicons
        name={reason.icon as any}
        size={20}
        color={selectedReason === reason.id ? '#7C3AED' : '#6B7280'}
      />
      <Text
        style={[
          styles.reasonText,
          selectedReason === reason.id && styles.reasonTextSelected,
        ]}
      >
        {reason.label}
      </Text>
      {selectedReason === reason.id && (
        <Ionicons name="checkmark-circle" size={20} color="#7C3AED" />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report Post</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Post Info */}
          {postTitle && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Post Being Reported</Text>
              <View style={styles.postInfo}>
                <Text style={styles.postTitle}>{postTitle}</Text>
                <Text style={styles.postId}>ID: {postId || 'N/A'}</Text>
              </View>
            </View>
          )}

          {/* Report Reason */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why are you reporting this post?</Text>
            <Text style={styles.sectionSubtitle}>
              Select the most appropriate reason for your report
            </Text>
            <View style={styles.reasonsContainer}>
              {reportReasons.map(renderReasonOption)}
            </View>
          </View>

          {/* Additional Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Details</Text>
            <Text style={styles.sectionSubtitle}>
              Please provide specific details to help us understand the issue
            </Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Describe the issue in detail..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>
              {description.length}/500 characters
            </Text>
          </View>

          {/* Privacy Notice */}
          <View style={styles.section}>
            <View style={styles.privacyNotice}>
              <Ionicons name="information-circle" size={20} color="#6B7280" />
              <Text style={styles.privacyText}>
                Your report will be reviewed by our moderation team. Your identity will remain confidential.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!selectedReason || description.trim().length < 10) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmitReport}
            disabled={!selectedReason || description.trim().length < 10}
          >
            <Text style={styles.submitButtonText}>Submit Report</Text>
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  placeholder: {
    width: 32,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  postInfo: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  postId: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  reasonsContainer: {
    gap: 12,
  },
  reasonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    gap: 12,
  },
  reasonOptionSelected: {
    borderColor: '#7C3AED',
    backgroundColor: '#F3F4F6',
  },
  reasonText: {
    flex: 1,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  reasonTextSelected: {
    color: '#7C3AED',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 8,
  },
  privacyNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
  },
  privacyText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportPostModal;
