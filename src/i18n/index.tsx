import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabase';

type Lang = 'en' | 'so';

const en = {
  home: 'Home',
  community: 'Community',
  consultant: 'Consultant',
  profile: 'Profile',
  settings: 'Settings',
  language: 'Language',
  consultants: 'Consultants',
  expertPros: 'Expert healthcare professionals',
  bookAppointment: 'Book Appointment',
  chatSupport: 'Chat Support',
  myConsultations: 'My Consultations',
  chooseMethod: 'Choose a method',
  confirmPayment: 'Confirm Payment',
  weekOverview: 'Week Overview',
  babyDevelopment: 'Baby Development',
  healthTips: 'Health Tips',
  appointments: 'Appointments',
  viewWeek: 'View Week',
  learnMore: 'Learn More',
  getTips: 'Get Tips',
  schedule: 'Schedule',
  trackLearn: 'Track & Learn',
  weeklyMilestones: 'Weekly Milestones',
  quickActions: 'Quick Actions',
  logSymptoms: 'Log Symptoms',
  week: 'Week',
  babySize: 'Baby Size',
  length: 'Length',
  weight: 'Weight',
  cycleTracker: 'Cycle Tracker',
  trackJourney: 'Track your health journey',
  currentCycle: 'Current Cycle',
  quickActions: 'Quick Actions',
  calendar: 'Calendar',
  insightsTitle: 'Insights',
  features: 'Features',
  cycleTracking: 'Cycle Tracking',
  cycleNotes: 'Cycle Notes',
  recordsHistory: 'Records & History',
  logPeriod: 'Log Period',
  thisMonth: 'This Month',
  predictions: 'Predictions',
  recentLogs: 'Recent Logs',
  noLogs: 'No recent logs yet',
  calendarSettings: 'Calendar Settings',
  calendarView: 'Calendar View',
  comingSoon: 'Coming soon!',
  exportToPDF: 'Export to PDF',
  summaryNote: 'Summary Note',
  nextPeriod: 'Next period',
  addNewNote: 'Add New Note',
  quickNotes: 'Quick Notes',
  allNotes: 'All Notes',
  noNotes: 'No notes yet',
  flowIntensity: 'Flow Intensity',
  light: 'Light',
  medium: 'Medium',
  heavy: 'Heavy',
  symptoms: 'Symptoms',
  additionalNotes: 'Additional Notes',
  community: 'Community',
  connectWomen: 'Connect with other women',
  popularGroups: 'Popular Groups',
  seeAll: 'See All',
  recentPosts: 'Recent Posts',
  createPost: 'Create Post',
  createNewPost: 'Create New Post',
  viewGroup: 'View Group',
  joinGroup: 'Join Group',
};

const so = {
  home: 'Bogga Hore',
  community: 'Bulshada',
  consultant: 'La-taliye',
  profile: 'Profile',
  settings: 'Dejinta',
  language: 'Luuqad',
  consultants: 'La-taliyayaal',
  expertPros: 'Khabiirro caafimaad oo khibrad leh',
  bookAppointment: 'Ballan samee',
  chatSupport: 'Taageero wada sheekeysi',
  myConsultations: 'La-tashiyadayda',
  chooseMethod: 'Dooro hab',
  confirmPayment: 'Xaqiiji bixinta',
  weekOverview: 'Isbeddelka toddobaadka',
  babyDevelopment: 'Kobaca ilmaha',
  healthTips: 'Talooyin caafimaad',
  appointments: 'Ballamo',
  viewWeek: 'Eeg toddobaadka',
  learnMore: 'Wax badan baro',
  getTips: 'Hel talooyin',
  schedule: 'Jadwal u samee',
  trackLearn: 'Raac oo baro',
  weeklyMilestones: 'Horumarka toddobaadlaha',
  quickActions: 'Tallaabooyin degdeg ah',
  logSymptoms: 'Calaamado qor',
  week: 'Toddobaad',
  babySize: 'Cabbirka ilmaha',
  length: 'Dherer',
  weight: 'Miisaan',
  cycleTracker: 'Raadraaca wareegga',
  trackJourney: 'Kormeeri safarkaaga caafimaad',
  currentCycle: 'Wareegga hadda',
  quickActions: 'Tallaabooyin degdeg ah',
  calendar: 'Kalandar',
  insightsTitle: 'Falanqayn',
  features: 'Astaamo',
  cycleTracking: 'Raadraaca wareegga',
  cycleNotes: 'Qoraallada wareegga',
  recordsHistory: 'Diiwaanno & Taariikh',
  logPeriod: 'Qor caadada',
  thisMonth: 'Bishan',
  predictions: 'Saadaal',
  recentLogs: 'Qoraallo dhowaan',
  noLogs: 'Qoraallo dhawaan ma jiraan',
  calendarSettings: 'Dejinta Kalandarka',
  calendarView: 'Muuqaalka Kalandarka',
  comingSoon: 'Waa soo socotaa!',
  exportToPDF: 'Soo saar PDF',
  summaryNote: 'Qoraal kooban',
  nextPeriod: 'Caadada xigta',
  addNewNote: 'Ku dar qoraal cusub',
  quickNotes: 'Qoraallo degdeg ah',
  allNotes: 'Dhammaan qoraallada',
  noNotes: 'Weli qoraallo ma jiraan',
  flowIntensity: 'Xoogga qulqulka',
  light: 'Fudud',
  medium: 'Dhexdhexaad',
  heavy: 'Culus',
  symptoms: 'Calaamado',
  additionalNotes: 'Qoraallo dheeraad ah',
  community: 'Bulshada',
  connectWomen: 'Ku xidhxo dumarka kale',
  popularGroups: 'Kooxo caan ah',
  seeAll: 'Dhammaan eeg',
  recentPosts: 'Qoraallo dhawaan',
  createPost: 'Qor qoraal',
  createNewPost: 'Qor qoraal cusub',
  viewGroup: 'Eeg kooxda',
  joinGroup: 'Ku biir kooxda',
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


