export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: 'user' | 'professional' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Professional extends User {
  role: 'professional';
  specialization: string;
  experience: number;
  license?: string;
  credentials: string[];
  availability: Availability[];
  pricing: Pricing;
  rating: number;
  reviews: Review[];
  isVerified: boolean;
  isApproved: boolean;
}

export interface Availability {
  day: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

export interface Pricing {
  consultationFee: number;
  currency: string;
  packages?: Package[];
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  sessions: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  images?: string[];
  image?: string; // For backward compatibility with mock data
  category: string;
  groupId?: string;
  cta?: CTA;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  isVerified: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  replies?: Comment[];
}

export interface CTA {
  type: 'book' | 'buy' | 'consult' | 'learn' | 'contact';
  label: string;
  url: string;
  expiresAt?: Date;
  isActive: boolean;
}

export interface UserRole {
  role: 'admin' | 'professional' | 'premium' | 'free';
  isVerified?: boolean;
}

export interface Group {
  id: string;
  name: string;
  category: string;
  description: string;
  memberCount: number;
  posts: Post[];
}

// Mock data interfaces for backward compatibility
export interface MockPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  group: string;
  image: string;
}

export interface MockConsultant {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
  availability: string;
  price: string;
  languages: string[];
  education: string;
  hospital: string;
  isVerified: boolean;
  category: string;
}

export interface MockSearchResult {
  id: number;
  type: 'article' | 'consultant' | 'community';
  title: string;
  category: string;
  image: string;
  author?: string;
  date?: string;
  rating?: number;
  price?: string;
  replies?: number;
}

export interface CycleRecord {
  id: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  symptoms: string[];
  notes: string;
  flow: 'light' | 'medium' | 'heavy';
}

export interface PregnancyRecord {
  id: string;
  userId: string;
  dueDate: Date;
  currentWeek: number;
  notes: string[];
  appointments: Appointment[];
}

export interface Appointment {
  id: string;
  date: Date;
  type: string;
  notes: string;
  completed: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  professionalId: string;
  date: Date;
  timeSlot: TimeSlot;
  type: 'chat' | 'audio' | 'video';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
}
