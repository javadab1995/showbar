import { DriverRequestLoadStatus, DriverRequestStatus } from "./status";


export type Mode = "history" | "single";

export type TrackRequestFormData = {
  identifierType: "PLATE" | "TRANSIT";

  plateFirst: string;
  plateLetter: string;
  plateNumber: string;
  plateCity: string;
  plate: string;

  transitCode: string;

  nationalId: string;
  phone: string;

  trackingCode: string;
};

export type RequestHistoryLoad = {
  id: string;
  origin: string;
  destination: string;
  cargo: string | null;
  cargo_type: string | null;
  weight: number | null;
  vehicle_type: string | null;
  trade_type: string | null;
  exit_borders: string[] | null;
  loading_date: string | null;
  price: number | null;
  status: DriverRequestLoadStatus;
  currency: "IRR" | "USD";
  request_status: string;
};

export type RequestHistoryVehicle = {
  id: string;
  plate: string | null;
  transit_code: string | null;
  vehicle_type: string | null;
};

export type RequestHistoryItem = {
  id: string;
  tracking_code: string;
  status: DriverRequestLoadStatus;
  created_at: string;

  approved_load: {
    id: string;
    origin: string;
    destination: string;
    cargo: string | null;
    loading_date: string | null;
  } | null;
};
export type RequestDetails = {
  id: string;
  tracking_code: string;
  status: DriverRequestStatus;
  created_at: string;
  loads:
    | {
        id: string;
        origin: string;
        destination: string;
        cargo: string | null;
        status: DriverRequestLoadStatus;
        loading_date: string | null;
      }[]
    | null;
};

export const STATUS_LABELS: Record<string, string> = {
  pending: "در انتظار بررسی",
  approved: "تأیید شده",
  rejected: "رد شده",
  active: "فعال",
  reserved: "رزرو شده",
  completed: "تکمیل شده",
  cancelled: "لغو شده",
};

export const REQUEST_LOAD_STATUS_LABELS: Record<string, string> = {
  pending: "در انتظار بررسی",
  approved: "تأیید شده",
  rejected: "رد شده",
};
