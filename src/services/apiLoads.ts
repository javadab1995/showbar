

import { LoadStatus } from "../types";
import type { Load, LoadData, LoadFilters } from "../types/load";
import supabase from "./supabase";

const PAGE_SIZE = 20;

type GetLoadsParams = {
  pageParam?: number;
  query?: string;
  filters: LoadFilters;
};

type LoadsResponse = {
  data: Load[];
  count: number;
  nextPage: number | undefined;
};

export async function getLoads({
  pageParam = 0,
  query = "",
  filters,
}: GetLoadsParams): Promise<LoadsResponse> {
  const from = pageParam * PAGE_SIZE;

  const to = from + PAGE_SIZE - 1;

  let supabaseQuery = supabase
    .from("loads")
    .select("*", {
      count: "exact",
    })
    .order("created_at", {
      ascending: false,
    })
    .range(from, to);

  // Search
  if (query.trim()) {
    const search = query.trim();

    supabaseQuery = supabaseQuery.or(
      `origin.ilike.%${search}%,` +
        `destination.ilike.%${search}%,` +
        `cargo.ilike.%${search}%`,
    );
  }

  // Trade Type
  if (filters.tradeType) {
    supabaseQuery = supabaseQuery.eq("trade_type", filters.tradeType);
  }

  // Cargo Type
  if (filters.cargo) {
    supabaseQuery = supabaseQuery.eq("cargo_type", filters.cargo);
  }

  // Fleet
  if (filters.fleetType) {
    supabaseQuery = supabaseQuery.eq("vehicle_type", filters.fleetType);
  }

  // Origin
  if (filters.origin) {
    supabaseQuery = supabaseQuery.ilike("origin", `%${filters.origin}%`);
  }

  // Destination
  if (filters.destination) {
    supabaseQuery = supabaseQuery.ilike(
      "destination",
      `%${filters.destination}%`,
    );
  }

  // Borders
  if (filters.borders.length > 0) {
    supabaseQuery = supabaseQuery.in("exit_border", filters.borders);
  }

  // Weight
  switch (filters.tonnage) {
    case "under-10":
      supabaseQuery = supabaseQuery.lt("weight", 10);
      break;

    case "10-15":
      supabaseQuery = supabaseQuery.gte("weight", 10).lt("weight", 15);
      break;

    case "15-20":
      supabaseQuery = supabaseQuery.gte("weight", 15).lt("weight", 20);
      break;

    case "20-23":
      supabaseQuery = supabaseQuery.gte("weight", 20).lte("weight", 23);
      break;

    case "24-25":
      supabaseQuery = supabaseQuery.gte("weight", 24).lte("weight", 25);
      break;
  }

  const { data, error, count } = await supabaseQuery;

  if (error) {
    console.error(error);

    throw new Error("دریافت بارها با مشکل مواجه شد");
  }

  return {
    data: data as Load[],

    count: count ?? 0,

    nextPage: data.length === PAGE_SIZE ? pageParam + 1 : undefined,
  };
}



export const ADMIN_PAGE_SIZE = 10;

export type AdminLoadParams = {
  page: number;
  pageSize?: number;
  query?: string;
  status?: LoadStatus | "";
  sort?: "newest" | "oldest";
};

export type AdminLoadsResponse = {
  data: Load[];
  count: number;
};

export async function getAdminLoads({
  page,
  pageSize = ADMIN_PAGE_SIZE,
  query = "",
  status = "",
  sort = "newest",
}: AdminLoadParams): Promise<AdminLoadsResponse> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let supabaseQuery = supabase.from("loads").select("*", {
    count: "exact",
  });

  // ======================================
  // Search
  // ======================================

  if (query.trim()) {
    const search = query.trim();

    supabaseQuery = supabaseQuery.or(
      [
        `origin.ilike.%${search}%`,
        `destination.ilike.%${search}%`,
        `cargo.ilike.%${search}%`,
        `vehicle_type.ilike.%${search}%`,
      ].join(","),
    );
  }

  // ======================================
  // Status
  // ======================================

  if (status) {
    supabaseQuery = supabaseQuery.eq("status", status);
  }

  // ======================================
  // Sorting
  // ======================================

  supabaseQuery = supabaseQuery.order("created_at", {
    ascending: sort === "oldest",
  });

  // ======================================
  // Pagination
  // ======================================

  supabaseQuery = supabaseQuery.range(from, to);

  const { data, error, count } = await supabaseQuery;

  if (error) {
    console.error(error);

    throw new Error("دریافت بارها با مشکل مواجه شد");
  }

  return {
    data: (data ?? []) as Load[],
    count: count ?? 0,
  };
}


export async function getLoad(id: string): Promise<Load> {
  const { data, error } = await supabase
    .from("loads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);

    throw new Error("بار موردنظر پیدا نشد");
  }

  return data as Load;
}

export async function createLoad(load: LoadData): Promise<Load> {
  const { data, error } = await supabase
    .from("loads")
    .insert(load)
    .select()
    .single();

  if (error) {
    console.error(error);

    throw new Error("ایجاد بار با مشکل مواجه شده است");
  }

  return data as Load;
}

export async function updateLoad(id: string, load: LoadData): Promise<Load> {
  const { data, error } = await supabase
    .from("loads")
    .update(load)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);

    throw new Error("به‌روزرسانی بار با مشکل مواجه شده است");
  }

  return data as Load;
}

export async function deleteLoad(id: string): Promise<void> {
  const { error } = await supabase.from("loads").delete().eq("id", id);

  if (error) {
    console.error(error);

    throw new Error("حذف بار با مشکل مواجه شده است");
  }
}
