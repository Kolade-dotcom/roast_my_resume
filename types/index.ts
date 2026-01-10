export interface RoastResult {
  roast: string;
  resumeText: string;
}

export interface RewriteResult {
  rewrittenResume: string;
  beforeAfterExamples: string[];
  atsScore: number;
  atsExplanation: string;
  industryTips: string[];
  linkedInSummary: string;
}

export interface CheckoutSession {
  url: string;
}

export interface PaymentRecord {
  sessionId: string;
  email: string;
  resumeText: string;
  rewriteResult?: RewriteResult;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Template {
  id: 'modern' | 'classic' | 'minimal';
  name: string;
  description: string;
  previewUrl: string;
}

export interface ExportRequest {
  content: string;
  format: 'pdf' | 'docx' | 'txt';
  templateId: string;
}
