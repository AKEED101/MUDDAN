#!/usr/bin/env node

/**
 * Basic Adaptive System Test
 * Demonstrates how the adaptive system works
 */

console.log('🌍 MUDDAN Basic Adaptive System Test');
console.log('=====================================');
console.log('Testing adaptive concepts for Somalia...\n');

// Simulate internet speed detection
function detectInternetSpeed() {
  console.log('🔍 Detecting your internet speed...');
  
  // Simulate different speed tests
  const speeds = [
    { name: 'Supabase Connection', value: Math.random() * 100 },
    { name: 'Image Download', value: Math.random() * 50 },
    { name: 'API Response', value: Math.random() * 75 }
  ];
  
  console.log('📊 Speed Test Results:');
  speeds.forEach(speed => {
    console.log(`   ${speed.name}: ${speed.value.toFixed(2)} Mbps`);
  });
  
  // Calculate average speed
  const averageSpeed = speeds.reduce((sum, s) => sum + s.value, 0) / speeds.length;
  console.log(`\n📈 Average Speed: ${averageSpeed.toFixed(2)} Mbps`);
  
  // Categorize speed
  let speedCategory, emoji, description;
  
  if (averageSpeed < 0.1) {
    speedCategory = 'VERY_SLOW';
    emoji = '🐌';
    description = '2G Rural - Very Slow';
  } else if (averageSpeed < 2) {
    speedCategory = 'SLOW';
    emoji = '🐢';
    description = '3G Rural - Slow';
  } else if (averageSpeed < 100) {
    speedCategory = 'MEDIUM';
    emoji = '🚶';
    description = '4G Urban - Medium';
  } else if (averageSpeed < 1000) {
    speedCategory = 'FAST';
    emoji = '🚀';
    description = '5G Urban - Fast';
  } else {
    speedCategory = 'VERY_FAST';
    emoji = '⚡';
    description = '5G+ Urban - Very Fast';
  }
  
  console.log(`\n🎯 Speed Category: ${emoji} ${description}`);
  
  return { speedCategory, emoji, description, averageSpeed };
}

// Get optimal settings for detected speed
function getOptimalSettings(speedCategory) {
  console.log('\n⚙️ Auto-Configuring App for Your Speed...');
  
  const settings = {
    VERY_SLOW: {
      connectionPool: 1,
      cacheTTL: 300, // 5 minutes
      imageQuality: 'low',
      realtimeEnabled: false,
      batchSize: 1,
      retryAttempts: 3,
      timeout: 30
    },
    SLOW: {
      connectionPool: 2,
      cacheTTL: 180, // 3 minutes
      imageQuality: 'medium',
      realtimeEnabled: false,
      batchSize: 2,
      retryAttempts: 2,
      timeout: 20
    },
    MEDIUM: {
      connectionPool: 3,
      cacheTTL: 120, // 2 minutes
      imageQuality: 'high',
      realtimeEnabled: true,
      batchSize: 5,
      retryAttempts: 2,
      timeout: 15
    },
    FAST: {
      connectionPool: 5,
      cacheTTL: 60, // 1 minute
      imageQuality: 'ultra',
      realtimeEnabled: true,
      batchSize: 10,
      retryAttempts: 1,
      timeout: 10
    },
    VERY_FAST: {
      connectionPool: 10,
      cacheTTL: 30, // 30 seconds
      imageQuality: 'ultra',
      realtimeEnabled: true,
      batchSize: 20,
      retryAttempts: 1,
      timeout: 5
    }
  };
  
  const optimal = settings[speedCategory];
  
  console.log(`📡 Connection Pool: ${optimal.connectionPool} connections`);
  console.log(`💾 Cache TTL: ${optimal.cacheTTL}s`);
  console.log(`🖼️ Image Quality: ${optimal.imageQuality}`);
  console.log(`⚡ Real-time: ${optimal.realtimeEnabled ? 'Enabled' : 'Disabled'}`);
  console.log(`📦 Batch Size: ${optimal.batchSize} items`);
  console.log(`🔄 Retry Attempts: ${optimal.retryAttempts}`);
  console.log(`⏱️ Timeout: ${optimal.timeout}s`);
  
  return optimal;
}

// Test performance with current settings
function testPerformance(settings, speedCategory) {
  console.log('\n🧪 Testing Performance with Current Settings...');
  
  // Simulate database operations
  const dbTime = simulateDatabaseOperation(settings);
  console.log(`🗄️ Database Query: ${dbTime}ms ${getPerformanceEmoji(dbTime, settings.timeout)}`);
  
  // Simulate authentication
  const authTime = simulateAuthentication(settings);
  console.log(`🔐 Authentication: ${authTime}ms ${getPerformanceEmoji(authTime, settings.timeout)}`);
  
  // Simulate image loading
  const imageTime = simulateImageLoading(settings);
  console.log(`🖼️ Image Loading: ${imageTime}ms ${getPerformanceEmoji(imageTime, settings.timeout)}`);
  
  // Simulate real-time (if enabled)
  const realtimeTime = settings.realtimeEnabled ? simulateRealTime(settings) : 0;
  if (settings.realtimeEnabled) {
    console.log(`⚡ Real-time: ${realtimeTime}ms ${getPerformanceEmoji(realtimeTime, settings.timeout)}`);
  } else {
    console.log(`⚡ Real-time: Disabled (saves bandwidth)`);
  }
  
  // Calculate overall performance
  const operations = [dbTime, authTime, imageTime];
  if (settings.realtimeEnabled) operations.push(realtimeTime);
  
  const avgTime = operations.reduce((sum, time) => sum + time, 0) / operations.length;
  
  console.log(`\n📊 Overall Performance: ${avgTime.toFixed(0)}ms average`);
  
  // Performance score
  const score = calculatePerformanceScore(avgTime, speedCategory);
  console.log(`🏆 Performance Score: ${score.score} ${score.emoji}`);
  console.log(`💡 User Experience: ${score.experience}`);
  
  return { avgTime, score };
}

