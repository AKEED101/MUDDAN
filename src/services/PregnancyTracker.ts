import DataValidator from './DataValidator';

export interface PregnancyData {
  id: string;
  lmpDate: string;
  dueDate: string;
  currentWeek: number;
  trimester: number;
  remindersEnabled: boolean;
  notes: PregnancyNote[];
  milestones: PregnancyMilestone[];
  appointments: PregnancyAppointment[];
  symptoms: PregnancySymptom[];
}

export interface PregnancyNote {
  id: string;
  date: string;
  content: string;
  category: 'general' | 'symptom' | 'milestone' | 'question';
}

export interface PregnancyMilestone {
  id: string;
  week: number;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
}

export interface PregnancyAppointment {
  id: string;
  date: string;
  time: string;
  type: 'checkup' | 'ultrasound' | 'test' | 'consultation';
  notes: string;
  completed: boolean;
}

export interface PregnancySymptom {
  id: string;
  date: string;
  symptom: string;
  severity: 'mild' | 'moderate' | 'severe';
  notes: string;
}

export class PregnancyTracker {
  private static instance: PregnancyTracker;
  private dataValidator: DataValidator;
  private pregnancyData: PregnancyData | null = null;

  private constructor() {
    this.dataValidator = DataValidator.getInstance();
  }

  static getInstance(): PregnancyTracker {
    if (!PregnancyTracker.instance) {
      PregnancyTracker.instance = new PregnancyTracker();
    }
    return PregnancyTracker.instance;
  }

  // Initialize pregnancy tracking
  initializePregnancy(lmpDate: string, dueDate?: string): PregnancyData {
    const validation = this.dataValidator.validatePregnancyData({
      lmpDate,
      dueDate,
      currentWeek: 1,
      remindersEnabled: false
    });

    if (!validation.isValid) {
      throw new Error(`Invalid pregnancy data: ${validation.errors.join(', ')}`);
    }

    const currentWeek = this.calculateCurrentWeek(lmpDate);
    const trimester = this.calculateTrimester(currentWeek);

    this.pregnancyData = {
      id: this.generateId(),
      lmpDate,
      dueDate: dueDate || this.calculateDueDate(lmpDate),
      currentWeek,
      trimester,
      remindersEnabled: false,
      notes: [],
      milestones: this.generateDefaultMilestones(),
      appointments: [],
      symptoms: []
    };

    return this.pregnancyData;
  }

  // Calculate current pregnancy week
  calculateCurrentWeek(lmpDate: string): number {
    const lmp = new Date(lmpDate);
    const today = new Date();
    const diffTime = today.getTime() - lmp.getTime();
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(1, Math.min(42, diffWeeks));
  }

  // Calculate trimester
  calculateTrimester(week: number): number {
    if (week <= 12) return 1;
    if (week <= 26) return 2;
    return 3;
  }

