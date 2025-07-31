import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/hooks/auth";

import { PageLoading } from "./PageLoading";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <PageLoading />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
