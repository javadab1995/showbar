

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function SuperAdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user?.role !== "super_admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