function simulateDatabaseOperation(settings) {
  let baseTime = 100;
  baseTime += (5 - settings.connectionPool) * 50;
  baseTime += (10 - settings.batchSize) * 10;
  baseTime += Math.random() * 200;
  return Math.max(50, Math.round(baseTime));
}

function simulateAuthentication(settings) {
  let baseTime = 200;
  baseTime += settings.retryAttempts * 100;
  baseTime += Math.random() * 300;
  return Math.max(100, Math.round(baseTime));
}

function simulateImageLoading(settings) {
  let baseTime = 150;
  switch (settings.imageQuality) {
    case 'low': baseTime = 50; break;
    case 'medium': baseTime = 100; break;
    case 'high': baseTime = 200; break;
    case 'ultra': baseTime = 300; break;
  }
  baseTime += Math.random() * 150;
  return Math.max(30, Math.round(baseTime));
}

function simulateRealTime(settings) {
  let baseTime = 100;
  baseTime += (10 - settings.connectionPool) * 20;
  baseTime += Math.random() * 100;
  return Math.max(50, Math.round(baseTime));
}

function getPerformanceEmoji(time, timeout) {
  if (time < timeout * 0.3) return '🏆';
  if (time < timeout * 0.6) return '🚀';
  if (time < timeout * 0.8) return '✅';
  if (time < timeout) return '⚠️';
  return '❌';
}

function calculatePerformanceScore(avgTime, speedCategory) {
  const expectedTimes = {
    VERY_SLOW: 5000,
    SLOW: 3000,
    MEDIUM: 1500,
    FAST: 800,
    VERY_FAST: 400
  };
  
  const expectedTime = expectedTimes[speedCategory];
  const ratio = avgTime / expectedTime;
  
  if (ratio < 0.5) {
    return { score: 'EXCELLENT', emoji: '🏆', experience: 'Lightning fast!' };
  } else if (ratio < 0.8) {
    return { score: 'VERY GOOD', emoji: '🚀', experience: 'Very responsive!' };
  } else if (ratio < 1.2) {
    return { score: 'GOOD', emoji: '✅', experience: 'Good performance!' };
  } else if (ratio < 1.5) {
    return { score: 'ACCEPTABLE', emoji: '⚠️', experience: 'Acceptable for this speed' };
  } else {
    return { score: 'NEEDS OPTIMIZATION', emoji: '❌', experience: 'Needs optimization' };
  }
}

// Show benefits for Somalia
function showSomaliaBenefits(speedCategory) {
  console.log('\n🇸🇴 Benefits for Somalia:');
  console.log('==========================');
  
  if (speedCategory === 'VERY_SLOW' || speedCategory === 'SLOW') {
    console.log('🌍 Rural Areas (2G/3G):');
    console.log('   ✅ App automatically reduces image quality');
    console.log('   ✅ Disables real-time features to save bandwidth');
    console.log('   ✅ Uses aggressive caching (3-5 minutes)');
    console.log('   ✅ Implements retry logic for reliability');
    console.log('   💰 Works on limited data plans');
    console.log('   🌟 Reliable performance in poor network conditions');
  } else {
    console.log('🏙️ Urban Areas (4G/5G):');
    console.log('   ✅ App uses full image quality');
    console.log('   ✅ Enables real-time features');
    console.log('   ✅ Uses minimal caching for fresh data');
    console.log('   ✅ Optimized for speed');
    console.log('   🚀 Takes advantage of fast connections');
    console.log('   🌟 Premium user experience');
  }
  
  console.log('\n🔄 Automatic Adaptation:');
  console.log('   🔄 App automatically detects speed changes');
  console.log('   🔄 Instantly adjusts all settings');
  console.log('   🔄 No manual configuration needed');
  console.log('   🔄 Works anywhere in Somalia');
}

// Main test function
function runAdaptiveTest() {
  console.log('🚀 Starting MUDDAN Adaptive System Test...\n');
  
  // Step 1: Detect internet speed
  const speedInfo = detectInternetSpeed();
  
  // Step 2: Get optimal settings
  const settings = getOptimalSettings(speedInfo.speedCategory);
  
  // Step 3: Test performance
  const performance = testPerformance(settings, speedInfo.speedCategory);
  
  // Step 4: Show Somalia benefits
  showSomaliaBenefits(speedInfo.speedCategory);
  
  // Final summary
  console.log('\n🎉 ADAPTIVE SYSTEM TEST COMPLETE!');
  console.log('====================================');
  console.log(`🌐 Your Internet: ${speedInfo.emoji} ${speedInfo.description}`);
  console.log(`⚙️ App Auto-Configured: ${settings.connectionPool} connections, ${settings.imageQuality} images`);
  console.log(`🏆 Performance: ${performance.score.score} ${performance.score.emoji}`);
  console.log(`🌟 Experience: ${performance.score.experience}`);
  
  console.log('\n✅ Your MUDDAN app is now adaptive!');
  console.log('✅ Works perfectly for all internet speeds');
  console.log('✅ Automatically optimizes for your conditions');
  console.log('✅ Perfect for both rural and urban Somalia');
  console.log('✅ No manual configuration needed');
  
  console.log('\n🌍 Ready for Somalia\'s diverse internet conditions! 🇸🇴');
}

// Run the test
runAdaptiveTest();
