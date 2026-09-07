// components/layout/PublicHeader.tsx
import { NavLink } from "react-router-dom";
import { Package } from "lucide-react";
import ThemeToggle from "../../components/ui/ThemeToggle";
import { useBasket } from "../../contexts/BasketContext";
import { Button } from "../buttons/Button";

export default function PublicHeader() {
  const { basket } = useBasket();


  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-center px-4 h-full border-b-2 transition-all duration-200 ${
      isActive
        ? "border-primary text-primary font-bold"
        : "border-transparent text-text-2 hover:border-primary/50 hover:text-text"
    }`;

  return (
    <header className="h-16 fixed w-full bg-background/60 z-40 backdrop-blur-lg flex justify-between items-center px-6 border-b border-border">
      {/* Logo */}
      <NavLink to="/" className="text-primary font-extrabold text-3xl">
        ShowBar
      </NavLink>

      {/* Desktop Nav - Hidden on mobile */}
      <div className="hidden md:flex items-center h-full">
        <NavLink to="/loads" className={navClass}>
          بارها
        </NavLink>
        <NavLink to="/about" className={navClass}>
          درباره ما
        </NavLink>
        <NavLink to="/contact" className={navClass}>
          تماس با ما
        </NavLink>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button>
          <NavLink to="/track">پیگیری درخواست‌ها</NavLink>
        </Button>
        <ThemeToggle />
        <NavLink
          to="/basket"
          className="text-xs md:flex hidden items-center justify-center gap-1 border border-border rounded-full hover:bg-surface/75  p-1.5 min-w-20  "
        >
          <Package size={16} />

          <span>سبد بار</span>

          {basket.length > 0 && <b className="text-primary">{basket.length}</b>}
        </NavLink>
      </div>
    </header>
  );
}
