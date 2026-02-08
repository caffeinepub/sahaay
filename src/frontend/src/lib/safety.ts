export function isSensitiveSituation(context: string): boolean {
  const sensitiveKeywords = [
    'fraud',
    'scam',
    'harassment',
    'abuse',
    'threat',
    'violence',
    'assault',
    'emergency',
    'danger',
    'police',
    'crime',
  ];
  
  const lowerContext = context.toLowerCase();
  return sensitiveKeywords.some((keyword) => lowerContext.includes(keyword));
}

export function getSafetyNote(language: 'en' | 'hi'): string {
  if (language === 'hi') {
    return '⚠️ **महत्वपूर्ण सुरक्षा नोट**: यदि आप तत्काल खतरे में हैं, तो कृपया 112 (आपातकालीन) या स्थानीय पुलिस से संपर्क करें। किसी भी संवेदनशील व्यक्तिगत जानकारी को साझा न करें। आधिकारिक चैनलों के माध्यम से कार्रवाई करें।';
  }
  
  return '⚠️ **Important Safety Note**: If you are in immediate danger, please contact 112 (emergency) or local police. Do not share any sensitive personal information. Take action through official channels only.';
}
