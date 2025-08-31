import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Adaptive Supabase configuration for all internet conditions
const SUPABASE_URL = 'https://pulywbdaphmfdepwrtvn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bHl3YmRhcGhtZmRlcHdydHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjE3OTMsImV4cCI6MjA3MjEzNzc5M30.Z-7DplBRHqwR0oUykrjmcPdZ3w5uPYGklItiTI0YFXY';

// Internet speed detection and classification
export enum InternetSpeed {
  VERY_SLOW = 'very_slow',    // 2G: <100kbps
  SLOW = 'slow',              // 3G: 100kbps - 2Mbps
  MEDIUM = 'medium',          // 4G: 2Mbps - 100Mbps
  FAST = 'fast',              // 5G: 100Mbps - 1Gbps
  VERY_FAST = 'very_fast'     // 5G+: >1Gbps
}

// Speed thresholds (in Mbps)
const SPEED_THRESHOLDS = {
  [InternetSpeed.VERY_SLOW]: 0.1,    // <100kbps
  [InternetSpeed.SLOW]: 2,           // <2Mbps
  [InternetSpeed.MEDIUM]: 100,       // <100Mbps
  [InternetSpeed.FAST]: 1000,        // <1Gbps
  [InternetSpeed.VERY_FAST]: Infinity // >1Gbps
};

// Internet speed detector
export class InternetSpeedDetector {
  private static instance: InternetSpeedDetector;
  private currentSpeed: InternetSpeed = InternetSpeed.MEDIUM;
  private speedHistory: number[] = [];
  private lastCheck: number = 0;
  private readonly CHECK_INTERVAL = 30000; // Check every 30 seconds

  static getInstance(): InternetSpeedDetector {
    if (!InternetSpeedDetector.instance) {
      InternetSpeedDetector.instance = new InternetSpeedDetector();
    }
    return InternetSpeedDetector.instance;
  }

  // Detect internet speed using multiple methods
  async detectSpeed(): Promise<InternetSpeed> {
    const now = Date.now();
    
    // Only check if enough time has passed
    if (now - this.lastCheck < this.CHECK_INTERVAL) {
      return this.currentSpeed;
    }

    try {
      // Method 1: Supabase connection speed test
      const supabaseSpeed = await this.testSupabaseSpeed();
      
      // Method 2: Image download speed test
      const imageSpeed = await this.testImageDownloadSpeed();
      
      // Method 3: API response time test
      const apiSpeed = await this.testAPISpeed();
      
      // Calculate average speed
      const speeds = [supabaseSpeed, imageSpeed, apiSpeed].filter(s => s > 0);
      const averageSpeed = speeds.length > 0 ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
      
      // Update speed history
      this.speedHistory.push(averageSpeed);
      if (this.speedHistory.length > 10) {
        this.speedHistory.shift();
      }
      
      // Determine speed category
      this.currentSpeed = this.categorizeSpeed(averageSpeed);
      this.lastCheck = now;
      
      console.log(`🌐 Internet Speed Detected: ${this.currentSpeed} (${averageSpeed.toFixed(2)} Mbps)`);
      
      return this.currentSpeed;
    } catch (error) {
      console.warn('⚠️ Speed detection failed, using default:', error.message);
      return this.currentSpeed;
    }
  }

