// components/layout/MobileNav.tsx
import { NavLink } from "react-router-dom";
import { Package, Info, Phone, ShoppingBag } from "lucide-react";
import { useBasket } from "../../contexts/BasketContext";

export default function MobileNav() {
  const { basket } = useBasket();

  const navItems = [
    { path: "/loads", label: "بارها", icon: Package },
    { path: "/about", label: "درباره ما", icon: Info },
    { path: "/contact", label: "تماس", icon: Phone },
    { path: "/basket", label: "سبد", icon: ShoppingBag },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/75 backdrop-blur-lg border-t border-border px-1 py-2 flex justify-between z-50 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-16 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-text-2 hover:bg-surface-2"
              }`
            }
          >
            <div className="relative">
              <Icon size={24} />
              {item.path === "/basket" && basket.length > 0 && (
                <>
                  <span className="absolute  text-surface flex justify-center items-center p-1.5 -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse">
                    {basket.length}
                  </span>
                </>
              )}
            </div>
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
