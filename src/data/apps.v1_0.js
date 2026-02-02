// src/data/apps.v1.0.js

export const apps = [
  {
    id: "app.calendar.assistant",
    name: "Calendar Assistant",
    version: "1.0.0",
    description: "Automatically schedules, reschedules, and reports calendar tasks",
    category: "productivity",
    capabilities: [
      "calendar.read",
      "calendar.write",
      "notification.send"
    ],
    pipeline: {
      planner: "default",
      executor: ["calendar", "notification"],
      reporter: "summary"
    },
    ui: {
      shell: true,
      voiceFirst: true
    },
    commercial: {
      sellable: true,
      price: 100,
      currency: "JPY"
    }
  }
];

export default apps;
