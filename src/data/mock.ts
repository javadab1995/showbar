import {
  CarFront,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Truck,
  Users,
} from "lucide-react";
import { Driver, DriverRequest, Load, NavItem, Vehicle } from "../types";

export const loads: Load[] = [
  {
    id: "LD-1001",
    origin: "تهران",
    destination: "تبریز",
    cargo: "فولاد",
    cargoType: "steel",
    weight: 25,
    vehicle: "تریلی",
    vehicleType: "tarpaulin",
    tradeType: "export",
    exitBorder: "jolfa",
    date: "۲۸ مرداد",
    price: 45000000,
    status: "فعال",
    createdAt: "امروز، ۰۸:۲۰",
    description:
      "کویل‌های فولادی بسته‌بندی‌شده برای حمل با تریلی کفی. بارگیری از درب انبار صنعتی.",
    requirements: ["مدارک معتبر حمل", "دارا بودن کد ترانزیتی"],
    location: {
      lat: 35.6892, 
      lng: 51.389, 
    },
    originCoordinates: {
      lat: 35.6892, 
      lng: 51.389,
    },
  },
  {
    id: "LD-1002",
    origin: "اصفهان",
    destination: "بندرعباس",
    cargo: "کانتینر",
    cargoType: "container",
    weight: 24,
    vehicle: "کامیون",
    vehicleType: "truck", // اصلاح شد برای هماهنگی با نوع خودرو
    tradeType: "export",
    exitBorder: "jolfa",
    date: "۲ شهریور",
    price: 61500000,
    status: "فعال",
    createdAt: "امروز، ۰۷:۴۰",
    description: "حمل کانتینر ۴۰ فوت از اصفهان به بندرعباس.",
    requirements: ["کارت هوشمند معتبر", "مدارک حمل"],
    location: {
      lat: 32.6546,
      lng: 51.668,
    },
    originCoordinates: {
      lat: 32.6546,
      lng: 51.668,
    },
  },
];

export const vehicles: Vehicle[] = [
  {
    id: "VH-01",
    plate: "۱۲الف۳۴۵",
    transitId: "TR-84921",
    type: "تریلی",
    status: "فعال",
    drivers: ["DR-01", "DR-02", "DR-03"],
    createdAt: "۱۴۰۵/۰۵/۱۰",
  },
  {
    id: "VH-02",
    plate: "۴۵ب۶۷۸",
    transitId: "TR-72114",
    type: "کامیون",
    status: "فعال",
    drivers: ["DR-01"],
    createdAt: "۱۴۰۵/۰۵/۱۲",
  },
  {
    id: "VH-03",
    plate: "۷۸ج۹۰۱",
    transitId: "TR-55420",
    type: "تانکر",
    status: "غیرفعال",
    drivers: ["DR-04"],
    createdAt: "۱۴۰۵/۰۴/۲۸",
  },
];

export const drivers: Driver[] = [
  {
    id: "DR-01",
    name: "علی رضایی",
    phone: "۰۹۱۲۱۲۳۴۵۶۷",
    vehicleIds: ["VH-01", "VH-02"],
    status: "فعال",
    lastRequest: "امروز، ۰۹:۱۰",
  },
  {
    id: "DR-02",
    name: "محمد احمدی",
    phone: "۰۹۱۴۳۲۱۰۹۸۷",
    vehicleIds: ["VH-01"],
    status: "فعال",
    lastRequest: "امروز، ۰۸:۵۵",
  },
  {
    id: "DR-03",
    name: "رضا کریمی",
    phone: "۰۹۳۵۶۷۸۹۰۱۲",
    vehicleIds: ["VH-01"],
    status: "فعال",
    lastRequest: "دیروز، ۲۱:۳۰",
  },
  {
    id: "DR-04",
    name: "حسین مرادی",
    phone: "۰۹۱۷۴۵۶۷۸۹۰",
    vehicleIds: ["VH-03"],
    status: "غیرفعال",
    lastRequest: "۱۴۰۵/۰۵/۲۰",
  },
];

export const requests: DriverRequest[] = [
  {
    id: "REQ-8F29A",
    driverId: "DR-01",
    vehicleId: "VH-01",
    loadIds: ["LD-1001", "LD-1004", "LD-1002"],
    createdAt: "امروز، ۰۹:۱۰",
    status: "در انتظار بررسی",
  },
  {
    id: "REQ-7C14B",
    driverId: "DR-02",
    vehicleId: "VH-01",
    loadIds: ["LD-1003"],
    createdAt: "امروز، ۰۸:۵۵",
    status: "در انتظار بررسی",
  },
  {
    id: "REQ-2D88C",
    driverId: "DR-04",
    vehicleId: "VH-03",
    loadIds: ["LD-1005"],
    createdAt: "دیروز، ۲۱:۳۰",
    status: "تأیید شده",
  },
];

export const navItems: NavItem[] = [
  { label: "داشبورد", path: "/admin", icon: LayoutDashboard },
  { label: "بارها", path: "/admin/loads", icon: Truck },
  { label: "درخواست‌ها", path: "/admin/requests", icon: ClipboardList },
  { label: "خودروها", path: "/admin/vehicles", icon: CarFront },
  { label: "رانندگان", path: "/admin/drivers", icon: Users },
  { label: "تنظیمات", path: "/admin/settings", icon: Settings },
];

export const money = (value: number) =>
  new Intl.NumberFormat("fa-IR").format(value) + " تومان";
