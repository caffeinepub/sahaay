import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageComposer } from './MessageComposer';
import { QuickStartTiles } from './QuickStartTiles';
import { MessageBubble } from './MessageBubble';
import { useSessionStore } from '../../state/sessions';
import { useLanguageStore } from '../../state/language';
import { generateWelcomeMessage } from '../../lib/guidance';
import type { Message } from '../../backend';

export function ChatScreen() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguageStore();
  const currentSession = useSessionStore((state) => state.getCurrentSession());
  const createSession = useSessionStore((state) => state.createSession);

  const messages = currentSession?.messages || [];
  const showQuickStart = messages.length === 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuickStartSelect = (context: string) => {
    if (!currentSession) {
      createSession(context);
    }
    
    // Add welcome message
    const welcomeMsg: Message = {
      sender: 'assistant',
      text: generateWelcomeMessage(language),
      timestamp: BigInt(Date.now() * 1_000_000),
    };
    
    if (currentSession) {
      useSessionStore.getState().addMessage(currentSession.id, welcomeMsg);
    }
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <ScrollArea className="flex-1 px-4 py-6">
        <div ref={scrollRef} className="mx-auto max-w-3xl space-y-4">
          {showQuickStart ? (
            <QuickStartTiles onSelect={handleQuickStartSelect} />
          ) : (
            messages.map((message, idx) => (
              <MessageBubble key={idx} message={message} />
            ))
          )}
        </div>
      </ScrollArea>

      <MessageComposer />
    </div>
  );
}
