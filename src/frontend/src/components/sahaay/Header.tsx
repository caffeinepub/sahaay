import { useState } from 'react';
import { Menu, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from './LanguageSelector';
import { WhatSahaayCanDoDialog } from './WhatSahaayCanDoDialog';
import { useSessionStore } from '../../state/sessions';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SessionSidebar } from './SessionSidebar';

export function Header() {
  const [showWhatDialog, setShowWhatDialog] = useState(false);
  const clearCurrentSession = useSessionStore((state) => state.clearCurrentSession);
  const createSession = useSessionStore((state) => state.createSession);

  const handleStartOver = () => {
    clearCurrentSession();
    createSession('');
  };

  return (
    <>
      <header className="relative z-10 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SessionSidebar />
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/sahaay-logo-mark.dim_512x512.png" 
              alt="SAHAAY Logo"
              className="h-8 w-8"
            />
            <img 
              src="/assets/generated/sahaay-wordmark.dim_1400x400.png" 
              alt="SAHAAY"
              className="hidden h-6 sm:block"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowWhatDialog(true)}
            className="hidden sm:flex"
          >
            About SAHAAY
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleStartOver}
            title="Start Over"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <LanguageSelector />
        </div>
      </header>

      <WhatSahaayCanDoDialog open={showWhatDialog} onOpenChange={setShowWhatDialog} />
    </>
  );
}
