import { supabase } from './supabase';
import type { 
  User, 
  Professional, 
  CycleRecord, 
  CycleNote, 
  PregnancyRecord,
  HealthRecord,
  Post,
  Comment,
  Booking,
  Review,
  Group,
  UserNotification,
  UserSettings
} from '../types';

// =====================================================
// USER PROFILE SERVICES
// =====================================================

export const userProfileService = {
  // Get current user profile
  async getCurrentProfile(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create or update user profile
  async upsertProfile(profile: Partial<User>): Promise<User> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.id,
        email: user.email || profile.email,
        ...profile,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update profile avatar
  async updateAvatar(avatarUrl: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('user_profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', user.id);

    if (error) throw error;
  }
};

// =====================================================
// CYCLE TRACKING SERVICES
// =====================================================

export const cycleTrackingService = {
  // Get user's cycle records
  async getCycleRecords(limit = 50): Promise<CycleRecord[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('cycle_records')
      .select('*')
      .eq('user_id', user.id)
      .order('start_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Create new cycle record
  async createCycleRecord(cycleData: Omit<CycleRecord, 'id' | 'created_at' | 'updated_at'>): Promise<CycleRecord> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('cycle_records')
      .insert({
        ...cycleData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update cycle record
  async updateCycleRecord(id: string, updates: Partial<CycleRecord>): Promise<CycleRecord> {
    const { data, error } = await supabase
      .from('cycle_records')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get cycle notes
  async getCycleNotes(cycleId?: string, limit = 50): Promise<CycleNote[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    let query = supabase
      .from('cycle_notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (cycleId) {
      query = query.eq('cycle_id', cycleId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // Add cycle note
  async addCycleNote(noteData: Omit<CycleNote, 'id' | 'created_at'>): Promise<CycleNote> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('cycle_notes')
      .insert({
        ...noteData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// PREGNANCY TRACKING SERVICES
// =====================================================

export const pregnancyTrackingService = {
  // Get pregnancy records
  async getPregnancyRecords(): Promise<PregnancyRecord[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('pregnancy_records')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Create pregnancy record
  async createPregnancyRecord(recordData: Omit<PregnancyRecord, 'id' | 'created_at' | 'updated_at'>): Promise<PregnancyRecord> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('pregnancy_records')
      .insert({
        ...recordData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update pregnancy record
  async updatePregnancyRecord(id: string, updates: Partial<PregnancyRecord>): Promise<PregnancyRecord> {
    const { data, error } = await supabase
      .from('pregnancy_records')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// HEALTH RECORDS SERVICES
// =====================================================

export const healthRecordsService = {
  // Get health records
  async getHealthRecords(limit = 50): Promise<HealthRecord[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('health_records')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Create health record
  async createHealthRecord(recordData: Omit<HealthRecord, 'id' | 'created_at' | 'updated_at'>): Promise<HealthRecord> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('health_records')
      .insert({
        ...recordData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update health record
  async updateHealthRecord(id: string, updates: Partial<HealthRecord>): Promise<HealthRecord> {
    const { data, error } = await supabase
      .from('health_records')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete health record
  async deleteHealthRecord(id: string): Promise<void> {
    const { error } = await supabase
      .from('health_records')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// =====================================================
// COMMUNITY SERVICES
// =====================================================

export const communityService = {
  // Get posts
  async getPosts(groupId?: string, limit = 20): Promise<Post[]> {
    let query = supabase
      .from('posts')
      .select(`
        *,
        user_profiles!inner(name, avatar_url),
        groups(name)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (groupId) {
      query = query.eq('group_id', groupId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // Create post
  async createPost(postData: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'comments_count'>): Promise<Post> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...postData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get comments for a post
  async getComments(postId: string, limit = 50): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        user_profiles!inner(name, avatar_url)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Add comment
  async addComment(commentData: Omit<Comment, 'id' | 'created_at' | 'updated_at' | 'likes_count'>): Promise<Comment> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('comments')
      .insert({
        ...commentData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Like/unlike post
  async togglePostLike(postId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single();

    if (existingLike) {
      // Unlike
      await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);
    } else {
      // Like
      await supabase
        .from('post_likes')
        .insert({
          post_id: postId,
          user_id: user.id
        });
    }
  }
};

// =====================================================
// PROFESSIONAL SERVICES
// =====================================================

export const professionalService = {
  // Get approved professionals
  async getProfessionals(specialization?: string, limit = 20): Promise<Professional[]> {
    let query = supabase
      .from('professional_profiles')
      .select(`
        *,
        user_profiles!inner(name, email, avatar_url)
      `)
      .eq('is_approved', true)
      .order('rating', { ascending: false })
      .limit(limit);

    if (specialization) {
      query = query.eq('specialization', specialization);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // Get professional availability
  async getProfessionalAvailability(professionalId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('professional_availability')
      .select('*')
      .eq('professional_id', professionalId)
      .eq('is_available', true);

    if (error) throw error;
    return data || [];
  },

  // Create booking
  async createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'status' | 'payment_status'>): Promise<Booking> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...bookingData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user bookings
  async getUserBookings(): Promise<Booking[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        professional_profiles!inner(
          specialization,
          user_profiles!inner(name, avatar_url)
        )
      `)
      .eq('user_id', user.id)
      .order('appointment_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};

// =====================================================
// NOTIFICATION SERVICES
// =====================================================

export const notificationService = {
  // Get user notifications
  async getNotifications(limit = 50): Promise<UserNotification[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('user_notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) throw error;
  },

  // Get user settings
  async getUserSettings(): Promise<UserSettings | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  // Update user settings
  async updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_settings')
      .update(settings)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// =====================================================
// STORAGE SERVICES
// =====================================================

export const storageService = {
  // Upload file to bucket
  async uploadFile(bucket: string, path: string, file: File | Blob): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) throw error;
    return data.path;
  },

  // Get public URL for file
  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  },

  // Delete file
  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  }
};

// =====================================================
// REAL-TIME SUBSCRIPTIONS
// =====================================================

export const realtimeService = {
  // Subscribe to posts changes
  subscribeToPosts(callback: (payload: any) => void) {
    return supabase
      .channel('posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, callback)
      .subscribe();
  },

  // Subscribe to user notifications
  subscribeToNotifications(callback: (payload: any) => void) {
    return supabase
      .channel('notifications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_notifications' }, callback)
      .subscribe();
  },

  // Subscribe to cycle records
  subscribeToCycleRecords(callback: (payload: any) => void) {
    return supabase
      .channel('cycle_records')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cycle_records' }, callback)
      .subscribe();
  }
};

// Export all services
export const databaseService = {
  userProfile: userProfileService,
  cycleTracking: cycleTrackingService,
  pregnancyTracking: pregnancyTrackingService,
  healthRecords: healthRecordsService,
  community: communityService,
  professional: professionalService,
  notification: notificationService,
  storage: storageService,
  realtime: realtimeService
};
