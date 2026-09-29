import { useQuery } from "@tanstack/react-query";

import { getRequestById } from "../../services/apiRequest";

export function useRequest(requestId: string | undefined) {
  return useQuery({
    queryKey: ["request-details", requestId],
    queryFn: () => {
      if (!requestId) {
        throw new Error("شناسه درخواست وجود ندارد");
      }

      return getRequestById(requestId);
    },
    enabled: Boolean(requestId),
  });
}
