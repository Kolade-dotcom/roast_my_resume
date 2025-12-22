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
}

export interface CheckoutSession {
  url: string;
}
