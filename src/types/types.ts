
import { type LucideIcon } from "lucide-react";
import { DriverRequestStatus } from "./status";


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




export interface Vehicle {
  id: string;
  plate: string;
  transitCode: string;
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
  status: "active" | "inActive";
  lastRequest: string;
}

export type DriverRequest = {
  id: string;
  status: DriverRequestStatus;
  created_at: string;

  driver: {
    id: string;
    name: string;
    phone: string;
  };

  vehicle: {
    id: string;
    plate: string | null;
    transit_code: string | null;
    vehicle_type: string;
  };
};

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





