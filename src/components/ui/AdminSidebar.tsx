// components/layout/AdminSidebar.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { navItems } from "../../data/mock";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const AdminSidebar = ({ mobileOpen, setMobileOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={`fixed lg:sticky inset-y-0 h-dvh right-0 z-50 w-72 bg-surface border-l border-border transform transition-transform duration-300 ease-in-out  lg:transform-none overflow-y-auto ${
        mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="h-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3 font-bold text-xl text-text">
            <div className="w-8 h-8 bg-primary-radial rounded-xl flex items-center justify-center text-surface">
              S
            </div>
            <span>ShowBar</span>
          </div>
          <button
            className="lg:hidden p-2 text-text-2 hover:bg-surface-2 rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              location.pathname === item.path ||
              (item.path !== "/admin" &&
                location.pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  active
                    ? "bg-primary-radial text-surface shadow-lg shadow-primary/20"
                    : "text-text-2 hover:bg-surface-2 hover:text-text"
                }`}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          className="flex items-center gap-3 px-4 py-3 text-text-2 hover:text-danger transition-colors"
          onClick={() => navigate("/admin/login")}
        >
          <LogOut size={20} />
          خروج
        </button>
      </div>
    </aside>
  );
};
