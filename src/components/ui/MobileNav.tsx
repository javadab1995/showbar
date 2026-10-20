import { NavLink, useLocation } from "react-router-dom";
import { Package, Info, Phone, ShoppingBag, Newspaper } from "lucide-react";
import { useBasket } from "../../contexts/BasketContext";
import { toPersianDigits } from "../../helpers/number";

export default function MobileNav() {
  const { basket } = useBasket();
  const { pathname } = useLocation();

  // مسیر بارها: / و هر چیزی که با /loads شروع بشه
  const isLoadsPath = pathname === "/" || pathname.startsWith("/loads");

  const navItems = [
    { path: "/loads", label: "بارها", icon: Package, active: isLoadsPath },
    {
      path: "/about",
      label: "درباره ما",
      icon: Info,
      active: pathname === "/about",
    },
    {
      path: "/posts",
      label: "وبلاگ",
      icon: Newspaper,
      active: pathname === "/posts",
    },
    {
      path: "/contact",
      label: "تماس",
      icon: Phone,
      active: pathname === "/contact",
    },
    {
      path: "/basket",
      label: "سبد",
      icon: ShoppingBag,
      active: pathname === "/basket",
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/75 backdrop-blur-lg border-t border-border px-1 py-2 flex justify-between z-50 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.active;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-16 ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-text-2 hover:bg-surface-2"
            }`}
          >
            <div className="relative">
              <Icon size={24} />
              {item.path === "/basket" && basket.length > 0 && (
                <b className="absolute text-surface flex justify-center items-center p-1.5 -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse">
                  {toPersianDigits(basket.length)}
                </b>
              )}
            </div>
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
