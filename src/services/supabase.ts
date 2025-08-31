import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://pulywbdaphmfdepwrtvn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bHl3YmRhcGhtZmRlcHdydHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjE3OTMsImV4cCI6MjA3MjEzNzc5M30.Z-7DplBRHqwR0oUykrjmcPdZ3w5uPYGklItiTI0YFXY';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export configuration constants for use in other parts of the app
export const SUPABASE_CONFIG = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
};

// Helper functions for common Supabase operations
export const supabaseService = {
  // Auth helpers
  auth: {
    signUp: async (email: string, password: string) => {
      return await supabase.auth.signUp({ email, password });
    },
    signIn: async (email: string, password: string) => {
      return await supabase.auth.signInWithPassword({ email, password });
    },
    signOut: async () => {
      return await supabase.auth.signOut();
    },
    getCurrentUser: async () => {
      return await supabase.auth.getUser();
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      return supabase.auth.onAuthStateChange(callback);
    },
  },

  // Database helpers
  db: {
    from: (table: string) => supabase.from(table),
    select: (table: string, columns?: string) => {
      if (columns) {
        return supabase.from(table).select(columns);
      }
      return supabase.from(table).select('*');
    },
    insert: (table: string, data: any) => {
      return supabase.from(table).insert(data);
    },
    update: (table: string, data: any, match: any) => {
      return supabase.from(table).update(data).match(match);
    },
    delete: (table: string, match: any) => {
      return supabase.from(table).delete().match(match);
    },
  },

  // Storage helpers
  storage: {
    upload: (bucket: string, path: string, file: any) => {
      return supabase.storage.from(bucket).upload(path, file);
    },
    download: (bucket: string, path: string) => {
      return supabase.storage.from(bucket).download(path);
    },
    getPublicUrl: (bucket: string, path: string) => {
      return supabase.storage.from(bucket).getPublicUrl(path);
    },
  },
};

export default supabase;
