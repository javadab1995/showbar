
import { useQuery } from "@tanstack/react-query";
import { getCurrencyRates } from "../../services/apiCurrency";


export function useCurrencyRates() {
  const query = useQuery({
    queryKey: ["currency-rates"],
    queryFn: getCurrencyRates,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  return {
    rates: query.data ?? [],
    isLoading: query.isLoading,
    isRefreshing: query.isFetching,
    refresh: query.refetch,
    lastUpdated: query.dataUpdatedAt ? new Date(query.dataUpdatedAt) : null,
  };
}