import { Language } from '../backend';

export interface QuickStartOption {
  id: string;
  labelEn: string;
  labelHi: string;
  context: string;
  icon: string;
}

export const quickStartOptions: QuickStartOption[] = [
  {
    id: 'job-loss',
    labelEn: 'Job Loss',
    labelHi: 'नौकरी छूटना',
    context: 'Job Loss',
    icon: '💼',
  },
  {
    id: 'salary-issue',
    labelEn: 'Salary Issue',
    labelHi: 'वेतन समस्या',
    context: 'Salary Issue',
    icon: '💰',
  },
  {
    id: 'fraud',
    labelEn: 'Fraud / Scam',
    labelHi: 'धोखाधड़ी',
    context: 'Fraud',
    icon: '🚨',
  },
  {
    id: 'understand-law',
    labelEn: 'Understand a Law',
    labelHi: 'कानून समझें',
    context: 'RTI Act',
    icon: '⚖️',
  },
  {
    id: 'govt-process',
    labelEn: 'Government Process',
    labelHi: 'सरकारी प्रक्रिया',
    context: 'Aadhaar Enrollment',
    icon: '🏛️',
  },
];

export function getQuickStartLabel(option: QuickStartOption, language: Language): string {
  return language === Language.hi ? option.labelHi : option.labelEn;
}
