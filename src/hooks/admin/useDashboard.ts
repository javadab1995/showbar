import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { getDashboardData } from "../../services/apiDashboard";

import { useOnlineStatus } from "../other/useOnlineStatus";

export function useDashboard() {
  const isOnline = useOnlineStatus();

  const wasOffline = useRef(false);

  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000,
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

    query.refetch();
  }, [isOnline]);

  return query;
}
