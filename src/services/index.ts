// Export all services
export { default as supabase, supabaseService, SUPABASE_CONFIG } from './supabase';

// Export database services
export { databaseService } from './database';

// Export existing service functions
export * from './cycleNotes';
export * from './cycles';
export * from './PregnancyTracker';
export * from './DataValidator';
export * from './PerformanceMonitor';

// Re-export types
export type { 
  User, 
  Professional, 
  CycleRecord, 
  PregnancyRecord,
  Post,
  Comment,
  Booking,
  Appointment
} from '../types';
