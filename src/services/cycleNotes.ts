export type CycleNote = {
  id?: string;
  userId: string;
  cycleId: string | null;
  dateISO: string;
  source: 'calendar' | 'notes' | 'tracker' | 'manual';
  text: string;
  createdAt: Date;
};

// Mock storage for demonstration
const mockNotes: CycleNote[] = [];

export async function addCycleNote(
  userId: string,
  cycleId: string | null,
  dateISO: string,
  source: CycleNote['source'],
  text: string
) {
  const noteData: Omit<CycleNote, 'id' | 'createdAt'> = {
    userId,
    cycleId,
    dateISO,
    source,
    text,
  };

  const newNote: CycleNote = {
    ...noteData,
    id: Date.now().toString(),
    createdAt: new Date(),
  };

  mockNotes.unshift(newNote);
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return newNote.id;
}

export async function listCycleNotes(userId: string, limit = 50) {
  // Filter notes by user ID (in real app this would be a Firestore query)
  const userNotes = mockNotes.filter(note => note.userId === userId);
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return userNotes.slice(0, limit);
}
