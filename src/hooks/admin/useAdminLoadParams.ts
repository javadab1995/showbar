import { useSearchParams } from "react-router-dom";

import type { LoadStatus } from "../../types/status";

export function useAdminLoadParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(Number(searchParams.get("page") ?? 1), 1);

  const query = searchParams.get("q") ?? "";

  const status = (searchParams.get("status") ?? "") as LoadStatus | "";

  const sort = (searchParams.get("sort") ?? "newest") as "newest" | "oldest";

  const updateParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === 1) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  };

  return {
    page,
    query,
    status,
    sort,

    setPage: (page: number) => updateParams({ page }),

    setQuery: (q: string) =>
      updateParams({
        q,
        page: 1,
      }),

    setStatus: (status: LoadStatus | "") =>
      updateParams({
        status,
        page: 1,
      }),

    setSort: (sort: "newest" | "oldest") =>
      updateParams({
        sort,
        page: 1,
      }),
  };
}
