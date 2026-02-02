// src/orchestrator/orchestrator.contract.ts

//export type IntentSource = "voice" | "ui" | "system";
// src/orchestrator/orchestrator.contract.ts
export type { IntentRequest, IntentResult as IntentResponse } from "../contracts/intent.contract";

// src/orchestrator/index.ts

import { IntentRequest, IntentResponse } from "./orchestrator.contract";

export async function handleIntent(
  request: IntentRequest
): Promise<IntentResponse> {
  return {
    status: "planned",
    summary: "Intent received. Plan generated."
  };
}

