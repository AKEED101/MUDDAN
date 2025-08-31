// Supabase Configuration
export const SUPABASE_CONFIG = {
  // Project URL
  url: 'https://pulywbdaphmfdepwrtvn.supabase.co',
  
  // Anonymous API Key (public - safe for client)
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bHl3YmRhcGhtZmRlcHdydHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjE3OTMsImV4cCI6MjA3MjEzNzc5M30.Z-7DplBRHqwR0oUykrjmcPdZ3w5uPYGklItiTI0YFXY',
  
  // Service Role Key (admin - for server-side operations only)
  serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bHl3YmRhcGhtZmRlcHdydHZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU2MTc5MywiZXhwIjoyMDcyMTM3NzkzfQ.TnmZWhKBa-yEfhY4Lp3lVXNstS5NqHIqBQHcVCIwboQ',
  
  // Database settings
  db: {
    schema: 'public',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  
  // Storage settings
  storage: {
    autoRefreshToken: true,
  },
  
  // Auth settings
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
};

// Environment-specific configurations
export const getSupabaseConfig = () => {
  // You can add environment-specific logic here
  // For example, different keys for development vs production
  return SUPABASE_CONFIG;
};
