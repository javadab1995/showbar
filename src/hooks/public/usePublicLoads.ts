import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import {
  getLoads,
  getLoadsByIds,
  getNearbyLoadIds,
} from "../../services/apiLoads";

import type { Coordinates, LoadFilters } from "../../types/load";
import { useOnlineStatus } from "../other/useOnlineStatus";

export function usePublicLoads(
  query: string,
  filters: LoadFilters,
  userLocation: Coordinates | null,
) {
  const isNearbyMode = filters.nearest && userLocation !== null;
  const isOnline = useOnlineStatus();

  const wasOffline = useRef(false);

  const loadsQuery = useInfiniteQuery({
    queryKey: ["public-loads", query, filters],
    queryFn: ({ pageParam }) =>
      getLoads({
        pageParam,
        query,
        filters,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !isNearbyMode,
    retry: 0,
  });

  const nearbyQuery = useQuery({
    queryKey: ["nearby-loads", userLocation],
    queryFn: async () => {
      if (!userLocation) {
        return [];
      }

      const nearbyLoads = await getNearbyLoadIds(userLocation);

      if (nearbyLoads.length === 0) {
        return [];
      }

      const ids = nearbyLoads.map((item) => item.load_id);

      const loads = await getLoadsByIds(ids);

      const distanceMap = new Map(
        nearbyLoads.map((item) => [item.load_id, item.distance_km]),
      );

      return loads
        .map((load) => ({
          ...load,
          distance_km: distanceMap.get(load.id) ?? null,
        }))
        .sort(
          (a, b) => (a.distance_km ?? Infinity) - (b.distance_km ?? Infinity),
        );
    },
    enabled: isNearbyMode,
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

    if (isNearbyMode) {
      nearbyQuery.refetch();
      return;
    }

    loadsQuery.refetch();
  }, [isOnline, isNearbyMode]);

  const normalLoads = loadsQuery.data?.pages.flatMap((page) => page.data) ?? [];

  const nearbyLoads = nearbyQuery.data ?? [];

  const loads = isNearbyMode ? nearbyLoads : normalLoads;

  return {
    loads,
    totalCount: loads.length,
    isLoading: isNearbyMode ? nearbyQuery.isLoading : loadsQuery.isLoading,
    isError: isNearbyMode ? nearbyQuery.isError : loadsQuery.isError,
    error: isNearbyMode ? nearbyQuery.error : loadsQuery.error,
    hasNextPage: isNearbyMode ? false : loadsQuery.hasNextPage,
    isFetchingNextPage: isNearbyMode ? false : loadsQuery.isFetchingNextPage,
    fetchNextPage: loadsQuery.fetchNextPage,
  };
}
