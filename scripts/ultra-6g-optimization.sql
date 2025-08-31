-- =====================================================
-- ULTRA 6G Database Optimization Script
-- Run this in your Supabase SQL Editor for maximum speed
-- =====================================================

-- Step 1: Create ultra-performance indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_user_profiles_email 
ON user_profiles(email) WITH (fillfactor = 100);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_user_profiles_id 
ON user_profiles(id) WITH (fillfactor = 100);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_cycle_records_user_id 
ON cycle_records(user_id) WITH (fillfactor = 100);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_cycle_records_date 
ON cycle_records(cycle_start_date) WITH (fillfactor = 100);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_posts_user_id 
ON posts(user_id) WITH (fillfactor = 100);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_posts_created_at 
ON posts(created_at) WITH (fillfactor = 100);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_comments_post_id 
ON comments(post_id) WITH (fillfactor = 100);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_health_records_user_id 
ON health_records(user_id) WITH (fillfactor = 100);

-- Step 2: Create composite indexes for ultra-fast queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_user_cycle_composite 
ON cycle_records(user_id, cycle_start_date) WITH (fillfactor = 100);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_post_comment_composite 
ON comments(post_id, created_at) WITH (fillfactor = 100);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_user_post_composite 
ON posts(user_id, created_at) WITH (fillfactor = 100);

-- Step 3: Create partial indexes for active data
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_active_users 
ON user_profiles(id) WHERE is_active = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_recent_posts 
ON posts(id) WHERE created_at > NOW() - INTERVAL '30 days';

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ultra_recent_cycles 
ON cycle_records(id) WHERE cycle_start_date > NOW() - INTERVAL '6 months';

-- Step 4: Optimize table settings for ultra performance
ALTER TABLE user_profiles SET (fillfactor = 100);
ALTER TABLE cycle_records SET (fillfactor = 100);
ALTER TABLE posts SET (fillfactor = 100);
ALTER TABLE comments SET (fillfactor = 100);
ALTER TABLE health_records SET (fillfactor = 100);
ALTER TABLE professional_profiles SET (fillfactor = 100);
ALTER TABLE bookings SET (fillfactor = 100);

-- Step 5: Create ultra-fast materialized views
CREATE MATERIALIZED VIEW IF NOT EXISTS ultra_user_summary AS
SELECT 
  up.id,
  up.email,
  up.name,
  COUNT(cr.id) as cycle_count,
  COUNT(p.id) as post_count,
  MAX(cr.cycle_start_date) as last_cycle_date
FROM user_profiles up
LEFT JOIN cycle_records cr ON up.id = cr.user_id
LEFT JOIN posts p ON up.id = p.user_id
GROUP BY up.id, up.email, up.name
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS idx_ultra_user_summary_id 
ON ultra_user_summary(id);

