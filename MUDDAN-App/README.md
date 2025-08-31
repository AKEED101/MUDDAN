# MUDDAN - Pregnancy & Wellness App

A comprehensive React Native mobile application for women's health tracking, community support, and professional consultation.

## 🚀 Features

### ✅ Completed Features

#### 1. **CYCLE TRACKER** - Fully Implemented
- **T1. Cycle Calendar**: Month view with period tracking, fertile windows, and next period prediction
- **T2. Cycle Notes**: Comprehensive note-taking with tags (cramps, mood, flow, etc.)
- **T3. Cycle Records**: Detailed monthly history with expandable month cards
- **T4. Log Period**: Complete form for logging new period data including:
  - Start date and duration
  - Flow intensity (light/medium/heavy)
  - Pain level (1-5 scale)
  - Symptoms tracking
  - Medications and treatments
  - Additional comments

#### 2. **Global App Shell**
- Bottom navigation with 4 tabs (Home, Community, Consultants, Profile)
- Shared modals system
- Role-based access control
- Modern UI with violet (#7C3AED) primary color

#### 3. **HOME Tab**
- Dashboard with feature grid (Cycle, Pregnancy, Consultants, Explore)
- Today's Tip card
- Explore preview with navigation

### 🔄 In Progress
- Community features
- Consultants booking system
- Profile management
- Authentication system

### 📋 Planned Features
- Pregnancy tracking
- Community groups and posts
- Professional consultation booking
- Payment integration
- Multi-language support (English + Somali)

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **UI Components**: React Native Paper, Custom components
- **Styling**: StyleSheet with modern design system
- **Icons**: Expo Vector Icons (Ionicons)
- **Calendar**: react-native-calendars
- **Charts**: react-native-chart-kit

## 📱 App Structure

```
src/
├── components/          # Shared UI components
├── screens/            # App screens
│   ├── HomeScreen.tsx           # Main dashboard
│   ├── CycleTrackerScreen.tsx   # T1: Cycle calendar
│   ├── CycleNotesScreen.tsx     # T2: Cycle notes
│   ├── CycleRecordsScreen.tsx   # T3: Cycle history
│   ├── LogPeriodScreen.tsx      # T4: Period logging
│   ├── CommunityScreen.tsx      # Community (placeholder)
│   ├── ConsultantsScreen.tsx    # Consultants (placeholder)
│   └── ProfileScreen.tsx        # Profile (placeholder)
├── navigation/         # Navigation configuration
├── types/              # TypeScript interfaces
├── services/           # API and business logic
└── utils/              # Helper functions
```

## 🎨 Design System

- **Primary Color**: Violet (#7C3AED)
- **Background**: Light gray (#F8FAFC)
- **Cards**: White with subtle shadows
- **Typography**: Modern, readable fonts
- **Spacing**: Consistent 16px grid system
- **Border Radius**: 12px for cards, 8px for inputs

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MUDDAN-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

## 📱 Cycle Tracker Usage

### Calendar View (T1)
- View monthly calendar with period days marked
- See cycle information (next period, cycle length, fertile window)
- Access Notes, Records, and Log Period functions

### Notes (T2)
- Add cycle-related notes with tags
- Track symptoms, mood, and observations
- Search and filter notes by tags

### Records (T3)
- View monthly cycle summaries
- Expand month cards for detailed information
- Track irregularities and patterns

### Log Period (T4)
- Comprehensive form for new period data
- Select flow intensity, pain level, symptoms
- Add medications and treatments
- Include additional comments

## 🔧 Development

### Adding New Features
1. Create new screen in `src/screens/`
2. Add navigation in appropriate stack
3. Update types in `src/types/index.ts`
4. Follow existing design patterns

### Code Style
- Use TypeScript for all components
- Follow React Native best practices
- Maintain consistent styling patterns
- Add proper error handling

## 📊 Data Models

### CycleData Interface
```typescript
interface CycleData {
  id: string;
  startDate: Date;
  endDate?: Date;
  duration: number;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  painLevel: number;
  medications?: string[];
  notes?: string;
  tags: string[];
}
```

### CycleNote Interface
```typescript
interface CycleNote {
  id: string;
  date: Date;
  text: string;
  tags: string[];
  cycleId?: string;
}
```

## 🚧 Known Issues

- Date picker functionality needs implementation
- Data persistence not yet implemented
- Placeholder screens for Community, Consultants, and Profile

## 🔮 Next Steps

1. **Implement date picker** for Log Period screen
2. **Add data persistence** with AsyncStorage or database
3. **Complete remaining tabs** (Community, Consultants, Profile)
4. **Add authentication** system
5. **Implement pregnancy tracking** features
6. **Add offline support**

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**MUDDAN** - Empowering women's health through technology and community support.
