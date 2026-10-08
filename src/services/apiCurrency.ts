import type { CurrencyRate } from "../types/currency";

export async function getCurrencyRates(): Promise<CurrencyRate[]> {
  const response = await fetch("/api/currency/rates");

  if (!response.ok) {
    throw new Error("Failed to fetch currency rates");
  }

  const json = await response.json();

    console.log("currency raw:", json);
    
   

  return json.data.map((item: any) => ({
    code: item.code,
    symbol: item.symbol,
    name: item.name,
    price: item.mid,
    change24h: item.change_24h_percent,
  }));
}
