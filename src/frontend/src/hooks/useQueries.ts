import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Language, type Message, type Session, type KnowledgeItem, type ProcessStep, type LifeGuide } from '../backend';

export function useDisclaimer() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['disclaimer'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getDisclaimer();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCapabilities() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['capabilities'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getCapabilities();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLimitations() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['limitations'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getLimitations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLanguageModules(language: Language) {
  const { actor, isFetching } = useActor();

  return useQuery<[KnowledgeItem[], ProcessStep[], LifeGuide[]]>({
    queryKey: ['languageModules', language],
    queryFn: async () => {
      if (!actor) return [[], [], []];
      return actor.getLanguageModules(language);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllSessions() {
  const { actor, isFetching } = useActor();

  return useQuery<Session[]>({
    queryKey: ['sessions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSessions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSession(sessionId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Session | null>({
    queryKey: ['session', sessionId?.toString()],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getSession(sessionId);
    },
    enabled: !!actor && !isFetching && sessionId !== null,
  });
}

export function useCreateSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ language, context }: { language: Language; context: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createSession(language, context);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

export function useAddMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sessionId, message }: { sessionId: bigint; message: Message }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addMessage(sessionId, message);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['session', variables.sessionId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

export function useAllKnowledgeItems() {
  const { actor, isFetching } = useActor();

  return useQuery<KnowledgeItem[]>({
    queryKey: ['knowledgeItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllKnowledgeItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllProcessSteps() {
  const { actor, isFetching } = useActor();

  return useQuery<ProcessStep[]>({
    queryKey: ['processSteps'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProcessSteps();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllLifeGuides() {
  const { actor, isFetching } = useActor();

  return useQuery<LifeGuide[]>({
    queryKey: ['lifeGuides'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLifeGuides();
    },
    enabled: !!actor && !isFetching,
  });
}
