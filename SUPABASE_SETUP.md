# Supabase Integration Setup

This project has been configured with Supabase for backend services including authentication, database, and storage.

## Configuration

The Supabase configuration is located in:
- `src/services/supabase.ts` - Main Supabase client and service functions
- `src/config/supabase.config.ts` - Configuration constants

## Project Details

- **Project URL**: https://pulywbdaphmfdepwrtvn.supabase.co
- **API Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bHl3YmRhcGhtZmRlcHdydHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjE3OTMsImV4cCI6MjA3MjEzNzc5M30.Z-7DplBRHqwR0oUykrjmcPdZ3w5uPYGklItiTI0YFXY

## Features Available

### 1. Authentication
- User sign up/sign in
- Session management
- Auth state change listeners
- Automatic token refresh

### 2. Database Operations
- CRUD operations on tables
- Real-time subscriptions
- Row Level Security (RLS) support

### 3. Storage
- File upload/download
- Public URL generation
- Bucket management

## Usage Examples

### Basic Import
```typescript
import { supabase, supabaseService } from '../services';
```

### Authentication
```typescript
// Sign up
const { data, error } = await supabaseService.auth.signUp(email, password);

// Sign in
const { data, error } = await supabaseService.auth.signIn(email, password);

// Sign out
await supabaseService.auth.signOut();

// Get current user
const { data: { user } } = await supabaseService.auth.getCurrentUser();
```

### Database Operations
```typescript
// Select data
const { data, error } = await supabaseService.db.select('users', 'id, name, email');

// Insert data
const { data, error } = await supabaseService.db.insert('users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Update data
const { data, error } = await supabaseService.db.update('users', 
  { name: 'Jane Doe' }, 
  { id: 'user-id' }
);

// Delete data
const { data, error } = await supabaseService.db.delete('users', { id: 'user-id' });
```

### Storage Operations
```typescript
// Upload file
const { data, error } = await supabaseService.storage.upload(
  'avatars', 
  'user-avatar.jpg', 
  file
);

// Get public URL
const { data } = supabaseService.storage.getPublicUrl('avatars', 'user-avatar.jpg');
```

## Next Steps

### 1. Create Database Tables
You'll need to create tables in your Supabase dashboard. Example SQL:

```sql
-- Users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

### 2. Set Up Storage Buckets
In your Supabase dashboard:
1. Go to Storage
2. Create buckets for different file types (e.g., avatars, documents)
3. Set up appropriate policies

### 3. Configure Authentication
1. Go to Authentication > Settings
2. Configure email templates
3. Set up social providers if needed
4. Configure redirect URLs

### 4. Test the Integration
Use the `SupabaseExample` component to test:
- Authentication flow
- Database operations
- Error handling

## Security Notes

- The API key provided is the **anonymous key** and is safe to use in client-side code
- Row Level Security (RLS) should be enabled on all tables
- Create appropriate policies for data access control
- Never expose service role keys in client code

## Troubleshooting

### Common Issues

1. **Connection Errors**: Check your project URL and API key
2. **Authentication Errors**: Verify email confirmation is enabled
3. **Database Errors**: Ensure tables exist and RLS policies are correct
4. **Storage Errors**: Check bucket permissions and policies

### Debug Mode
Enable debug logging by adding this to your app:
```typescript
import { supabase } from '../services/supabase';
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event, session);
});
```

## Support

For Supabase-specific issues, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [React Native Integration Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)

## Example Component

See `src/components/SupabaseExample.tsx` for a complete working example of:
- User authentication
- Session management
- Database operations
- Error handling
- UI state management
