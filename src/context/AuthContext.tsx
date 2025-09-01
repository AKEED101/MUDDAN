import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabase';

type AuthUser = {
  id: string;
  email?: string | null;
  phone?: string | null;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  needsOnboarding: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, needsOnboarding: false, signOut: async () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user;
      if (u) {
        setUser({ id: u.id, email: (u as any).email, phone: (u as any).phone });
        const { data: prof } = await supabase.from('user_profiles').select('id,name').eq('id', u.id).maybeSingle();
        setNeedsOnboarding(!prof || !prof.name);
      }
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user;
      setUser(u ? { id: u.id, email: (u as any).email, phone: (u as any).phone } : null);
      if (!u) setNeedsOnboarding(false);
      setLoading(false);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    needsOnboarding,
    signOut: async () => { await supabase.auth.signOut(); },
  }), [user, loading, needsOnboarding]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


