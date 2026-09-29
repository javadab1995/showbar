import { useQuery } from "@tanstack/react-query";

import { getLoadRequests } from "../../services/apiRequest";

export function useLoadRequests(loadId: string) {
  return useQuery({
    queryKey: ["load-requests", loadId],

    queryFn: () => getLoadRequests(loadId),

    enabled: Boolean(loadId),
  });
}
