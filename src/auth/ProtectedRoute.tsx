import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "./AuthProvider";
import { Loader } from "lucide-react";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader />
        <p>در حال بررسی حساب کاربری...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

   

  return <Outlet />;
}