-- Step 6: Create ultra-performance functions
CREATE OR REPLACE FUNCTION ultra_fast_user_data(user_uuid UUID)
RETURNS TABLE(
  user_id UUID,
  email TEXT,
  name TEXT,
  cycle_count BIGINT,
  post_count BIGINT,
  last_cycle_date DATE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    up.id,
    up.email,
    up.name,
    COUNT(cr.id)::BIGINT as cycle_count,
    COUNT(p.id)::BIGINT as post_count,
    MAX(cr.cycle_start_date) as last_cycle_date
  FROM user_profiles up
  LEFT JOIN cycle_records cr ON up.id = cr.user_id
  LEFT JOIN posts p ON up.id = p.user_id
  WHERE up.id = user_uuid
  GROUP BY up.id, up.email, up.name;
END;
$$ LANGUAGE plpgsql STABLE;

-- Step 7: Create ultra-fast cycle analytics function
CREATE OR REPLACE FUNCTION ultra_fast_cycle_analytics(user_uuid UUID)
RETURNS TABLE(
  total_cycles BIGINT,
  avg_cycle_length NUMERIC,
  last_cycle_start DATE,
  next_cycle_estimate DATE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_cycles,
    AVG(cycle_length)::NUMERIC as avg_cycle_length,
    MAX(cycle_start_date) as last_cycle_start,
    MAX(cycle_start_date) + INTERVAL '28 days' as next_cycle_estimate
  FROM cycle_records
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql STABLE;

-- Step 8: Create ultra-performance triggers for real-time updates
CREATE OR REPLACE FUNCTION ultra_notify_changes()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'ultra_changes',
    json_build_object(
      'table', TG_TABLE_NAME,
      'type', TG_OP,
      'record_id', COALESCE(NEW.id, OLD.id)
    )::text
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply ultra-performance triggers
DROP TRIGGER IF EXISTS ultra_notify_user_profiles ON user_profiles;
CREATE TRIGGER ultra_notify_user_profiles
  AFTER INSERT OR UPDATE OR DELETE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION ultra_notify_changes();

DROP TRIGGER IF EXISTS ultra_notify_cycle_records ON cycle_records;
CREATE TRIGGER ultra_notify_cycle_records
  AFTER INSERT OR UPDATE OR DELETE ON cycle_records
  FOR EACH ROW EXECUTE FUNCTION ultra_notify_changes();

DROP TRIGGER IF EXISTS ultra_notify_posts ON posts;
CREATE TRIGGER ultra_notify_posts
  AFTER INSERT OR UPDATE OR DELETE ON posts
  FOR EACH ROW EXECUTE FUNCTION ultra_notify_changes();

-- Step 9: Optimize PostgreSQL settings for ultra performance
-- Note: These are suggestions - actual values depend on your Supabase plan
-- ALTER SYSTEM SET shared_buffers = '256MB';
-- ALTER SYSTEM SET effective_cache_size = '1GB';
-- ALTER SYSTEM SET work_mem = '4MB';
-- ALTER SYSTEM SET maintenance_work_mem = '64MB';
-- ALTER SYSTEM SET checkpoint_completion_target = 0.9;
-- ALTER SYSTEM SET wal_buffers = '16MB';
-- ALTER SYSTEM SET default_statistics_target = 100;

-- Step 10: Create ultra-performance views for common queries
CREATE OR REPLACE VIEW ultra_user_dashboard AS
SELECT 
  up.id,
  up.email,
  up.name,
  up.role,
  COUNT(DISTINCT cr.id) as total_cycles,
  COUNT(DISTINCT p.id) as total_posts,
  COUNT(DISTINCT c.id) as total_comments,
  MAX(cr.cycle_start_date) as last_cycle_date,
  MAX(p.created_at) as last_post_date
FROM user_profiles up
LEFT JOIN cycle_records cr ON up.id = cr.user_id
LEFT JOIN posts p ON up.id = p.user_id
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY up.id, up.email, up.name, up.role;

-- Step 11: Create ultra-fast search function
CREATE OR REPLACE FUNCTION ultra_fast_search(search_term TEXT)
RETURNS TABLE(
  result_type TEXT,
  result_id UUID,
  result_title TEXT,
  result_content TEXT,
  relevance_score NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'post'::TEXT as result_type,
    p.id::UUID as result_id,
    p.title::TEXT as result_title,
    p.content::TEXT as result_content,
    ts_rank(to_tsvector('english', p.title || ' ' || p.content), plainto_tsquery('english', search_term)) as relevance_score
  FROM posts p
  WHERE to_tsvector('english', p.title || ' ' || p.content) @@ plainto_tsquery('english', search_term)
  
  UNION ALL
  
  SELECT 
    'user'::TEXT as result_type,
    up.id::UUID as result_id,
    up.name::TEXT as result_title,
    up.email::TEXT as result_content,
    CASE 
      WHEN up.name ILIKE '%' || search_term || '%' THEN 0.8
      WHEN up.email ILIKE '%' || search_term || '%' THEN 0.6
      ELSE 0.4
    END as relevance_score
  FROM user_profiles up
  WHERE up.name ILIKE '%' || search_term || '%' OR up.email ILIKE '%' || search_term || '%'
  
  ORDER BY relevance_score DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- Step 12: Create ultra-performance statistics
ANALYZE user_profiles;
ANALYZE cycle_records;
ANALYZE posts;
ANALYZE comments;
ANALYZE health_records;
ANALYZE professional_profiles;
ANALYZE bookings;

-- Step 13: Success message
SELECT '🚀 ULTRA 6G Database Optimization Complete!' as status;
SELECT '✅ Your database is now optimized for lightning-fast performance!' as message;
SELECT '⚡ Ready for ULTRA 6G speed operations!' as next_step;
SELECT '🔥 Run the ULTRA 6G performance test to see the difference!' as final_step;
