export interface SystemPrompt {
  content: string;
  restrictions: string[];
}

export interface AttackAttempt {
  prompt: string;
  type: 'DIRECT_REVELATION' | 'ROLE_OVERRIDE' | 'CONTEXT_MANIPULATION' | 'INSTRUCTION_NEGATION' | 'TOKEN_MANIPULATION';
  description: string;
  risk_score: number;
}

export interface AIResponse {
  content: string;
  succeeded: boolean;
  defense_triggered: boolean;
  defense_details?: string;
  risk_score: number;
  error?: string;
}

export interface SafeModeCheck {
  is_safe: boolean;
  risk_score: number;
  detected_patterns: string[];
  recommendations: string[];
}

export interface AttackResult {
  attempt: AttackAttempt;
  response: AIResponse;
  timestamp: string;
} 