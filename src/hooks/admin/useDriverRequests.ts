import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getRequests } from "../../services/apiRequest";
import { DriverRequestLoadStatus, DriverRequestStatus } from "../../types/status";




export function useDriverRequests(
  status: "" | DriverRequestLoadStatus,
  enabled = true,
) {
  return useQuery({
    queryKey: ["driver-requests", status],
    queryFn: () =>
      getRequests({
        page: 1,
        pageSize: 20,
        status,
      }),
    enabled,
  });
}

export function useInfiniteDriverRequests(status: "" | DriverRequestLoadStatus, enabled = true) {
  return useInfiniteQuery({
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
  });
}
