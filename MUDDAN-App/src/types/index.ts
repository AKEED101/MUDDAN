export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'professional' | 'admin';
  avatar?: string;
}

export interface CycleData {
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

export interface CycleNote {
  id: string;
  date: Date;
  text: string;
  tags: string[];
  cycleId?: string;
}

export interface CycleMonth {
  month: string;
  year: number;
  cycles: CycleData[];
  notes: CycleNote[];
  averageLength: number;
  irregularities: string[];
}

export interface Consultant {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  pricePerHour: number;
  category: string;
  avatar?: string;
  isAvailable: boolean;
  languages: string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image?: string;
  date: Date;
  tags: string[];
  cta?: {
    type: 'book' | 'shop' | 'consult' | 'learn' | 'contact';
    text: string;
    action: string;
  };
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  avatar?: string;
  isPrivate: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  media?: string[];
  groupId: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  cta?: {
    type: 'book' | 'shop' | 'consult' | 'learn' | 'contact';
    text: string;
    action: string;
  };
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  replies: Comment[];
}

export interface Consultation {
  id: string;
  consultant: Consultant;
  date: Date;
  time: string;
  mode: 'chat' | 'audio' | 'video';
  status: 'upcoming' | 'completed' | 'cancelled';
  amount: number;
  duration: number;
}
