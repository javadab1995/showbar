
import { Menu, Bell } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

interface HeaderProps {
  title: string;
  onOpenMenu: () => void;
}

export const AdminHeader = ({ title, onOpenMenu }: HeaderProps) => {
  return (
    <header className="bg-surface/80 backdrop-blur-md border-b border-border p-6 sticky top-0 z-30 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 text-text hover:bg-surface-2 rounded-lg"
          onClick={onOpenMenu}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button className="p-2 relative text-text-2 hover:bg-surface-2 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
          مد
        </div>
      </div>
    </header>
  );
};
