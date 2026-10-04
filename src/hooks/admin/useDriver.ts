import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { getDriver } from "../../services/apiDrivers";
import { useOnlineStatus } from "../other/useOnlineStatus";

export function useDriver(id?: string) {
  const isOnline = useOnlineStatus();
  const wasOffline = useRef(false);

  const { refetch, ...query } = useQuery({
    queryKey: ["driver", id],
    queryFn: () => getDriver(id!),
    enabled: Boolean(id),
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
