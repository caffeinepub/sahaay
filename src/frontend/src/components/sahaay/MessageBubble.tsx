import { useMemo } from 'react';
import { User, Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SourcesBlock } from './SourcesBlock';
import { SafetyNote } from './SafetyNote';
import { Language, type Message } from '../../backend';
import { isSensitiveSituation } from '../../lib/safety';
import { useLanguageStore } from '../../state/language';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { language } = useLanguageStore();
  const isUser = message.sender === 'user';
  const showSafety = !isUser && isSensitiveSituation(message.text);

  // Parse sources from message text if present (simple implementation)
  const sources = useMemo(() => {
    // This is a placeholder - in a real implementation, sources would be structured data
    return undefined;
  }, [message.text]);

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={`flex-1 space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border'
          }`}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.text}
          </div>
        </div>

        {!isUser && sources && <SourcesBlock sources={sources} />}
        {showSafety && <SafetyNote language={language} />}
      </div>
    </div>
  );
}
