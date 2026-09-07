import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../data/mock";
import { Bell, LogOut, Menu, X } from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle";
import { AdminSidebar } from "../components/ui/AdminSidebar";
import { AdminHeader } from "../components/headers/AdminHeader";



export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <AdminHeader title={title} onOpenMenu={() => setMobileOpen(true)} />

        <div className="p-6  flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
