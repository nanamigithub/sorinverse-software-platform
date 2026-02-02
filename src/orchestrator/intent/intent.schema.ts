// src/orchestrator/intent/intent.schema.ts

export interface ParsedIntent {
  goal: string;                 // 用户真正想达成的事
  entities: Record<string, any>;
  constraints?: Record<string, any>;
  urgency?: "low" | "normal" | "high";
}