  private async testSupabaseSpeed(): Promise<number> {
    const startTime = performance.now();
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        method: 'HEAD',
        headers: { 'apikey': SUPABASE_ANON_KEY }
      });
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      // Convert response time to approximate speed (rough estimation)
      // Lower response time = higher speed
      return Math.max(0, 100 - responseTime / 10);
    } catch {
      return 0;
    }
  }

  private async testImageDownloadSpeed(): Promise<number> {
    const startTime = performance.now();
    try {
      // Use a small test image
      const response = await fetch('https://via.placeholder.com/1x1.png');
      const blob = await response.blob();
      const endTime = performance.now();
      
      const duration = endTime - startTime;
      const sizeInBits = blob.size * 8;
      const speedInMbps = (sizeInBits / 1000000) / (duration / 1000);
      
      return speedInMbps;
    } catch {
      return 0;
    }
  }

  private async testAPISpeed(): Promise<number> {
    const startTime = performance.now();
    try {
      const response = await fetch('https://httpbin.org/delay/0');
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      // Convert response time to approximate speed
      return Math.max(0, 50 - responseTime / 20);
    } catch {
      return 0;
    }
  }

  private categorizeSpeed(speedMbps: number): InternetSpeed {
    if (speedMbps < SPEED_THRESHOLDS[InternetSpeed.VERY_SLOW]) return InternetSpeed.VERY_SLOW;
    if (speedMbps < SPEED_THRESHOLDS[InternetSpeed.SLOW]) return InternetSpeed.SLOW;
    if (speedMbps < SPEED_THRESHOLDS[InternetSpeed.MEDIUM]) return InternetSpeed.MEDIUM;
    if (speedMbps < SPEED_THRESHOLDS[InternetSpeed.FAST]) return InternetSpeed.FAST;
    return InternetSpeed.VERY_FAST;
  }

  getCurrentSpeed(): InternetSpeed {
    return this.currentSpeed;
  }

  getSpeedHistory(): number[] {
    return [...this.speedHistory];
  }

  // Get recommended settings for current speed
  getRecommendedSettings() {
    switch (this.currentSpeed) {
      case InternetSpeed.VERY_SLOW:
        return {
          connectionPoolSize: 1,
          cacheTTL: 300000, // 5 minutes
          imageQuality: 'low',
          realtimeEnabled: false,
          batchSize: 1,
          retryAttempts: 3,
          timeout: 30000
        };
      
      case InternetSpeed.SLOW:
        return {
          connectionPoolSize: 2,
          cacheTTL: 180000, // 3 minutes
          imageQuality: 'medium',
          realtimeEnabled: false,
          batchSize: 2,
          retryAttempts: 2,
          timeout: 20000
        };
      
      case InternetSpeed.MEDIUM:
        return {
          connectionPoolSize: 3,
          cacheTTL: 120000, // 2 minutes
          imageQuality: 'high',
          realtimeEnabled: true,
          batchSize: 5,
          retryAttempts: 2,
          timeout: 15000
        };
      
      case InternetSpeed.FAST:
        return {
          connectionPoolSize: 5,
          cacheTTL: 60000, // 1 minute
          imageQuality: 'ultra',
          realtimeEnabled: true,
          batchSize: 10,
          retryAttempts: 1,
          timeout: 10000
        };
      
      case InternetSpeed.VERY_FAST:
        return {
          connectionPoolSize: 10,
          cacheTTL: 30000, // 30 seconds
          imageQuality: 'ultra',
          realtimeEnabled: true,
          batchSize: 20,
          retryAttempts: 1,
          timeout: 5000
        };
      
      default:
        return {
          connectionPoolSize: 3,
          cacheTTL: 120000,
          imageQuality: 'high',
          realtimeEnabled: true,
          batchSize: 5,
          retryAttempts: 2,
          timeout: 15000
        };
    }
  }
}

// Adaptive Supabase client factory
export class AdaptiveSupabaseClient {
  private static clients: Map<InternetSpeed, SupabaseClient> = new Map();
  private speedDetector: InternetSpeedDetector;

  constructor() {
    this.speedDetector = InternetSpeedDetector.getInstance();
  }

  // Get optimized client for current internet speed
  async getClient(): Promise<SupabaseClient> {
    const currentSpeed = await this.speedDetector.detectSpeed();
    
    if (!AdaptiveSupabaseClient.clients.has(currentSpeed)) {
      const settings = this.speedDetector.getRecommendedSettings();
      const client = this.createOptimizedClient(currentSpeed, settings);
      AdaptiveSupabaseClient.clients.set(currentSpeed, client);
    }
    
    return AdaptiveSupabaseClient.clients.get(currentSpeed)!;
  }

  private createOptimizedClient(speed: InternetSpeed, settings: any): SupabaseClient {
    const config = {
      url: SUPABASE_URL,
      anonKey: SUPABASE_ANON_KEY,
      db: {
        schema: 'public',
        autoRefreshToken: speed !== InternetSpeed.VERY_SLOW,
        persistSession: speed !== InternetSpeed.VERY_SLOW,
        detectSessionInUrl: false,
      },
      auth: {
        autoRefreshToken: speed !== InternetSpeed.VERY_SLOW,
        persistSession: speed !== InternetSpeed.VERY_SLOW,
        detectSessionInUrl: false,
        flowType: 'pkce',
      },
      global: {
        headers: {
          'X-Client-Info': `muddan-adaptive-${speed}`,
          'X-Internet-Speed': speed,
          'X-Connection-Pool': settings.connectionPoolSize.toString(),
        },
      },
      realtime: {
        params: {
          eventsPerSecond: speed === InternetSpeed.VERY_FAST ? 100 : 
                          speed === InternetSpeed.FAST ? 50 :
                          speed === InternetSpeed.MEDIUM ? 20 : 5,
          heartbeatIntervalMs: speed === InternetSpeed.VERY_FAST ? 200 :
                               speed === InternetSpeed.FAST ? 500 :
                               speed === InternetSpeed.MEDIUM ? 1000 : 5000,
        },
      },
    };

    return createClient(config.url, config.anonKey, config);
  }
}

// Adaptive service layer
export class AdaptiveSupabaseService {
  private adaptiveClient: AdaptiveSupabaseClient;
  private speedDetector: InternetSpeedDetector;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  constructor() {
    this.adaptiveClient = new AdaptiveSupabaseClient();
    this.speedDetector = InternetSpeedDetector.getInstance();
  }

