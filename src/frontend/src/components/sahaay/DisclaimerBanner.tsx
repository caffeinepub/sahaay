import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDisclaimer } from '../../hooks/useQueries';

export function DisclaimerBanner() {
  const { data: disclaimer } = useDisclaimer();

  return (
    <Alert className="relative z-10 rounded-none border-x-0 border-t-0 bg-amber-50 dark:bg-amber-950/20">
      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
      <AlertDescription className="text-sm text-amber-900 dark:text-amber-200">
        <strong>Important:</strong> {disclaimer || 'SAHAAY provides general information. Always verify with authorities.'} 
        {' '}For emergencies, call <strong>112</strong>.
      </AlertDescription>
    </Alert>
  );
}
