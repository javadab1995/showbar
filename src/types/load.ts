import { LoadStatus } from "../types";

export type TradeType = "" | "export" | "import";

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
};

type Currency = "IRR" | "USD";

export type LoadData = {
  origin: string;
  destination: string;

  origin_location_url: string | null;
  destination_location_url: string | null;

  origin_latitude: number | null;
  origin_longitude: number | null;

  destination_latitude: number | null;
  destination_longitude: number | null;

  cargo_type: string;
  cargo: string | null;
  vehicle_type: string;
  trade_type: string | null;
  exit_border: string | null;

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
