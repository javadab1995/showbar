import { City } from "../types/load";

type SearchCitiesParams = {
  countryCode: string;
  query: string;
  signal?: AbortSignal;
};

type SearchCitiesResponse = {
  cities?: City[];
  message?: string;
};
export const searchCities = async ({
  countryCode,
  query,
  signal,
}: SearchCitiesParams): Promise<City[]> => {
  const trimmedQuery = query.trim();

  if (!countryCode || trimmedQuery.length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    country: countryCode,
    query: trimmedQuery,
  });

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/cities?${params.toString()}`,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت شهرها");
  }

  const data: SearchCitiesResponse = await response.json();

  return data.cities ?? [];
};
