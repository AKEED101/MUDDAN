import dayjs from 'dayjs';

export type Cycle = { 
  id?: string; 
  startDate: string; 
  cycleLength?: number; 
  periodLength?: number; 
};

export const getAvgCycleLength = (cs: Cycle[]) => { 
  const v = cs.map(c=>c.cycleLength).filter((n): n is number => !!n); 
  return v.length? Math.round(v.reduce((a,b)=>a+b,0)/v.length) : 28; 
};

export const getAvgPeriodLength = (cs: Cycle[]) => { 
  const v = cs.map(c=>c.periodLength).filter((n): n is number => !!n); 
  return v.length? Math.round(v.reduce((a,b)=>a+b,0)/v.length) : 5; 
};

export const getNextStart = (lastStartISO: string, avgLen: number) => dayjs(lastStartISO).add(avgLen, 'day');

export const getOvulation = (nextStart: dayjs.Dayjs) => nextStart.subtract(14, 'day');

export const getFertileWindow = (ovu: dayjs.Dayjs) => ({ 
  start: ovu.subtract(5, 'day'), 
  end: ovu 
});

export const daysUntil = (d: dayjs.Dayjs) => d.startOf('day').diff(dayjs().startOf('day'), 'day');

export const daysBetween = (aISO: string, bISO: string) => dayjs(bISO).startOf('day').diff(dayjs(aISO).startOf('day'), 'day');

export const inPeriod = (todayISO: string, startISO: string, periodLen?: number) => { 
  if(!periodLen) return { on: false, end: null }; 
  const end = dayjs(startISO).add(periodLen-1, 'day'); 
  const on = !dayjs(todayISO).isBefore(startISO, 'day') && !dayjs(todayISO).isAfter(end, 'day'); 
  return { on, end }; 
};

export function computeCycleState(cs: Cycle[]) { 
  const todayISO = dayjs().toISOString(); 
  const last = cs?.[0]; 
  if(!last) return null; 
  
  const avgCycleLen = getAvgCycleLength(cs); 
  const avgPeriodLen = getAvgPeriodLength(cs); 
  const lastStartISO = last.startDate; 
  const nextStart = getNextStart(lastStartISO, avgCycleLen); 
  const { on: onPeriod, end: periodEndDay } = inPeriod(todayISO, lastStartISO, last.periodLength ?? avgPeriodLen); 
  const dToPeriodEnd = periodEndDay ? daysUntil(periodEndDay) : null; 
  const dToNextStart = daysUntil(nextStart); 
  const ovu = getOvulation(nextStart); 
  const fw = getFertileWindow(ovu); 
  const dToFertileEnd = daysUntil(fw.end); 
  const dayOfCycle = dayjs().startOf('day').diff(dayjs(lastStartISO).startOf('day'), 'day') + 1; 
  
  return { 
    avgCycleLen, 
    avgPeriodLen, 
    lastStartISO, 
    nextStart, 
    onPeriod, 
    periodEndDay, 
    dToPeriodEnd, 
    dToNextStart, 
    ovulation: ovu, 
    fertileStart: fw.start, 
    fertileEnd: fw.end, 
    dToFertileEnd, 
    dayOfCycle 
  }; 
}
