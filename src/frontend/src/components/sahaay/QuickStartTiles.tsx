import { Card, CardContent } from '@/components/ui/card';
import { quickStartOptions, getQuickStartLabel } from '../../lib/quickStart';
import { useLanguageStore } from '../../state/language';

interface QuickStartTilesProps {
  onSelect: (context: string) => void;
}

export function QuickStartTiles({ onSelect }: QuickStartTilesProps) {
  const { language } = useLanguageStore();

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground">
          {language === 'hi' ? 'मैं आपकी कैसे मदद कर सकता हूं?' : 'How can I help you today?'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {language === 'hi' 
            ? 'एक विकल्प चुनें या नीचे अपना सवाल टाइप करें'
            : 'Select an option below or type your question'}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickStartOptions.map((option) => (
          <Card
            key={option.id}
            className="cursor-pointer transition-all hover:scale-105 hover:border-primary hover:shadow-md"
            onClick={() => onSelect(option.context)}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <span className="text-3xl">{option.icon}</span>
              <span className="font-medium">{getQuickStartLabel(option, language)}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
