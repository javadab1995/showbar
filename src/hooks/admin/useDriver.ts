import { useQuery } from "@tanstack/react-query";

import { getDriver } from "../../services/apiDrivers";

export function useDriver(id?: string) {
  return useQuery({
    queryKey: ["driver", id],
    queryFn: () => getDriver(id!),
    enabled: Boolean(id),
  });
}
