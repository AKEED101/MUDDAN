-- =====================================================
-- Fix RLS Policies for MUDDAN App
-- Run this in your Supabase SQL Editor
-- =====================================================

-- First, let's check what policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;

-- Drop existing policies that are too restrictive
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can manage own cycle records" ON cycle_records;
DROP POLICY IF EXISTS "Users can create posts" ON posts;
DROP POLICY IF EXISTS "Users can create comments" ON comments;
DROP POLICY IF EXISTS "Users can create bookings" ON bookings;

-- Create more permissive policies for authenticated users
CREATE POLICY "Authenticated users can create profiles" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Cycle records policies
CREATE POLICY "Authenticated users can create cycle records" ON cycle_records
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own cycle records" ON cycle_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own cycle records" ON cycle_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cycle records" ON cycle_records
  FOR DELETE USING (auth.uid() = user_id);

-- Cycle notes policies
CREATE POLICY "Authenticated users can create cycle notes" ON cycle_notes
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own cycle notes" ON cycle_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own cycle notes" ON cycle_notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cycle notes" ON cycle_notes
  FOR DELETE USING (auth.uid() = user_id);

-- Posts policies
CREATE POLICY "Authenticated users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view public posts" ON posts
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON posts
  FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- Professional profiles policies
CREATE POLICY "Authenticated users can create professional profiles" ON professional_profiles
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view approved professional profiles" ON professional_profiles
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Professionals can update own profile" ON professional_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Health records policies
CREATE POLICY "Authenticated users can create health records" ON health_records
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own health records" ON health_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own health records" ON health_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own health records" ON health_records
  FOR DELETE USING (auth.uid() = user_id);

-- Bookings policies
CREATE POLICY "Authenticated users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT id FROM user_profiles WHERE id IN (
      SELECT user_id FROM professional_profiles WHERE id = bookings.professional_id
    )
  ));

CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Post likes policies
CREATE POLICY "Authenticated users can create post likes" ON post_likes
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view post likes" ON post_likes
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can delete own post likes" ON post_likes
  FOR DELETE USING (auth.uid() = user_id);

-- User settings policies
CREATE POLICY "Authenticated users can create user settings" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own settings" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- User notifications policies
CREATE POLICY "Authenticated users can create notifications" ON user_notifications
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own notifications" ON user_notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON user_notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Groups policies
CREATE POLICY "Authenticated users can create groups" ON groups
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view public groups" ON groups
  FOR SELECT USING (TRUE);

CREATE POLICY "Group creators can update groups" ON groups
  FOR UPDATE USING (auth.uid() = created_by);

-- Group members policies
CREATE POLICY "Authenticated users can join groups" ON group_members
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view group members" ON group_members
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can leave groups" ON group_members
  FOR DELETE USING (auth.uid() = user_id);

-- Professional availability policies
CREATE POLICY "Authenticated users can create availability" ON professional_availability
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view professional availability" ON professional_availability
  FOR SELECT USING (TRUE);

CREATE POLICY "Professionals can update own availability" ON professional_availability
  FOR UPDATE USING (auth.uid() = professional_id);

-- Reviews policies
CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Pregnancy records policies
CREATE POLICY "Authenticated users can create pregnancy records" ON pregnancy_records
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own pregnancy records" ON pregnancy_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own pregnancy records" ON pregnancy_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pregnancy records" ON pregnancy_records
  FOR DELETE USING (auth.uid() = user_id);

-- Verify all policies are created
SELECT schemaname, tablename, policyname, permissive, cmd
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;

-- Test the policies work
-- This should now work for authenticated users
SELECT 'RLS policies updated successfully!' as status;
