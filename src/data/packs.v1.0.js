// src/data/packs.v1.0.js

export const packs = [
  {
    id: "pack.personal.orchestrator",
    name: "Personal Orchestrator Pack",
    version: "1.0.0",
    description: "Voice-driven personal automation pack",
    includes: {
      apps: [
        "app.calendar.assistant",
        "app.email.assistant",
        "app.task.manager"
      ],
      modules: []
    },
    presets: {
      voice: true,
      autoExecute: false,
      reportMode: "summary"
    },
    commercial: {
      sellable: true,
      price: 1000,
      currency: "JPY",
      billing: "monthly"
    }
  }
];

export default packs;
