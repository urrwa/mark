export interface ApplicationFormData {
  firstName: string;
  email: string;
  socialHandle: string;
  creatorStage: string;
  contentType: string;
  mainGoal: string;
  internationalInterest: string;
  isEighteenPlus: boolean;
  privacyConsent: boolean;
}

export interface TrackingParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer?: string;
  landingPageVersion: string;
  ctaSource?: string;
  timestamp: string;
}

export interface AIPromptData {
  id: string;
  sectionNumber: number;
  sectionName: string;
  title: string;
  prompt: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: 'identity' | 'safety' | 'content' | 'form' | 'technical';
  verified: boolean;
}

export interface RequiredAsset {
  id: string;
  title: string;
  category: 'Asset' | 'Legal' | 'Technical' | 'Production';
  status: 'Pending Client' | 'Placeholder In Use';
  description: string;
}
