import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/hooks/auth";

function ProtectedRoute() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
