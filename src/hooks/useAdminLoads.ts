import { useQuery } from "@tanstack/react-query";

import { getAdminLoads, type AdminLoadParams } from "../services/apiLoads";

export function useAdminLoads(params: AdminLoadParams) {
  return useQuery({
    queryKey: ["admin-loads", params],

    queryFn: () => getAdminLoads(params),

    placeholderData: (previousData) => previousData,

    staleTime: 30 * 1000,
  });
}
