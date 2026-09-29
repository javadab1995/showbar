
import type { DriverRequestFormValues } from "../schemas/driverRequestSchema";

import type { CargoType } from "./types";
import type { Currency } from "./load";
import type {
  DriverRequestLoadStatus,
  DriverRequestStatus,
  LoadStatus,
} from "./status";

export type CreateRequestArgs = DriverRequestFormValues & {
  loadIds: string[];
};

export type AdminRequestListItem = {
  id: string;
  tracking_code: string;
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

  load_count: number;
  status: DriverRequestStatus;
};

export type DriverRequestDetails = {
  id: string;
  tracking_code: string;
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

  loads: {
    id: string;
    origin: string;
    destination: string;
    cargo: CargoType;
    cargo_type: string;
    vehicle_type: string;
    trade_type: string;
    weight: number;
    price: number;
    currency: Currency;
    loading_date: string;
    status: LoadStatus;
    request_load_status: DriverRequestLoadStatus;
  }[];
};

