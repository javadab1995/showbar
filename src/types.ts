
import { type LucideIcon } from "lucide-react";



export type LoadStatus =
  | "active"
  | "reserved"
  | "completed"
  | "cancelled"
  | "expired";

export type RequestStatus = "pending" | "approved" | "rejected" | "cancelled";

export type NotificationStatus = "active" | "notified" | "cancelled";

export type TradeType = "export" | "import" | "transit";

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


