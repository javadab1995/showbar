import {
  CarFront,
  ClipboardList,
  Info,
  LayoutDashboard,
  LucideUsers,
  Settings,
  Truck,
  UserPlus,
  Users,
} from "lucide-react";
import { NavItem } from "../types/types";






export const navItems: NavItem[] = [
  { label: "داشبورد", path: "/admin", icon: LayoutDashboard },
  { label: "بارها", path: "/admin/loads", icon: Truck },
  { label: "درخواست‌ها", path: "/admin/requests", icon: ClipboardList },
  { label: "خودروها", path: "/admin/vehicles", icon: CarFront },
  { label: "رانندگان", path: "/admin/drivers", icon: Users },

  { label: "افزودن ادمین", path: "/admin/add-admin", icon: UserPlus },
  { label: " ادمین ها", path: "/admin/users", icon:LucideUsers },
  { label: "راهنما", path: "/admin/status-guide", icon:Info },
  { label: "تنظیمات", path: "/admin/settings", icon: Settings },
];

