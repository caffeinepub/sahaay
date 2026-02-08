import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Source {
  title: string;
  url?: string;
  description: string;
}

interface SourcesBlockProps {
  sources: Source[];
}

export function SourcesBlock({ sources }: SourcesBlockProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Sources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sources.map((source, idx) => (
          <div key={idx} className="text-sm">
            <div className="flex items-start gap-2">
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  {source.title}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="font-medium">{source.title}</span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{source.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
