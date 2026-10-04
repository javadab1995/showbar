import { useEffect, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getRequests } from "../../services/apiRequest";
import { DriverRequestStatus } from "../../types/status";
import { useOnlineStatus } from "../other/useOnlineStatus";

export function useDriverRequests(
  status: "" | DriverRequestStatus,
  enabled = true,
) {
  const isOnline = useOnlineStatus();
  const wasOffline = useRef(false);

  const { refetch, ...query } = useQuery({
    queryKey: ["driver-requests", status],
    queryFn: () =>
      getRequests({
        page: 1,
        pageSize: 20,
        status,
      }),
    enabled,
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

export function useInfiniteDriverRequests(
  status: "" | DriverRequestStatus,
  enabled = true,
) {
  const isOnline = useOnlineStatus();
  const wasOffline = useRef(false);

  const { refetch, ...query } = useInfiniteQuery({
    queryKey: ["driver-requests-infinite", status],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getRequests({
        page: pageParam,
        pageSize: 20,
        status,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce(
        (total, page) => total + page.data.length,
        0,
      );

      return loaded < lastPage.total ? allPages.length + 1 : undefined;
    },

    enabled,
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
