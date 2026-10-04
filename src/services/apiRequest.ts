import { DriverRequest } from "../types/types";
import { AdminRequestListItem, DriverRequestDetails } from "../types/request";
import { RequestDetails, RequestHistoryItem } from "../types/trackRequest.type";

import supabase from "./supabase";
import { DriverRequestLoadStatus, DriverRequestStatus } from "../types/status";

export async function getLoadRequests(
  loadId: string,
): Promise<DriverRequest[]> {
  const { data, error } = await supabase
    .from("driver_request_loads")
    .select(
      `
      request:driver_requests(
        id,
        status,
        created_at,

        driver:drivers(
          id,
          name,
          phone
        ),

        vehicle:vehicles(
          id,
          plate,
          transit_code,
          vehicle_type
        )
      )
    `,
    )
    .eq("load_id", loadId);

  if (error) {
    throw error;
  }

 

  return data
    .map((item) => {
      const request = Array.isArray(item.request)
        ? item.request[0]
        : item.request;

      if (!request) {
        return null;
      }

      const driver = Array.isArray(request.driver)
        ? request.driver[0]
        : request.driver;

      const vehicle = Array.isArray(request.vehicle)
        ? request.vehicle[0]
        : request.vehicle;

      if (!driver || !vehicle) {
        return null;
      }

      return {
        id: request.id,
        status: request.status,
        created_at: request.created_at,

        driver: {
          id: driver.id,
          name: driver.name,
          phone: driver.phone,
        },

        vehicle: {
          id: vehicle.id,
          plate: vehicle.plate,
          transit_code: vehicle.transit_code,
          vehicle_type: vehicle.vehicle_type,
        },
      };
    })
    .filter((request): request is DriverRequest => request !== null);
}

type GetRequestsParams = {
  page?: number;
  pageSize?: number;
  status?: DriverRequestStatus | "";
};

export async function getRequests({
  page = 1,
  pageSize = 20,
  status = "",
}: GetRequestsParams = {}): Promise<{
  data: AdminRequestListItem[];
  total: number;
}> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("driver_requests")
    .select(
      `
        id,
        tracking_code,
        status,
        created_at,
        driver:drivers(
          id,
          name,
          phone
        ),
        vehicle:vehicles(
          id,
          plate,
          transit_code,
          vehicle_type
        ),
        driver_request_loads(count)
      `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  const requests: AdminRequestListItem[] = (data ?? [])
    .map((item) => {
      const driver = Array.isArray(item.driver) ? item.driver[0] : item.driver;

      const vehicle = Array.isArray(item.vehicle)
        ? item.vehicle[0]
        : item.vehicle;

      if (!driver || !vehicle) {
        return null;
      }

      const loadCount = Array.isArray(item.driver_request_loads)
        ? (item.driver_request_loads[0]?.count ?? 0)
        : 0;

      return {
        id: item.id,
        tracking_code: item.tracking_code,
        status: item.status,
        created_at: item.created_at,

        driver: {
          id: driver.id,
          name: driver.name,
          phone: driver.phone,
        },

        vehicle: {
          id: vehicle.id,
          plate: vehicle.plate,
          transit_code: vehicle.transit_code,
          vehicle_type: vehicle.vehicle_type,
        },

        load_count: loadCount,
      };
    })
    .filter((request): request is AdminRequestListItem => request !== null);

  return {
    data: requests,
    total: count ?? 0,
  };
}




export async function getRequestById(
  requestId: string,
): Promise<DriverRequestDetails> {
  const { data, error } = await supabase
    .from("driver_requests")
    .select(
      `
      id,
      tracking_code,
      status,
      created_at,
      driver:drivers(
        id,
        name,
        phone
      ),
      vehicle:vehicles(
        id,
        plate,
        transit_code,
        vehicle_type
      ),
      driver_request_loads(
        status,
        load:loads(
          id,
          origin,
          destination,
          cargo_type,
          vehicle_type,
          trade_type,
          weight,
          price,
          cargo,
          currency,
          loading_date,
          status
        )
      )
    `,
    )
    .eq("id", requestId)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("درخواست پیدا نشد");
  }

  const driver = Array.isArray(data.driver) ? data.driver[0] : data.driver;

  const vehicle = Array.isArray(data.vehicle) ? data.vehicle[0] : data.vehicle;

  if (!driver || !vehicle) {
    throw new Error("اطلاعات راننده یا خودرو پیدا نشد");
  }

  const loads = (data.driver_request_loads ?? [])
    .map((item) => {
      const load = Array.isArray(item.load) ? item.load[0] : item.load;

      if (!load) {
        return null;
      }

      return {
        id: load.id,
        origin: load.origin,
        destination: load.destination,
        cargo: load.cargo,
        cargo_type: load.cargo_type,
        vehicle_type: load.vehicle_type,
        trade_type: load.trade_type,
        weight: load.weight,
        price: load.price,
        currency: load.currency,
        loading_date: load.loading_date,

     
        status: load.status,

       
        request_load_status: item.status,
      };
    })
    .filter(
      (load): load is DriverRequestDetails["loads"][number] => load !== null,
    );

  return {
    id: data.id,
    tracking_code: data.tracking_code,
    status: data.status,
    created_at: data.created_at,

    driver: {
      id: driver.id,
      name: driver.name,
      phone: driver.phone,
    },

    vehicle: {
      id: vehicle.id,
      plate: vehicle.plate,
      transit_code: vehicle.transit_code,
      vehicle_type: vehicle.vehicle_type,
    },

    loads,
  };
}






type RequestLoadMutationArgs = {
  requestId: string;
  loadId: string;
};

export async function assignLoadToRequest({
  requestId,
  loadId,
}: RequestLoadMutationArgs) {
  const { data, error } = await supabase.rpc("assign_load_to_request", {
    p_request_id: requestId,
    p_load_id: loadId,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function rejectLoadFromRequest({
  requestId,
  loadId,
}: RequestLoadMutationArgs) {
  const { data, error } = await supabase.rpc("reject_load_from_request", {
    p_request_id: requestId,
    p_load_id: loadId,
  });

  if (error) {
    throw error;
  }

  return data;
}





export type RequestLoad = {
  id: string;
  origin: string;
  destination: string;
  cargo: string | null;
  status: string;
  loading_date: string | null;
};



export async function getRequestByTrackingCode(
  trackingCode: string,
): Promise<RequestDetails | null> {
  const { data, error } = await supabase.rpc(
    "get_request_by_tracking_code",
    {
      p_tracking_code: trackingCode,
    },
  );

  if (error) {
    throw error;
  }

  return data as RequestDetails | null;
}

export async function getDriverRequestHistory({
  nationalId,
  phone,
  plate,
  transitCode,
}: {
  nationalId: string;
  phone: string;
  plate?: string;
  transitCode?: string;
}): Promise<RequestHistoryItem[]> {
  const { data, error } = await supabase.rpc(
    "get_driver_request_history",
    {
      p_national_id: nationalId,
      p_phone: phone,
      p_plate: plate || null,
      p_transit_code: transitCode || null,
    },
  );

  if (error) {
    throw error;
  }

  return (data ?? []) as RequestHistoryItem[];
}