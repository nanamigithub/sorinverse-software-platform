/**
 * Intent Contract
 * ----------------
 * This file defines the universal intention interface of Sorinverse Platform.
 * It is implementation-agnostic and engine-independent.
 */

export type IntentSource =
  | "voice"
  | "ui"
  | "system"
  | "automation";

export interface IntentRequest {
  source: IntentSource;

  /**
   * Raw human expression.
   * Example: "安排明天下午三点和Alex的会议"
   */
  rawIntent: string;

  /**
   * Optional structured context
   * (calendar snapshot, location, user state, etc.)
   */
  context?: Record<string, any>;

  /**
   * Explicit permissions granted by the user
   */
  permissions: string[];
}

export interface IntentResult {
  status: "planned" | "executed" | "blocked";

  /**
   * Human-readable summary
   */
  summary?: string;

  /**
   * Execution or simulation output
   */
  output?: Record<string, any>;

  /**
   * Reason if blocked
   */
  reason?: string;
}
