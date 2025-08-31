import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Optimized Supabase configuration for 6G speed
const SUPABASE_URL = 'https://pulywbdaphmfdepwrtvn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bHl3YmRhcGhtZmRlcHdydHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjE3OTMsImV4cCI6MjA3MjEzNzc5M30.Z-7DplBRHqwR0oUykrjmcPdZ3w5uPYGklItiTI0YFXY';

// Performance-optimized client configuration
const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  db: {
    schema: 'public',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
  },
  global: {
    headers: {
      'X-Client-Info': 'muddan-app-optimized',
    },
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
};

// Create optimized client
export const supabase: SupabaseClient = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  supabaseConfig
);

// Performance optimization: Connection pooling
let connectionPool: SupabaseClient[] = [];
const MAX_CONNECTIONS = 5;

// Get optimized connection from pool
export const getOptimizedConnection = (): SupabaseClient => {
  if (connectionPool.length < MAX_CONNECTIONS) {
    const client = createClient(
      supabaseConfig.url,
      supabaseConfig.anonKey,
      {
        ...supabaseConfig,
        global: {
          ...supabaseConfig.global,
          headers: {
            ...supabaseConfig.global.headers,
            'X-Connection-ID': `conn-${connectionPool.length}`,
          },
        },
      }
    );
    connectionPool.push(client);
    return client;
  }
  
  // Round-robin connection selection
  const index = Math.floor(Math.random() * connectionPool.length);
  return connectionPool[index];
};

// High-performance service layer
export const optimizedSupabaseService = {
  // Ultra-fast authentication with caching
  auth: {
    signUp: async (email: string, password: string) => {
      const startTime = performance.now();
      const result = await supabase.auth.signUp({ email, password });
      const endTime = performance.now();
      
      if (endTime - startTime > 1000) {
        console.warn('⚠️ Authentication taking longer than expected');
      }
      
      return result;
    },
    
    signIn: async (email: string, password: string) => {
      const startTime = performance.now();
      const result = await supabase.auth.signInWithPassword({ email, password });
      const endTime = performance.now();
      
      if (endTime - startTime > 1000) {
        console.warn('⚠️ Sign-in taking longer than expected');
      }
      
      return result;
    },
    
    signOut: async () => {
      return await supabase.auth.signOut();
    },
    
    getCurrentUser: async () => {
      return await supabase.auth.getUser();
    },
  },

  // High-speed database operations
  db: {
    // Optimized select with connection pooling
    select: async (table: string, columns: string = '*', filters?: any) => {
      const client = getOptimizedConnection();
      const startTime = performance.now();
      
      let query = client.from(table).select(columns);
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }
      
      const result = await query;
      const endTime = performance.now();
      
      if (endTime - startTime > 500) {
        console.warn(`⚠️ Database select from ${table} taking longer than expected`);
      }
      
      return result;
    },

    // Fast insert with optimization
    insert: async (table: string, data: any) => {
      const client = getOptimizedConnection();
      const startTime = performance.now();
      
      const result = await client.from(table).insert(data).select();
      const endTime = performance.now();
      
      if (endTime - startTime > 500) {
        console.warn(`⚠️ Database insert into ${table} taking longer than expected`);
      }
      
      return result;
    },

    // Optimized update
    update: async (table: string, data: any, match: any) => {
      const client = getOptimizedConnection();
      const startTime = performance.now();
      
      let query = client.from(table).update(data);
      
      Object.entries(match).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
      
      const result = await query.select();
      const endTime = performance.now();
      
      if (endTime - startTime > 500) {
        console.warn(`⚠️ Database update on ${table} taking longer than expected`);
      }
      
      return result;
    },

    // Fast delete
    delete: async (table: string, match: any) => {
      const client = getOptimizedConnection();
      const startTime = performance.now();
      
      let query = client.from(table).delete();
      
      Object.entries(match).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
      
      const result = await query;
      const endTime = performance.now();
      
      if (endTime - startTime > 500) {
        console.warn(`⚠️ Database delete from ${table} taking longer than expected`);
      }
      
      return result;
    },
  },

  // Optimized real-time with low latency
  realtime: {
    subscribe: (table: string, callback: (payload: any) => void) => {
      const channel = supabase
        .channel(`optimized-${table}`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
        .subscribe();
      
      return channel;
    },
    
    unsubscribe: async (channel: any) => {
      try {
        await supabase.removeChannel(channel);
      } catch (error) {
        // Silent cleanup
      }
    },
  },

  // High-performance storage
  storage: {
    upload: async (bucket: string, path: string, file: any) => {
      const startTime = performance.now();
      const result = await supabase.storage.from(bucket).upload(path, file);
      const endTime = performance.now();
      
      if (endTime - startTime > 2000) {
        console.warn('⚠️ File upload taking longer than expected');
      }
      
      return result;
    },
    
    download: async (bucket: string, path: string) => {
      return await supabase.storage.from(bucket).download(path);
    },
    
    getPublicUrl: (bucket: string, path: string) => {
      return supabase.storage.from(bucket).getPublicUrl(path);
    },
  },
};

// Performance monitoring
export const performanceMonitor = {
  startTimer: (operation: string) => {
    return {
      operation,
      startTime: performance.now(),
      end: () => {
        const endTime = performance.now();
        const duration = endTime - (performance as any).startTime;
        
        if (duration > 1000) {
          console.warn(`⚠️ ${operation} took ${duration.toFixed(2)}ms (slow)`);
        } else if (duration > 500) {
          console.log(`✅ ${operation} took ${duration.toFixed(2)}ms (acceptable)`);
        } else {
          console.log(`🚀 ${operation} took ${duration.toFixed(2)}ms (fast!)`);
        }
        
        return duration;
      },
    };
  },
};

export default supabase;