  // Calculate due date from LMP
  calculateDueDate(lmpDate: string): string {
    const lmp = new Date(lmpDate);
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280); // 40 weeks = 280 days
    return dueDate.toISOString().split('T')[0];
  }

  // Get current pregnancy data
  getCurrentPregnancy(): PregnancyData | null {
    return this.pregnancyData;
  }

  // Update pregnancy data
  updatePregnancy(updates: Partial<PregnancyData>): PregnancyData {
    if (!this.pregnancyData) {
      throw new Error('No pregnancy data found. Please initialize first.');
    }

    const updatedData = { ...this.pregnancyData, ...updates };
    
    // Recalculate week and trimester if dates changed
    if (updates.lmpDate || updates.dueDate) {
      updatedData.currentWeek = this.calculateCurrentWeek(updatedData.lmpDate);
      updatedData.trimester = this.calculateTrimester(updatedData.currentWeek);
    }

    this.pregnancyData = updatedData;
    return this.pregnancyData;
  }

  // Add pregnancy note
  addNote(content: string, category: PregnancyNote['category']): PregnancyNote {
    if (!this.pregnancyData) {
      throw new Error('No pregnancy data found. Please initialize first.');
    }

    const note: PregnancyNote = {
      id: this.generateId(),
      date: new Date().toISOString().split('T')[0],
      content: this.dataValidator.sanitizeString(content),
      category
    };

    this.pregnancyData.notes.push(note);
    return note;
  }

  // Add pregnancy milestone
  addMilestone(week: number, title: string, description: string): PregnancyMilestone {
    if (!this.pregnancyData) {
      throw new Error('No pregnancy data found. Please initialize first.');
    }

    const milestone: PregnancyMilestone = {
      id: this.generateId(),
      week,
      title: this.dataValidator.sanitizeString(title),
      description: this.dataValidator.sanitizeString(description),
      completed: false
    };

    this.pregnancyData.milestones.push(milestone);
    return milestone;
  }

  // Add appointment
  addAppointment(date: string, time: string, type: PregnancyAppointment['type'], notes: string): PregnancyAppointment {
    if (!this.pregnancyData) {
      throw new Error('No pregnancy data found. Please initialize first.');
    }

    const appointment: PregnancyAppointment = {
      id: this.generateId(),
      date,
      time,
      type,
      notes: this.dataValidator.sanitizeString(notes),
      completed: false
    };

    this.pregnancyData.appointments.push(appointment);
    return appointment;
  }

  // Add symptom
  addSymptom(symptom: string, severity: PregnancySymptom['severity'], notes: string): PregnancySymptom {
    if (!this.pregnancyData) {
      throw new Error('No pregnancy data found. Please initialize first.');
    }

    const symptomRecord: PregnancySymptom = {
      id: this.generateId(),
      date: new Date().toISOString().split('T')[0],
      symptom: this.dataValidator.sanitizeString(symptom),
      severity,
      notes: this.dataValidator.sanitizeString(notes)
    };

    this.pregnancyData.symptoms.push(symptomRecord);
    return symptomRecord;
  }

  // Get week-specific information
  getWeekInfo(week: number) {
    const weekData = this.getWeekData(week);
    const milestones = this.pregnancyData?.milestones.filter(m => m.week === week) || [];
    const symptoms = this.pregnancyData?.symptoms.filter(s => s.date === new Date().toISOString().split('T')[0]) || [];

    return {
      week,
      trimester: this.calculateTrimester(week),
      ...weekData,
      milestones,
      symptoms
    };
  }

  // Get pregnancy progress
  getProgress() {
    if (!this.pregnancyData) return null;

    const totalWeeks = 40;
    const progress = (this.pregnancyData.currentWeek / totalWeeks) * 100;
    
    return {
      currentWeek: this.pregnancyData.currentWeek,
      totalWeeks,
      progress: Math.round(progress),
      trimester: this.pregnancyData.trimester,
      daysRemaining: this.getDaysRemaining()
    };
  }

  // Get days remaining until due date
  private getDaysRemaining(): number {
    if (!this.pregnancyData?.dueDate) return 0;
    
    const dueDate = new Date(this.pregnancyData.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Generate default milestones
  private generateDefaultMilestones(): PregnancyMilestone[] {
    return [
      {
        id: this.generateId(),
        week: 8,
        title: 'First Ultrasound',
        description: 'See your baby\'s heartbeat for the first time',
        completed: false
      },
      {
        id: this.generateId(),
        week: 12,
        title: 'End of First Trimester',
        description: 'Risk of miscarriage significantly decreases',
        completed: false
      },
      {
        id: this.generateId(),
        week: 20,
        title: 'Anatomy Scan',
        description: 'Detailed ultrasound to check baby\'s development',
        completed: false
      },
      {
        id: this.generateId(),
        week: 26,
        title: 'End of Second Trimester',
        description: 'Baby\'s major organs are fully developed',
        completed: false
      },
      {
        id: this.generateId(),
        week: 37,
        title: 'Full Term',
        description: 'Baby is considered full term and ready for birth',
        completed: false
      }
    ];
  }

  // Get week-specific data
  private getWeekData(week: number) {
    const weekData: Record<number, any> = {
      1: {
        title: 'Conception & Implantation',
        description: 'The fertilized egg implants in the uterine wall',
        size: 'Size of a poppy seed',
        development: 'Cell division begins, implantation occurs'
      },
      8: {
        title: 'Major Organs Forming',
        description: 'All major organs are beginning to form',
        size: 'Size of a raspberry',
        development: 'Heart starts beating, brain develops'
      },
      12: {
        title: 'First Trimester Complete',
        description: 'Risk of miscarriage decreases significantly',
        size: 'Size of a lime',
        development: 'All organs formed, gender can be determined'
      },
      20: {
        title: 'Halfway There!',
        description: 'Baby is fully formed and moving around',
        size: 'Size of a banana',
        development: 'Can hear sounds, developing sleep cycles'
      },
      26: {
        title: 'Second Trimester Complete',
        description: 'Baby\'s major organs are fully developed',
        size: 'Size of a head of lettuce',
        development: 'Eyes can open, responds to light and sound'
      },
      37: {
        title: 'Full Term',
        description: 'Baby is ready for birth',
        size: 'Size of a watermelon',
        development: 'Lungs are mature, baby can breathe independently'
      }
    };

    return weekData[week] || {
      title: `Week ${week}`,
      description: 'Your baby continues to grow and develop',
      size: 'Growing steadily',
      development: 'Development continues at a steady pace'
    };
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Export pregnancy data
  exportData(): string {
    if (!this.pregnancyData) {
      throw new Error('No pregnancy data to export');
    }
    
    return JSON.stringify(this.pregnancyData, null, 2);
  }

  // Import pregnancy data
  importData(data: string): PregnancyData {
    try {
      const importedData = JSON.parse(data);
      const validation = this.dataValidator.validatePregnancyData(importedData);
      
      if (!validation.isValid) {
        throw new Error(`Invalid data format: ${validation.errors.join(', ')}`);
      }
      
      this.pregnancyData = importedData;
      return this.pregnancyData!;
    } catch (error) {
      throw new Error(`Failed to import data: ${error}`);
    }
  }
}

export default PregnancyTracker;
