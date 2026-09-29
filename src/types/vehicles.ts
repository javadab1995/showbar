
import { vehicleType } from "./load";
import { DriverRequestStatus, VehicleStatus } from "./status";


export type VehicleFilters = {
  search?: string;
  vehicleType?: string;
  status?: VehicleStatus;
  identifierType?: "PLATE" | "TRANSIT";

  sortBy?: "created_at" | "vehicle_type" | "status";
  sortOrder?: "asc" | "desc";

  page?: number;
  limit?: number;
};

export type vehiclesItem = {
  id: string;
  transit_code: string | null;

  created_at: string;
  vehicle_type: vehicleType;
  plate: string | null;

  identifier_type: "TRANSIT" | "PLATE";
  status: VehicleStatus ;
};

export type VehicleDetails = {
  vehicle: {
    id: string;
    plate: string ;
    transit_code: string | null;
    vehicle_type: string;
    status: VehicleStatus;
    identifier_type: "TRANSIT" | "PLATE";
  };

  drivers: {
    id: string;
    created_at: string;
    driver: {
      id: string;
      name: string;
      phone: string;
      national_id: string | null;
    } | null;
  }[];

  assignments: {
    id: string;
    assigned_at: string;

    load: {
      id: string;
      origin: string;
      destination: string;
      cargo: string;
      cargo_type: string;
      weight: number;
      price: number;
      currency: string;
      status: string;
      loading_date: string;
    } | null;

    driver: {
      id: string;
      name: string;
      phone: string;
    } | null;
  }[];

  requests: {
    id: string;
    status: DriverRequestStatus;
    created_at: string;

    driver: {
      id: string;
      name: string;
      phone: string;
    } | null;

    vehicle: {
      id: string;
      plate: string | null;
      transit_code: string | null;
    } | null;

    loads: {
      status: string;
      load: {
        id: string;
        origin: string;
        destination: string;
        cargo: string;
        weight: number;
        price: number;
        currency: string;
      } | null;
    }[];
  }[];
};