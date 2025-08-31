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

interface CheckoutModalProps {
  visible: boolean;
  onClose: () => void;
  bookingDetails?: {
    consultantName: string;
    service: string;
    duration: string;
    price: number;
    date: string;
    time: string;
  };
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  visible,
  onClose,
  bookingDetails,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile_money'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Mock booking details if none provided
  const details = bookingDetails || {
    consultantName: 'Dr. Sarah Johnson',
    service: 'Pregnancy Consultation',
    duration: '30 minutes',
    price: 75,
    date: 'Dec 15, 2024',
    time: '2:00 PM',
  };

  const handlePayment = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
        Alert.alert('Error', 'Please fill in all card details');
        return;
      }
    } else {
      if (!phoneNumber) {
        Alert.alert('Error', 'Please enter your phone number');
        return;
      }
    }

    // In real app, integrate with Stripe or mobile money API
    Alert.alert(
      'Payment Processing',
      'Your payment is being processed. You will receive a confirmation shortly.',
      [
        {
          text: 'OK',
          onPress: () => {
            onClose();
            // Navigate to confirmation screen
          },
        },
      ]
    );
  };

  const renderPaymentMethod = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'card' && styles.paymentOptionSelected,
          ]}
          onPress={() => setPaymentMethod('card')}
        >
          <Ionicons
            name="card-outline"
            size={24}
            color={paymentMethod === 'card' ? '#7C3AED' : '#6B7280'}
          />
          <Text
            style={[
              styles.paymentOptionText,
              paymentMethod === 'card' && styles.paymentOptionTextSelected,
            ]}
          >
            Credit/Debit Card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'mobile_money' && styles.paymentOptionSelected,
          ]}
          onPress={() => setPaymentMethod('mobile_money')}
        >
          <Ionicons
            name="phone-portrait-outline"
            size={24}
            color={paymentMethod === 'mobile_money' ? '#7C3AED' : '#6B7280'}
          />
          <Text
            style={[
              styles.paymentOptionText,
              paymentMethod === 'mobile_money' && styles.paymentOptionTextSelected,
            ]}
          >
            Mobile Money
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCardForm = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Card Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        maxLength={16}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="MM/YY"
          value={expiryDate}
          onChangeText={setExpiryDate}
          maxLength={5}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Cardholder Name"
        value={cardholderName}
        onChangeText={setCardholderName}
      />
    </View>
  );

  const renderMobileMoneyForm = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Mobile Money Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Text style={styles.mobileMoneyNote}>
        You will receive an SMS to confirm your payment
      </Text>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Booking Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Summary</Text>
            <View style={styles.bookingCard}>
              <View style={styles.bookingRow}>
                <Text style={styles.bookingLabel}>Consultant:</Text>
                <Text style={styles.bookingValue}>{details.consultantName}</Text>
              </View>
              <View style={styles.bookingRow}>
                <Text style={styles.bookingLabel}>Service:</Text>
                <Text style={styles.bookingValue}>{details.service}</Text>
              </View>
              <View style={styles.bookingRow}>
                <Text style={styles.bookingLabel}>Duration:</Text>
                <Text style={styles.bookingValue}>{details.duration}</Text>
              </View>
              <View style={styles.bookingRow}>
                <Text style={styles.bookingLabel}>Date & Time:</Text>
                <Text style={styles.bookingValue}>{details.date} at {details.time}</Text>
              </View>
            </View>
          </View>

          {/* Payment Method Selection */}
          {renderPaymentMethod()}

          {/* Payment Form */}
          {paymentMethod === 'card' ? renderCardForm() : renderMobileMoneyForm()}

          {/* Total */}
          <View style={styles.section}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>${details.price}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Payment Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Pay ${details.price}</Text>
            <Ionicons name="lock-closed" size={20} color="#FFFFFF" />
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
    marginBottom: 16,
  },
  bookingCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bookingLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  bookingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    gap: 12,
  },
  paymentOptionSelected: {
    borderColor: '#7C3AED',
    backgroundColor: '#F3F4F6',
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  paymentOptionTextSelected: {
    color: '#7C3AED',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  mobileMoneyNote: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  payButton: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CheckoutModal;
