export type RootTabParamList = {
  Home: undefined;
  Community: undefined;
  Consultant: { screen?: keyof ConsultantStackParamList };
  Profile: { screen?: keyof ProfileStackParamList };
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Cycle: undefined;
  CycleHome: undefined;
  LogPeriod: undefined;
  Calendar: undefined;
  Insights: undefined;
  CycleNotes: undefined;
  CycleTracker: undefined;
  CycleRecords: undefined;
  CycleHistory: undefined;
};

export type CommunityStackParamList = {
  CommunityMain: undefined;
  CreatePost: undefined;
  PostDetail: { postId: string };
  GroupDetail: { groupId: string };
  GroupCreate: undefined;
  GroupMembers: { groupId: string };
  GroupSettings: { groupId: string };
  GroupSearch: undefined;
  GroupFeed: { groupId: string };
  GroupInvite: { groupId: string };
  SavedPosts: undefined;
  ModerationQueue: undefined;
};

export type ConsultantStackParamList = {
  ConsultantsMain: undefined;
  ConsultantProfile: { consultantId: string };
  DoctorProfile: { doctorId: string };
  Booking: { consultantId: string };
  BookingConfirmation: {
    bookingId: string;
    consultantId: string;
    mode: 'chat' | 'audio' | 'video';
    date: string;
    slot: string;
    amount: number;
    paymentMethod: 'card' | 'wallet' | 'cash';
  };
  Consultation: { consultationId: string };
  VideoCall: { consultationId: string };
  AudioCall: { consultationId: string };
  Chat: { consultationId: string };
  Payment: { consultationId: string };
  Prescription: { consultationId: string };
  MyConsultations: undefined;
  HealthRecords: undefined;
  Explore: undefined;
  ExploreList: { category: string };
  ExploreDetail: { itemId: string };
  ArticleList: { category: string };
  ArticleDetail: { articleId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Settings: undefined;
  PrivacySettings: undefined;
  PaymentMethods: undefined;
  Notifications: undefined;
  Pregnancy: undefined;
  PregnancySetup: undefined;
  PregnancyWeekOverview: undefined;
  PregnancyNotesReminders: undefined;
};
