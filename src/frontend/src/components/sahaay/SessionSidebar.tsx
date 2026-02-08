import { Plus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useSessionStore } from '../../state/sessions';
import { useLanguageStore } from '../../state/language';
import { cn } from '../../lib/utils';

export function SessionSidebar() {
  const { language } = useLanguageStore();
  const sessions = useSessionStore((state) => state.sessions);
  const currentSessionId = useSessionStore((state) => state.currentSessionId);
  const setCurrentSession = useSessionStore((state) => state.setCurrentSession);
  const createSession = useSessionStore((state) => state.createSession);

  const handleNewSession = () => {
    createSession('');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return language === 'hi' ? 'अभी' : 'Just now';
    if (diffMins < 60) return language === 'hi' ? `${diffMins} मिनट पहले` : `${diffMins}m ago`;
    if (diffHours < 24) return language === 'hi' ? `${diffHours} घंटे पहले` : `${diffHours}h ago`;
    if (diffDays < 7) return language === 'hi' ? `${diffDays} दिन पहले` : `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getSessionPreview = (session: typeof sessions[0]) => {
    if (session.messages.length === 0) {
      return language === 'hi' ? 'नया सत्र' : 'New session';
    }
    const firstUserMsg = session.messages.find((m) => m.sender === 'user');
    return firstUserMsg?.text.slice(0, 50) || (language === 'hi' ? 'नया सत्र' : 'New session');
  };

  return (
    <div className="flex h-full flex-col border-r border-border bg-sidebar">
      <div className="p-4">
        <Button onClick={handleNewSession} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          {language === 'hi' ? 'नया सत्र' : 'New Session'}
        </Button>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {sessions
            .slice()
            .reverse()
            .map((session) => (
              <button
                key={session.id}
                onClick={() => setCurrentSession(session.id)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-sidebar-accent',
                  currentSessionId === session.id && 'bg-sidebar-accent'
                )}
              >
                <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {getSessionPreview(session)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(session.updatedAt)}
                  </div>
                </div>
              </button>
            ))}
        </div>
      </ScrollArea>

      <Separator />

      <div className="p-4 text-center text-xs text-muted-foreground">
        © 2026. Built with ❤️ using{' '}
        <a
          href="https://caffeine.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </div>
    </div>
  );
}
