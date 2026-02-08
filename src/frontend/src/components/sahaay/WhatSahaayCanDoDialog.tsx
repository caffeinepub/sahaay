import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useCapabilities, useLimitations } from '../../hooks/useQueries';
import { Separator } from '@/components/ui/separator';

interface WhatSahaayCanDoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WhatSahaayCanDoDialog({ open, onOpenChange }: WhatSahaayCanDoDialogProps) {
  const { data: capabilities } = useCapabilities();
  const { data: limitations } = useLimitations();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">About SAHAAY</DialogTitle>
          <DialogDescription>
            Understanding what SAHAAY can and cannot do
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <div className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-700 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              What SAHAAY Can Do
            </div>
            <p className="text-sm text-muted-foreground">
              {capabilities || 'SAHAAY can explain laws, guide you through processes, and provide situational advice.'}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Explain Indian laws and rights in simple language</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Guide you through government processes and schemes</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Provide step-by-step guidance for life situations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Show you official sources and citations</span>
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <div className="mb-3 flex items-center gap-2 text-lg font-semibold text-red-700 dark:text-red-400">
              <XCircle className="h-5 w-5" />
              What SAHAAY Cannot Do
            </div>
            <p className="text-sm text-muted-foreground">
              {limitations || 'SAHAAY cannot provide specific legal advice or represent you.'}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-red-600">✗</span>
                <span>Provide personalized legal advice or decisions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600">✗</span>
                <span>Replace lawyers, doctors, or other professionals</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600">✗</span>
                <span>Submit forms or take action on your behalf</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600">✗</span>
                <span>Guarantee accuracy or outcomes</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-muted p-4 text-sm">
            <strong>Remember:</strong> SAHAAY provides informational guidance based on publicly available sources. 
            Final decisions rest with you and official authorities. Always verify information with qualified professionals 
            when needed.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
