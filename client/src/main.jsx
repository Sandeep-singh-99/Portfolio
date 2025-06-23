import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/index.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RouterProvider>
);
