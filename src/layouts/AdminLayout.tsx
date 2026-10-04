import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { navItems } from "../data/menu-data";

import { AdminSidebar } from "../components/ui/AdminSidebar";
import { AdminHeader } from "../components/headers/AdminHeader";
import { lazy, Suspense } from "react";

const RealtimeNotificationToast = lazy(
  () => import("../components/notifications/RealtimeNotificationToast"),
);

import { useAuth } from "../auth/AuthProvider";



export default function AdminLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const {user} = useAuth()

  const title =
    navItems.find(
      (n) =>
        location.pathname === n.path ||
        (n.path !== "/admin" && location.pathname.startsWith(n.path)),
    )?.label ?? "داشبورد";

  return (
    <div className="min-h-screen  flex font-sans text-text">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-text/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 ">
        <AdminHeader
          title={title}
          onOpenMenu={() => setMobileOpen(true)}
          user={user?.email}
        />

        <div className="p-6  flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <Suspense fallback={null}>
        <RealtimeNotificationToast />
      </Suspense>
    </div>
  );
}
