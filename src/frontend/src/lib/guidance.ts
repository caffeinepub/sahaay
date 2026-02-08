import { Language, type KnowledgeItem, type ProcessStep, type LifeGuide } from '../backend';

export interface GuidanceResponse {
  text: string;
  sources?: Array<{
    title: string;
    url?: string;
    description: string;
  }>;
  isSensitive?: boolean;
}

export function formatKnowledgeItemResponse(item: KnowledgeItem): GuidanceResponse {
  return {
    text: `**${item.lawName}**\n\n${item.description}`,
    sources: [
      {
        title: item.citation.source,
        description: item.citation.description,
      },
    ],
  };
}

export function formatProcessStepResponse(process: ProcessStep): GuidanceResponse {
  const stepsText = process.steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n');
  
  return {
    text: `**${process.processName}**\n\n${stepsText}`,
    sources: [
      {
        title: process.citation.source,
        description: process.citation.description,
      },
    ],
  };
}

export function formatLifeGuideResponse(guide: LifeGuide): GuidanceResponse {
  const isSensitive = guide.situation.toLowerCase().includes('fraud') || 
                      guide.situation.toLowerCase().includes('harassment') ||
                      guide.situation.toLowerCase().includes('scam');
  
  return {
    text: `**${guide.situation}**\n\n${guide.guidance}`,
    sources: [
      {
        title: guide.citation.source,
        description: guide.citation.description,
      },
    ],
    isSensitive,
  };
}

export function generateWelcomeMessage(language: Language): string {
  if (language === Language.hi) {
    return 'नमस्ते! मैं SAHAAY हूं। मैं आपको भारतीय कानून, अधिकार और सरकारी प्रक्रियाओं को समझने में मदद कर सकता हूं। कृपया नीचे से एक विकल्प चुनें या अपना सवाल पूछें।';
  }
  
  return 'Hello! I\'m SAHAAY. I can help you understand Indian laws, rights, and government processes. Please select an option below or ask your question.';
}

export function generateContextualResponse(
  context: string,
  language: Language,
  modules: [KnowledgeItem[], ProcessStep[], LifeGuide[]]
): GuidanceResponse | null {
  const [knowledge, processes, guides] = modules;
  
  // Match life situation guides first
  const matchedGuide = guides.find((g) => 
    g.language === language && context.toLowerCase().includes(g.situation.toLowerCase())
  );
  
  if (matchedGuide) {
    return formatLifeGuideResponse(matchedGuide);
  }
  
  // Match process steps
  const matchedProcess = processes.find((p) =>
    p.language === language && context.toLowerCase().includes(p.processName.toLowerCase())
  );
  
  if (matchedProcess) {
    return formatProcessStepResponse(matchedProcess);
  }
  
  // Match knowledge items
  const matchedKnowledge = knowledge.find((k) =>
    k.language === language && context.toLowerCase().includes(k.lawName.toLowerCase())
  );
  
  if (matchedKnowledge) {
    return formatKnowledgeItemResponse(matchedKnowledge);
  }
  
  return null;
}
