-- =====================================================
-- Enable Real-time for MUDDAN App
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Step 1: Enable real-time for the posts table
ALTER PUBLICATION supabase_realtime ADD TABLE posts;
ALTER PUBLICATION supabase_realtime ADD TABLE comments;
ALTER PUBLICATION supabase_realtime ADD TABLE user_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE cycle_records;

-- Step 2: Create real-time policies
CREATE POLICY "Enable real-time access for authenticated users" ON posts
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable real-time access for authenticated users" ON comments
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable real-time access for authenticated users" ON user_profiles
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable real-time access for authenticated users" ON cycle_records
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Step 3: Verify real-time is enabled
SELECT 
  schemaname,
  tablename,
  pubname
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime'
ORDER BY tablename;

-- Step 4: Success message
SELECT '🚀 Real-time enabled for MUDDAN app!' as status;
SELECT '✅ Your app can now use real-time features' as message;
SELECT '🔄 Run the integration test again to verify' as next_step;
