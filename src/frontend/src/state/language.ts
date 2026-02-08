import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '../backend';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: Language.en,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'sahaay-language',
    }
  )
);
