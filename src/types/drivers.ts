import { DriverRequestStatus, LoadStatus, VehicleStatus } from "./status";

export type AdminDriverListItem = {
  id: string;
  name: string;
  national_id: string;
  phone: string;

  vehicles: {
    id: string;
    plate: string | null;
    transit_code: string | null;
    vehicle_type: string;
  }[];

  last_request: {
    id: string;
    tracking_code: string;
    status: DriverRequestStatus;
    created_at: string;

    vehicle: {
      id: string;
      plate: string | null;
      transit_code: string | null;
      vehicle_type: string;
    } | null;
  } | null;
};

export type DriverDetails = {
  id: string;
  name: string;
  national_id: string;
  phone: string;
  created_at: string;

  vehicles: {
    id: string;
    plate: string | null;
    transit_code: string | null;
    vehicle_type: string;
    identifier_type: string;
    status: VehicleStatus;
  }[];

  requests: {
    id: string;
    tracking_code: string;
    status: DriverRequestStatus;
    created_at: string;

    vehicle: {
      id: string;
      plate: string | null;
      transit_code: string | null;
      vehicle_type: string;
      identifier_type: string;
    } | null;

    loads: {
      id: string;
      origin: string;
      destination: string;
      cargo_type: string;
      vehicle_type: string;
      trade_type: string;
      weight: number;
      price: number;
      loading_date: string;
      status: LoadStatus;
    }[];
  }[];
};

