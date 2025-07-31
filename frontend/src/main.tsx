import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@/hooks/auth";

import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
      <ToastContainer autoClose={2000} hideProgressBar />
    </AuthProvider>
  </QueryClientProvider>,
);
