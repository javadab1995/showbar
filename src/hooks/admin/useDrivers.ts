import { useQuery } from "@tanstack/react-query";

import { getDrivers } from "../../services/apiDrivers";

import { useEffect, useRef } from "react";
import { useOnlineStatus } from "../other/useOnlineStatus";

export function useDrivers(page: number, pageSize: number, query: string) {
  const isOnline = useOnlineStatus();

  const wasOffline = useRef(false);

  const queryResult = useQuery({
    queryKey: ["drivers", page, pageSize, query],
    queryFn: () =>
      getDrivers({
        page,
        pageSize,
        query,
      }),
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

    queryResult.refetch();
  }, [isOnline]);

  return queryResult;
}
