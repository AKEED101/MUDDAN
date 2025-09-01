import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabase';

type Lang = 'en' | 'so';

const en = {
  consultants: 'Consultants',
  bookAppointment: 'Book Appointment',
  chatSupport: 'Chat Support',
  myConsultations: 'My Consultations',
};

const so = {
  consultants: 'La-taliyayaal',
  bookAppointment: 'Ballan Qaado',
  chatSupport: 'Soo Dhaweynta Chat',
  myConsultations: 'La-tashiyadayda',
};

const dict: Record<Lang, Record<string, string>> = { en, so };

type I18nCtx = { t: (k: keyof typeof en) => string; lang: Lang; setLang: (l: Lang) => void };
const I18nContext = createContext<I18nCtx>({ t: (k) => en[k], lang: 'en', setLang: () => {} });

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const uid = data.user?.id;
      if (!uid) return;
      const { data: prof } = await supabase.from('user_profiles').select('language').eq('id', uid).maybeSingle();
      if (prof?.language && (['en', 'so'] as Lang[]).includes(prof.language)) setLang(prof.language as Lang);
    })();
  }, []);

  const saveLang = async (l: Lang) => {
    setLang(l);
    const { data } = await supabase.auth.getUser();
    const uid = data.user?.id;
    if (uid) await supabase.from('user_profiles').update({ language: l }).eq('id', uid);
  };

  const value = useMemo(() => ({ lang, setLang: saveLang, t: (k: keyof typeof en) => dict[lang][k] }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);


