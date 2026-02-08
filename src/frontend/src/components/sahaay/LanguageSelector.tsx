import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguageStore } from '../../state/language';
import { Language } from '../../backend';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <Select
      value={language}
      onValueChange={(value) => setLanguage(value as Language)}
    >
      <SelectTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">
            {language === Language.en ? 'English' : 'हिन्दी'}
          </span>
        </Button>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Language.en}>English</SelectItem>
        <SelectItem value={Language.hi}>हिन्दी (Hindi)</SelectItem>
      </SelectContent>
    </Select>
  );
}
