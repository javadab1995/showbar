import { number } from "framer-motion";
import { type LucideIcon } from "lucide-react";

export type LoadStatus =
  | "فعال"
  | "رزرو شده"
  | "تکمیل شده"
  | "لغو شده"
  | "منقضی شده";
  
export type RequestStatus =
  | "در انتظار بررسی"
  | "تأیید شده"
  | "رد شده"
  | "لغو شده";
export type NotificationStatus = "فعال" | "اطلاع داده شد" | "لغو شده";

export type TradeType = "export" | "import";

export type CargoType =
  | "steel"
  | "container"
  | "cement"
  | "pipe"
  | "bitumen"
  | "copper"
  | "ceramic";

export type FleetType =
  | "tarpaulin"
  | "refrigerated"
  | "truck"
  | "tanker"
  | "other";

export type BorderType = "jolfa" | "bazargan" | "razi" | "sarb" | "poldasht";

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Load = {
  id: string;
  origin: string;
  destination: string;
  cargo: string;
  cargoType: CargoType;
  weight: number;
  vehicle: string;
  vehicleType: FleetType;
  tradeType: TradeType;
  exitBorder: BorderType;
  date: string;
  price: number;
  status: LoadStatus;
  createdAt: string;
  description: string;
  location: Coordinates; 
  requirements: string[];
  originCoordinates: Coordinates;
};

export interface Vehicle {
  id: string;
  plate: string;
  transitId: string;
  type: string;
  status: "فعال" | "غیرفعال";
  drivers: string[];
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleIds: string[];
  status: "فعال" | "غیرفعال";
  lastRequest: string;
}

export interface DriverRequest {
  id: string;
  driverId: string;
  vehicleId: string;
  loadIds: string[];
  createdAt: string;
  status: RequestStatus;
}

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export type PaginationProps = {
  pageSize: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};


