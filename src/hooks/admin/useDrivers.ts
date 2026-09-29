import { useQuery } from "@tanstack/react-query";
import { getDrivers } from "../../services/apiDrivers";

export function useDrivers(page: number, pageSize: number, query: string) {
  return useQuery({
    queryKey: ["drivers", page, pageSize, query],
    queryFn: () =>
      getDrivers({
        page,
        pageSize,
        query,
      }),
  });
}
