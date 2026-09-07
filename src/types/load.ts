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
