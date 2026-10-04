import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "./AuthProvider";

import Spinner from "../components/widgets/Spinner";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Spinner />
        <p>در حال بررسی حساب کاربری...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

   

  return <Outlet />;
}
