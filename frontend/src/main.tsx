import "./index.css";

import { createRoot } from "react-dom/client";

import { AuthProvider } from "@/hooks/auth";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
