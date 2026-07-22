export type StepCategory = 'cameras' | 'plans' | 'sensors' | 'accessories';

export const STEPS = [
  { id: 1, label: 'Choose your cameras', nextLabel: 'Choose your plan', category: 'cameras' as StepCategory },
  { id: 2, label: 'Choose your plan', nextLabel: 'Choose your sensors', category: 'plans' as StepCategory },
  { id: 3, label: 'Choose your sensors', nextLabel: 'Add extra protection', category: 'sensors' as StepCategory },
  { id: 4, label: 'Add extra protection', nextLabel: '', category: null },
] as const;