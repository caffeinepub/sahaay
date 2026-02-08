import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message } from '../backend';

export interface LocalSession {
  id: string;
  backendId: bigint | null;
  messages: Message[];
  context: string;
  createdAt: number;
  updatedAt: number;
}

interface SessionState {
  sessions: LocalSession[];
  currentSessionId: string | null;
  
  // Actions
  createSession: (context: string, backendId?: bigint) => string;
  setCurrentSession: (id: string | null) => void;
  addMessage: (sessionId: string, message: Message) => void;
  getCurrentSession: () => LocalSession | null;
  clearCurrentSession: () => void;
  initializeApp: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,

      createSession: (context: string, backendId?: bigint) => {
        const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newSession: LocalSession = {
          id,
          backendId: backendId ?? null,
          messages: [],
          context,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        
        set((state) => ({
          sessions: [...state.sessions, newSession],
          currentSessionId: id,
        }));
        
        return id;
      },

      setCurrentSession: (id) => set({ currentSessionId: id }),

      addMessage: (sessionId, message) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: [...session.messages, message],
                  updatedAt: Date.now(),
                }
              : session
          ),
        }));
      },

      getCurrentSession: () => {
        const state = get();
        return state.sessions.find((s) => s.id === state.currentSessionId) ?? null;
      },

      clearCurrentSession: () => {
        set({ currentSessionId: null });
      },

      initializeApp: () => {
        const state = get();
        if (state.sessions.length === 0) {
          // Create initial session
          const id = get().createSession('');
        }
      },
    }),
    {
      name: 'sahaay-sessions',
      version: 1,
    }
  )
);
