import { Currency } from "../types/load";
import { DriverRequestStatus, LoadStatus } from "../types/status";

import supabase from "./supabase";

export type DashboardStats = {
  activeLoads: number;
  pendingRequests: number;
  reservedLoads: number;
  completedLoads: number;
};

export type DashboardLoad = {
  id: string;
  origin: string;
  destination: string;
  cargo: string | null;
  weight: number | null;
  price: number | null;
  currency: Currency;
  status: LoadStatus;
};

export type DashboardRequest = {
  id: string;
  tracking_code: string;
  created_at: string;
  status: DriverRequestStatus;
  driver: {
    name: string;
    phone: string;
  };
  vehicle: {
    plate: string;
    vehicle_type: string;
  };
};

export type DashboardData = {
  stats: DashboardStats;
  recentLoads: DashboardLoad[];
  pendingRequests: DashboardRequest[];
};

async function getLoadCount(status: string) {
  const { count, error } = await supabase
    .from("loads")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("status", status);

  if (error) throw error;

  return count ?? 0;
}

async function getRequestCount(status: string) {
  const { count, error } = await supabase
    .from("driver_requests")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("status", status);

  if (error) throw error;

  return count ?? 0;
}

async function getDashboardStats(): Promise<DashboardStats> {
  const [activeLoads, pendingRequests, reservedLoads, completedLoads] =
    await Promise.all([
      getLoadCount("active"),
      getRequestCount("pending"),
      getLoadCount("reserved"),
      getLoadCount("completed"),
    ]);

  return {
    activeLoads,
    pendingRequests,
    reservedLoads,
    completedLoads,
  };
}

async function getRecentLoads(): Promise<DashboardLoad[]> {
  const { data, error } = await supabase
    .from("loads")
    .select(
      `
        id,
        origin,
        destination,
        cargo,
        weight,
        price,
        currency,
        status
      `,
    )
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return (data ?? []) as DashboardLoad[];
}

async function getPendingRequests(): Promise<DashboardRequest[]> {
  const { data, error } = await supabase
    .from("driver_requests")
    .select(
      `
        id,
        tracking_code,
        created_at,
        status,
        driver:drivers(
          name,
          phone
        ),
        vehicle:vehicles(
          plate,
          vehicle_type
        )
      `,
    )
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return (data ?? [])
    .map((item) => {
      const driver = Array.isArray(item.driver) ? item.driver[0] : item.driver;

      const vehicle = Array.isArray(item.vehicle)
        ? item.vehicle[0]
        : item.vehicle;

      if (!driver || !vehicle) return null;

      return {
        id: item.id,
        tracking_code: item.tracking_code,
        created_at: item.created_at,
        status: item.status,
        driver: {
          name: driver.name,
          phone: driver.phone,
        },
        vehicle: {
          plate: vehicle.plate,
          vehicle_type: vehicle.vehicle_type,
        },
      };
    })
    .filter((request): request is DashboardRequest => request !== null);
}

export async function getDashboardData(): Promise<DashboardData> {
  const [stats, recentLoads, pendingRequests] = await Promise.all([
    getDashboardStats(),
    getRecentLoads(),
    getPendingRequests(),
  ]);

  return {
    stats,
    recentLoads,
    pendingRequests,
  };
}
