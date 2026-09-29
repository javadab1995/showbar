import { useQuery } from "@tanstack/react-query";


import { getLoad } from "../../services/apiLoads";

export function useLoad(id?: string) {
  return useQuery({
    queryKey: ["load", id],
    queryFn: () => getLoad(id!),
    enabled: Boolean(id),
    staleTime: 30 * 1000,
  });
}
