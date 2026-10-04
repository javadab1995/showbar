import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { getRequestById } from "../../services/apiRequest";
import { useOnlineStatus } from "../other/useOnlineStatus";

export function useRequest(requestId: string | undefined) {
  const isOnline = useOnlineStatus();
  const wasOffline = useRef(false);

  const { refetch, ...query } = useQuery({
    queryKey: ["request-details", requestId],

    queryFn: () => {
      if (!requestId) {
        throw new Error("شناسه درخواست وجود ندارد");
      }

      return getRequestById(requestId);
    },

    enabled: Boolean(requestId),
    retry: 0,
  });

  useEffect(() => {
    if (!isOnline) {
      wasOffline.current = true;
      return;
    }

    if (!wasOffline.current) {
      return;
    }

    wasOffline.current = false;
    refetch();
  }, [isOnline, refetch]);

  return query;
}
