# MUDDAN - Pregnancy & Wellness App

A comprehensive React Native mobile application designed to support women through their pregnancy journey and wellness needs. Built with Expo, Firebase, and modern mobile development practices.

## 🌟 Features

### 🔹 Core Features
- **Cycle Tracking**: Menstrual calendar, notes, and cycle history
- **Pregnancy Tracker**: Week-by-week updates, baby development, health tips
- **Community**: Facebook Groups-style community with categories and subgroups
- **Consultants**: Expert booking system with multiple categories
- **Profile Management**: Personal dashboard with activity tracking

### 🔹 Navigation
- **4-Tab Bottom Navigation**: Home, Community, Consultants, Profile
- **Intuitive UI**: Modern, clean design with violet primary colors
- **Responsive Design**: Optimized for both iOS and Android

### 🔹 User Experience
- **Onboarding**: Welcome screen with user/professional signup options
- **Authentication**: Phone/email with OTP verification
- **Professional Verification**: Credential submission and admin review system
- **Multi-language Support**: English + Somali language toggle

## 🚀 Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation v6
- **UI Components**: React Native Paper, Custom Components
- **Icons**: Expo Vector Icons (Ionicons)
- **Styling**: StyleSheet with modern design system
- **State Management**: React Hooks (useState, useEffect)
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Payments**: Stripe integration
- **Charts**: React Native Chart Kit
- **Calendar**: React Native Calendars

## 📋 Current Progress

### ✅ Completed Features

#### 🏠 HOME Tab (100% Complete)
- **H1. Home Dashboard**: Feature grid (2×2 cards), Today's Tip, Explore Preview
- **H2. Explore Feed**: Full article feed with filters and actions
- **H3. Article Detail**: Complete article view with dynamic CTAs

#### 👥 COMMUNITY Tab (100% Complete)
- **C1. Community Categories**: Category chips, popular groups, create group button
- **C2. Group Detail**: Group information, rules, recent posts, navigation
- **C3. Group Feed**: Facebook-style posts with composer modal
- **C4. Post Detail**: Full post view with threaded comments and replies
- **C5. Members & Roles**: Tabbed member management with role-based actions
- **C6. Moderation Queue**: Admin-only moderation tools

#### 🩺 CONSULTANTS Tab (40% Complete)
- **S1. Consultants Hub**: ✅ Category chips, consultant list, filters, Book Consultation button
- **S2. Consultant Profile**: ✅ Hero section, badges, bio, specialties, languages, price, availability preview, portfolio, services, license info
- **S3. Booking Mode**: ⏳ Select consultation mode (Chat/Audio/Video)
- **S4. Availability & Payment**: ⏳ Calendar slots, payment methods, confirmation
- **S5. Booking Confirmation**: ⏳ Summary and next steps
- **S6. Consult Room - Chat**: ⏳ Chat interface with file uploads
- **S7. Consult Room - Audio**: ⏳ Audio call interface
- **S8. Prescription Viewer**: ⏳ PDF viewer for medical prescriptions

#### 👤 PROFILE Tab (100% Complete)
- **P1. Profile – User**: ✅ Avatar, name/email, stats, menu navigation, role toggle
- **P2. My Consultations**: ✅ Tabs for Upcoming/Past, consultant info, date/time, mode, status, actions
- **P3. Saved Posts**: ✅ List of saved explore/community items with unsave and open detail actions
- **P4. Cycle History**: ✅ Month summaries with period dates, cycle length, notes count, expandable details
- **P5. Profile – Professional**: ✅ Dashboard (today's consults, earnings, rating), profile editor, availability calendar, payouts

#### 🔧 Shared Components (100% Complete)
- Search Modal, Notifications Modal, Image Viewer Modal, Checkout Modal, Report Post Modal

### 🚧 In Progress
- **Consultants Booking Flow**: S3-S8 implementation
- **Authentication System**: Phone/email OTP verification
- **Firebase Integration**: Backend setup and data management

### 📋 Next Steps
1. Complete Consultants booking flow (S3-S8)
2. Implement authentication and onboarding
3. Integrate Firebase backend
4. Add payment processing (Stripe/Mobile Money)
5. Implement Cycle Tracking and Pregnancy features
6. Add multi-language support (English + Somali)

## 📱 Screenshots

### Home Screen
- Feature grid (2×2 cards) for main functions
- Today's health tip with CTA
- Explore feed preview
- Modern gradient design

### Community
- Category-based groups (Health, Fitness, Beauty, General)
- Post creation with CTA buttons
- Like, comment, and share functionality
- Admin moderation tools

### Consultants
- Expert categories with filtering
- Professional profiles with ratings
- Availability tracking
- Booking system integration

### Profile
- User statistics and activity
- Recent consultations
- Saved posts management
- Settings and preferences

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MUDDAN-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication, Firestore, and Storage
3. Add your app configuration to the project
4. Update the Firebase config in the app

### Stripe Setup
1. Create a Stripe account
2. Get your publishable key
3. Configure webhook endpoints
4. Test payment flows

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Main app screens
├── navigation/         # Navigation configuration
├── services/           # API and external services
├── utils/              # Helper functions
├── types/              # TypeScript type definitions
└── assets/             # Images, fonts, and static files
```

## 🎨 Design System

### Colors
- **Primary**: #8B5CF6 (Violet)
- **Secondary**: #A78BFA (Light Violet)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Amber)
- **Error**: #EF4444 (Red)
- **Background**: #F8FAFC (Light Gray)

### Typography
- **Headings**: Bold, 20-28px
- **Body**: Regular, 14-16px
- **Captions**: Medium, 12-14px

### Components
- **Cards**: Rounded corners (16px), subtle shadows
- **Buttons**: Primary and secondary styles
- **Inputs**: Clean, modern form elements
- **Icons**: Consistent iconography with Ionicons

## 🔐 Authentication & Security

- **Phone/Email Verification**: OTP-based authentication
- **Professional Verification**: Document submission and review
- **Role-based Access**: User, Professional, Admin roles
- **Data Privacy**: Secure user data handling
- **Payment Security**: Stripe-secured transactions

## 💳 Payment Integration

- **Stripe**: Primary payment processor
- **Mobile Money**: EVC/ZAAD/E-Dahab support
- **Consultation Fees**: Professional-set pricing
- **In-app Purchases**: Premium subscriptions
- **Secure Transactions**: PCI-compliant payment processing

## 📊 Data Management

- **Firebase Firestore**: Real-time database
- **User Profiles**: Comprehensive user information
- **Cycle Tracking**: Historical data and analytics
- **Pregnancy Records**: Week-by-week progression
- **Community Posts**: Social interaction data

## 🚀 Deployment

### Expo Build
```bash
# Build for production
expo build:android
expo build:ios

# Submit to app stores
expo submit:android
expo submit:ios
```

### App Store Deployment
1. Configure app.json with proper metadata
2. Build production versions
3. Submit to Apple App Store and Google Play Store
4. Configure app store listings and screenshots

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Video Consultations**: Real-time video calling
- **AI Health Assistant**: Chatbot for health queries
- **Offline Mode**: Data synchronization
- **Push Notifications**: Reminders and updates
- **Analytics Dashboard**: Health insights and trends
- **Multi-language**: Additional language support

## 📱 Platform Support

- **iOS**: 13.0 and above
- **Android**: API level 21 (Android 5.0) and above
- **Web**: Responsive web version (future)

---

Built with ❤️ for women's health and wellness
