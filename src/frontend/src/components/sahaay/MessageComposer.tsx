import { useState, useRef, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSessionStore } from '../../state/sessions';
import { useLanguageStore } from '../../state/language';
import { useLanguageModules, useCreateSession, useAddMessage } from '../../hooks/useQueries';
import { generateContextualResponse } from '../../lib/guidance';
import { Language, type Message } from '../../backend';

export function MessageComposer() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { language } = useLanguageStore();
  const currentSession = useSessionStore((state) => state.getCurrentSession());
  const addMessage = useSessionStore((state) => state.addMessage);
  const createSession = useSessionStore((state) => state.createSession);
  
  const { data: modules } = useLanguageModules(language);
  const createSessionMutation = useCreateSession();
  const addMessageMutation = useAddMessage();

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      sender: 'user',
      text: input.trim(),
      timestamp: BigInt(Date.now() * 1_000_000),
    };

    setIsProcessing(true);
    setInput('');

    try {
      let sessionId = currentSession?.id;
      let backendId = currentSession?.backendId;

      // Create session if needed
      if (!currentSession) {
        const newBackendId = await createSessionMutation.mutateAsync({
          language,
          context: input.trim(),
        });
        sessionId = createSession(input.trim(), newBackendId);
        backendId = newBackendId;
      }

      if (!sessionId) return;

      // Add user message
      addMessage(sessionId, userMessage);

      // Add to backend if we have a backend ID
      if (backendId) {
        await addMessageMutation.mutateAsync({
          sessionId: backendId,
          message: userMessage,
        });
      }

      // Generate response
      const response = modules 
        ? generateContextualResponse(input.trim(), language, modules)
        : null;

      const assistantMessage: Message = {
        sender: 'assistant',
        text: response?.text || (language === Language.hi 
          ? 'मुझे खेद है, मुझे इस बारे में जानकारी नहीं मिली। कृपया अपना प्रश्न दोबारा पूछें या किसी अन्य विषय का चयन करें।'
          : 'I apologize, but I couldn\'t find information about that. Please rephrase your question or select another topic.'),
        timestamp: BigInt(Date.now() * 1_000_000),
      };

      addMessage(sessionId, assistantMessage);

      if (backendId) {
        await addMessageMutation.mutateAsync({
          sessionId: backendId,
          message: assistantMessage,
        });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative z-10 border-t border-border bg-card/80 p-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl gap-2">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={language === Language.hi ? 'अपना सवाल यहाँ टाइप करें...' : 'Type your question here...'}
          className="min-h-[60px] resize-none"
          disabled={isProcessing}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isProcessing}
          size="icon"
          className="h-[60px] w-[60px] shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
