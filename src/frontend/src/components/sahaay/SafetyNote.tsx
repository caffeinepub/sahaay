import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getSafetyNote } from '../../lib/safety';
import { Language } from '../../backend';

interface SafetyNoteProps {
  language: Language;
}

export function SafetyNote({ language }: SafetyNoteProps) {
  const note = getSafetyNote(language === Language.hi ? 'hi' : 'en');

  return (
    <Alert variant="destructive" className="border-l-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="text-sm font-semibold">
        {language === Language.hi ? 'सुरक्षा चेतावनी' : 'Safety Warning'}
      </AlertTitle>
      <AlertDescription className="text-xs">
        {note}
      </AlertDescription>
    </Alert>
  );
}
