import { useInfiniteQuery } from "@tanstack/react-query";
import { getLoads } from "../services/apiLoads";
import { LoadFilters } from "../types/load";




export function usePublicLoads(query: string, filters: LoadFilters) {
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
  });

  const loads = loadsQuery.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    loads,

    totalCount: loads.length,

    isLoading: loadsQuery.isLoading,

    isError: loadsQuery.isError,

    error: loadsQuery.error,

    hasNextPage: loadsQuery.hasNextPage,

    isFetchingNextPage: loadsQuery.isFetchingNextPage,

    fetchNextPage: loadsQuery.fetchNextPage,
  };
}