  // Adaptive database operations
  async select(table: string, columns: string = '*', filters?: any) {
    const client = await this.adaptiveClient.getClient();
    const settings = this.speedDetector.getRecommendedSettings();
    
    // Check cache first for slow connections
    const cacheKey = `select_${table}_${columns}_${JSON.stringify(filters)}`;
    const cached = this.getCachedData(cacheKey, settings.cacheTTL);
    if (cached) {
      console.log(`🔥 Cache hit for ${table} (${this.speedDetector.getCurrentSpeed()})`);
      return cached;
    }

    const startTime = performance.now();
    
    try {
      let query = client.from(table).select(columns);
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }
      
      // Limit batch size for slow connections
      if (settings.batchSize > 1) {
        query = query.limit(settings.batchSize);
      }
      
      const result = await query;
      const endTime = performance.now();
      
      // Cache the result
      this.setCachedData(cacheKey, result, settings.cacheTTL);
      
      // Log performance based on speed
      this.logPerformance('select', endTime - startTime, this.speedDetector.getCurrentSpeed());
      
      return result;
    } catch (error) {
      // Retry logic for slow connections
      if (settings.retryAttempts > 1) {
        return this.retryOperation(() => this.select(table, columns, filters), settings.retryAttempts);
      }
      throw error;
    }
  }

  // Adaptive authentication
  async signIn(email: string, password: string) {
    const client = await this.adaptiveClient.getClient();
    const settings = this.speedDetector.getRecommendedSettings();
    
    const startTime = performance.now();
    
    try {
      const result = await client.auth.signInWithPassword({ email, password });
      const endTime = performance.now();
      
      this.logPerformance('signIn', endTime - startTime, this.speedDetector.getCurrentSpeed());
      
      return result;
    } catch (error) {
      if (settings.retryAttempts > 1) {
        return this.retryOperation(() => this.signIn(email, password), settings.retryAttempts);
      }
      throw error;
    }
  }

  // Adaptive real-time subscription
  async subscribe(table: string, callback: (payload: any) => void) {
    const client = await this.adaptiveClient.getClient();
    const settings = this.speedDetector.getRecommendedSettings();
    
    // Disable real-time for very slow connections
    if (!settings.realtimeEnabled) {
      console.log(`⚠️ Real-time disabled for ${this.speedDetector.getCurrentSpeed()} connection`);
      return null;
    }
    
    const channel = client
      .channel(`adaptive-${table}-${Date.now()}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe();
    
    return channel;
  }

  // Adaptive image handling
  async getOptimizedImageUrl(bucket: string, path: string, quality: string = 'auto') {
    const client = await this.adaptiveClient.getClient();
    const currentSpeed = this.speedDetector.getCurrentSpeed();
    
    // Auto-determine quality based on connection speed
    if (quality === 'auto') {
      switch (currentSpeed) {
        case InternetSpeed.VERY_SLOW:
          quality = 'low';
          break;
        case InternetSpeed.SLOW:
          quality = 'medium';
          break;
        case InternetSpeed.MEDIUM:
          quality = 'high';
          break;
        default:
          quality = 'ultra';
      }
    }
    
    // Get base URL and add quality parameters
    const baseUrl = client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    
    // Add quality parameters for image optimization
    if (quality === 'low') {
      return `${baseUrl}?quality=30&width=300`;
    } else if (quality === 'medium') {
      return `${baseUrl}?quality=60&width=600`;
    } else if (quality === 'high') {
      return `${baseUrl}?quality=80&width=900`;
    } else {
      return baseUrl; // Original quality
    }
  }

  // Cache management
  private getCachedData(key: string, ttl: number): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  // Retry logic for slow connections
  private async retryOperation<T>(operation: () => Promise<T>, attempts: number): Promise<T> {
    for (let i = 0; i < attempts; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === attempts - 1) throw error;
        
        // Exponential backoff
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error('Max retry attempts reached');
  }

  // Performance logging
  private logPerformance(operation: string, duration: number, speed: InternetSpeed): void {
    const speedEmoji = {
      [InternetSpeed.VERY_SLOW]: '🐌',
      [InternetSpeed.SLOW]: '🐢',
      [InternetSpeed.MEDIUM]: '🚶',
      [InternetSpeed.FAST]: '🚀',
      [InternetSpeed.VERY_FAST]: '⚡'
    };

    if (duration > 5000) {
      console.warn(`${speedEmoji[speed]} ${operation} took ${duration.toFixed(0)}ms (${speed})`);
    } else if (duration > 2000) {
      console.log(`✅ ${operation} took ${duration.toFixed(0)}ms (${speed})`);
    } else {
      console.log(`🚀 ${operation} took ${duration.toFixed(0)}ms (${speed})`);
    }
  }

  // Get current performance status
  getPerformanceStatus() {
    const currentSpeed = this.speedDetector.getCurrentSpeed();
    const settings = this.speedDetector.getRecommendedSettings();
    
    return {
      currentSpeed,
      settings,
      cacheSize: this.cache.size,
      speedHistory: this.speedDetector.getSpeedHistory()
    };
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

// Export the adaptive service
export const adaptiveSupabaseService = new AdaptiveSupabaseService();
export default adaptiveSupabaseService;
