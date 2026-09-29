import { LoadStatus } from "./status";


export type TradeType = "" | "export" | "import" | "domestic";

export type Coordinates = {
  lat: number;
  lng: number;
};

export type LoadFilters = {
  tradeType: TradeType;
  cargo: string;
  tonnage: string;
  fleetType: string;
  borders: string[];
  origin: string;
  destination: string;
  nearest: boolean;
  driverCoordinates: Coordinates | null;

  origin_country_code?: string;
  origin_city_geoname_id?: number;

  destination_country_code?: string;
  destination_city_geoname_id?: number;
};

export const initialLoadFilters: LoadFilters = {
  tradeType: "",
  cargo: "",
  tonnage: "",
  fleetType: "",
  borders: [],
  origin: "",
  destination: "",
  nearest: false,
  driverCoordinates: null,

  origin_country_code: "",
  origin_city_geoname_id: undefined,

  destination_country_code: "",
  destination_city_geoname_id: undefined,
};

export type vehicleType =
  | "curtain_side"
  | "tanker"
  | "refrigerated"
  | "light_truck"
  | "other";

export type Currency = "IRR" | "USD";

export type LoadData = {
  origin: string;
  destination: string;
  origin_country_code: string;
  destination_country_code: string;

  origin_latitude: number | null;
  origin_longitude: number | null;

  destination_latitude: number | null;
  destination_longitude: number | null;

  cargo_type: string;
  cargo: string | null;
  vehicle_type: string | null;
  trade_type: string | null;
  exit_borders: string[];

  weight: number;
  price: number;
  currency: Currency;

  loading_date: string;

  status: LoadStatus;
  description: string | null;
};

export type Load = LoadData & {
  id: string;
  created_at?: string;
  updated_at?: string;
};

export type LoadsQueryParams = {
  search?: string;

  tradeType?: TradeType;

  cargo?: string;

  tonnage?: string;

  fleetType?: string;

  borders?: string[];

  origin?: string;
  status: LoadStatus;

  destination?: string;

  page?: number;

  pageSize?: number;
};

export type DriverRequestForm = {
  fullName: string;
  phone: string;
  vehicle: string;
  plate: string;
  transitId?: string;
  description?: string;
};

export interface CitySearchProps {
  label: string;
  countryCode: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

export type City = {
  id: number;
  name: string;
  countryCode: string;
  adminName?: string;
  latitude: number;
  longitude: number;
};