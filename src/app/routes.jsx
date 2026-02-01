import { createBrowserRouter } from "react-router-dom";

import AppShell from "./AppShell";

import Architecture from "../pages/Architecture";
import Pipeline from "../pages/Pipeline";
import Systems from "../pages/Systems";

/**
 * Global Route Table
 * This is the ONLY place that defines navigation structure.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Architecture />,
      },
      {
        path: "architecture",
        element: <Architecture />,
      },
      {
        path: "pipeline",
        element: <Pipeline />,
      },
      {
        path: "systems",
        element: <Systems />,
      },
    ],
  },
]);

export default router;
