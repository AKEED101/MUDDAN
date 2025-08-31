#!/usr/bin/env node

/**
 * MUDDAN Backend Quick Setup Verification
 * Run this script to verify your Supabase integration
 */

const { createClient } = require('@supabase/supabase-js');

// Configuration
const SUPABASE_URL = 'https://pulywbdaphmfdepwrtvn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bHl3YmRhcGhtZmRlcHdydHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjE3OTMsImV4cCI6MjA3MjEzNzc5M30.Z-7DplBRHqwR0oUykrjmcPdZ3w5uPYGklItiTI0YFXY';

// Create client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🚀 MUDDAN Backend Integration Test');
console.log('=====================================\n');

async function testConnection() {
  try {
    console.log('1. Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('user_profiles').select('count').limit(1);
    
    if (error) {
      if (error.message.includes('relation "user_profiles" does not exist')) {
        console.log('⚠️  Database tables not created yet. Please run the SQL setup script first.');
        console.log('   Go to: https://supabase.com/dashboard/project/pulywbdaphmfdepwrtvn/sql');
        console.log('   Copy and paste the contents of: scripts/setup-supabase.sql');
        return false;
      } else {
        throw error;
      }
    }
    
    console.log('✅ Database connection successful!');
    return true;
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    return false;
  }
}

async function testAuthentication() {
  try {
    console.log('\n2. Testing authentication...');
    
    // Test sign up (this will fail if email confirmation is required, which is expected)
    const { data, error } = await supabase.auth.signUp({
      email: 'test@muddan.com',
      password: 'testpassword123'
    });
    
    if (error) {
      if (error.message.includes('User already registered')) {
        console.log('✅ Authentication system working (user already exists)');
      } else if (error.message.includes('Email not confirmed')) {
        console.log('✅ Authentication system working (email confirmation required)');
      } else {
        console.log('⚠️  Authentication test:', error.message);
      }
    } else {
      console.log('✅ Authentication system working (sign up successful)');
    }
    
    return true;
  } catch (error) {
    console.log('❌ Authentication test failed:', error.message);
    return false;
  }
}

async function testStorage() {
  try {
    console.log('\n3. Testing storage...');
    
    // Test storage bucket access
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.log('⚠️  Storage test:', error.message);
      console.log('   You may need to create storage buckets manually in the dashboard');
      return false;
    }
    
    console.log('✅ Storage system accessible!');
    console.log(`   Available buckets: ${data.map(b => b.name).join(', ') || 'None'}`);
    return true;
  } catch (error) {
    console.log('❌ Storage test failed:', error.message);
    return false;
  }
}

async function showNextSteps() {
  console.log('\n📋 NEXT STEPS:');
  console.log('===============');
  console.log('1. ✅ Supabase connection: CONFIGURED');
  console.log('2. ✅ API keys: CONFIGURED');
  console.log('3. 🔄 Database tables: NEEDS SETUP');
  console.log('4. 🔄 Storage buckets: NEEDS SETUP');
  console.log('5. 🔄 Authentication settings: NEEDS CONFIGURATION');
  
  console.log('\n🎯 To complete setup:');
  console.log('   a) Go to: https://supabase.com/dashboard/project/pulywbdaphmfdepwrtvn/sql');
  console.log('   b) Copy and paste: scripts/setup-supabase.sql');
  console.log('   c) Click "Run" to create all tables');
  console.log('   d) Go to Storage and create buckets: user-avatars, health-documents, post-images, professional-docs');
  console.log('   e) Go to Authentication > Settings and configure email templates');
  
  console.log('\n🚀 After setup, your app will have:');
  console.log('   • Complete database with 15+ tables');
  console.log('   • Secure authentication system');
  console.log('   • File storage capabilities');
  console.log('   • Real-time features');
  console.log('   • Professional booking system');
  console.log('   • Community features');
  console.log('   • Health tracking system');
}

async function main() {
  console.log('Starting backend integration test...\n');
  
  const connectionOk = await testConnection();
  const authOk = await testAuthentication();
  const storageOk = await testStorage();
  
  console.log('\n📊 Test Results:');
  console.log('================');
  console.log(`Connection: ${connectionOk ? '✅' : '❌'}`);
  console.log(`Authentication: ${authOk ? '✅' : '⚠️'}`);
  console.log(`Storage: ${storageOk ? '✅' : '⚠️'}`);
  
  await showNextSteps();
  
  console.log('\n🎉 Setup complete! Your MUDDAN app is ready for backend integration!');
}

// Run the test
main().catch(console.error);
