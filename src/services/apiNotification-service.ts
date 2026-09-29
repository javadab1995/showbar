import supabase from "./supabase";

export type LoadNotification = {
  id: string;
  request_id: string;
  load_id: string;
  name: string;
  phone: string;
  status: "active" | "notified" | "cancelled";
  notified_at: string | null;
  created_at: string;
  load: {
    origin: string;
    destination: string;
  }[];
};

export type LoadAvailabilityAlert = {
  id: string;
  load_id: string;
  name: string;
  mobile: string;
  status: "pending" | "notified" | "cancelled";
  notified_at: string | null;
  created_at: string;
  load: {
    origin: string;
    destination: string;
  }[];
};

export async function getLoadNotifications() {
  const { data, error } = await supabase
    .from("load_notifications")
    .select(
      `
        id,
        request_id,
        load_id,
        name,
        phone,
        status,
        notified_at,
        created_at,
        load:loads (
          origin,
          destination
        )
      `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as LoadNotification[];
}

export async function getLoadAvailabilityAlerts() {
  const { data, error } = await supabase
    .from("load_availability_alerts")
    .select(
      `
        id,
        load_id,
        name,
        mobile,
        status,
        notified_at,
        created_at,
        load:loads (
          origin,
          destination
        )
      `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }


  return data as LoadAvailabilityAlert[];
}
