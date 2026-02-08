import { useEffect } from 'react';
import { useActor } from './hooks/useActor';
import { Header } from './components/sahaay/Header';
import { ChatScreen } from './components/sahaay/ChatScreen';
import { SessionSidebar } from './components/sahaay/SessionSidebar';
import { DisclaimerBanner } from './components/sahaay/DisclaimerBanner';
import { useSessionStore } from './state/sessions';
import { ThemeProvider } from 'next-themes';

function App() {
  const { actor } = useActor();
  const initializeApp = useSessionStore((state) => state.initializeApp);

  useEffect(() => {
    if (actor) {
      // Initialize backend data
      actor.initialize().catch(console.error);
      // Initialize frontend state
      initializeApp();
    }
  }, [actor, initializeApp]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div 
        className="flex h-screen w-full overflow-hidden bg-background"
        style={{
          backgroundImage: 'url(/assets/generated/sahaay-bg-pattern.dim_2000x2000.png)',
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-background/95" />
        
        <SessionSidebar />
        
        <div className="relative flex flex-1 flex-col">
          <Header />
          <DisclaimerBanner />
          <ChatScreen />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
