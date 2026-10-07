import { generateTrackingCode } from "../helpers/helper";
import { CreateRequestArgs } from "../types/request";
import supabase from "./supabase";
import type { AdminDriverListItem } from "../types/drivers";
import { DriverRequestStatus } from "../types/status";


export async function createDriverRequest(data: CreateRequestArgs) {
  if (!data.loadIds.length) {
    throw new Error("هیچ باری انتخاب نشده است");
  }

  // -------------------------
  // Tracking Code
  // -------------------------

  const trackingCode = generateTrackingCode();

  
  const { data: requestId, error } = await supabase.rpc(
    "create_driver_request",
    {
      p_name: data.name.trim(),
      p_national_id: data.nationalID.trim(),
      p_phone: data.phone.trim(),
      p_vehicle_type: data.vehicleType,
      p_identifier_type: data.identifierType,

      p_plate:
        data.identifierType === "PLATE"
          ? data.plate?.trim() || null
          : null,

      p_transit_code:
        data.identifierType === "TRANSIT"
          ? data.transitCode?.trim() || null
          : null,

      p_trade_type: data.tradeType,
      p_tracking_code: trackingCode,
      p_note: data.note?.trim() || null,
      p_load_ids: data.loadIds,
    },
  );

  if (error) {
      console.error("RPC ERROR:", error);
    throw error;
  }

  return {
    id: requestId,
    tracking_code: trackingCode,
  };
}







type GetDriversParams = {
  page?: number;
  pageSize?: number;
  query?: string;
};

export async function getDrivers({
  page = 1,
  pageSize = 20,
  query = "",
}: GetDriversParams = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const search = query.trim();

  let driverIds: string[] | null = null;

  if (search) {
    const [driversResult, vehiclesResult] = await Promise.all([
      supabase
        .from("drivers")
        .select("id")
        .or(
          `name.ilike.%${search}%,national_id.ilike.%${search}%,phone.ilike.%${search}%`,
        ),

      supabase
        .from("vehicles")
        .select(
          `
          id,
          plate,
          transit_code,
          vehicle_drivers(
            driver_id
          )
        `,
        )
        .or(`plate.ilike.%${search}%,transit_code.ilike.%${search}%`),
    ]);

    if (driversResult.error) {
      throw driversResult.error;
    }

    if (vehiclesResult.error) {
      throw vehiclesResult.error;
    }

    const idsFromDrivers = (driversResult.data ?? []).map(
      (driver) => driver.id,
    );

    const idsFromVehicles = (vehiclesResult.data ?? []).flatMap((vehicle) =>
      (vehicle.vehicle_drivers ?? []).map((relation) => relation.driver_id),
    );

    driverIds = [...new Set([...idsFromDrivers, ...idsFromVehicles])];

    if (!driverIds.length) {
      return {
        data: [],
        total: 0,
      };
    }
  }

  let request = supabase
    .from("drivers")
    .select(
      `
        id,
        name,
        national_id,
        phone,
        created_at,

        vehicle_drivers(
          vehicle:vehicles(
            id,
            plate,
            transit_code,
            vehicle_type
          )
        ),

        driver_requests(
          id,
          tracking_code,
          status,
          created_at,
          vehicle:vehicles(
            id,
            plate,
            transit_code,
            vehicle_type
          )
        )
      `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (driverIds) {
    request = request.in("id", driverIds);
  }

  const { data, error, count } = await request;

  if (error) {
    throw error;
  }

  const normalized: AdminDriverListItem[] = (data ?? []).map((driver) => {
    const vehicles = (driver.vehicle_drivers ?? [])
      .map((relation) => {
        const vehicle = Array.isArray(relation.vehicle)
          ? relation.vehicle[0]
          : relation.vehicle;

        if (!vehicle) return null;

        return {
          id: vehicle.id,
          plate: vehicle.plate,
          transit_code: vehicle.transit_code,
          vehicle_type: vehicle.vehicle_type,
        };
      })
      .filter(
        (vehicle): vehicle is NonNullable<typeof vehicle> => vehicle !== null,
      );

    const requests = [...(driver.driver_requests ?? [])].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    const latestRequest = (driver.driver_requests ?? []).reduce(
      (latest, current) => {
        if (!latest) return current;

        return new Date(current.created_at).getTime() >
          new Date(latest.created_at).getTime()
          ? current
          : latest;
      },
      null as (typeof driver.driver_requests)[number] | null,
    );
    

  let lastRequest: AdminDriverListItem["last_request"] = null;

  if (latestRequest) {
    const vehicle = Array.isArray(latestRequest.vehicle)
      ? latestRequest.vehicle[0]
      : latestRequest.vehicle;

    lastRequest = {
      id: latestRequest.id,
      tracking_code: latestRequest.tracking_code,
      status: latestRequest.status as DriverRequestStatus,
      created_at: latestRequest.created_at,
      vehicle: vehicle
        ? {
            id: vehicle.id,
            plate: vehicle.plate,
            transit_code: vehicle.transit_code,
            vehicle_type: vehicle.vehicle_type,
          }
        : null,
    };
  }

    return {
      id: driver.id,
      name: driver.name,
      national_id: driver.national_id,
      phone: driver.phone,
      vehicles,
      last_request: lastRequest,
    };
  });



  return {
    data: normalized,
    total: count ?? 0,
  };
}





export async function getDriver(id: string) {
  const { data, error } = await supabase
    .from("drivers")
    .select(
      `
      id,
      name,
      national_id,
      phone,
      created_at,

      vehicle_drivers(
        vehicle:vehicles(
          id,
          plate,
          transit_code,
          vehicle_type,
          identifier_type,
          status
        )
      ),

      driver_requests(
        id,
        tracking_code,
        status,
        created_at,

        vehicle:vehicles(
          id,
          plate,
          transit_code,
          vehicle_type,
          identifier_type
        ),

        driver_request_loads(
          load:loads(
            id,
            origin,
            destination,
            cargo_type,
            vehicle_type,
            trade_type,
            weight,
            price,
            loading_date,
            status
          )
        )
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("راننده پیدا نشد");
  }

  const vehicles = (data.vehicle_drivers ?? [])
    .map((relation) => {
      const vehicle = Array.isArray(relation.vehicle)
        ? relation.vehicle[0]
        : relation.vehicle;

      if (!vehicle) return null;

      return vehicle;
    })
    .filter(
      (vehicle): vehicle is NonNullable<typeof vehicle> => vehicle !== null,
    );

  const requests = [...(data.driver_requests ?? [])]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .map((request) => {
      const vehicle = Array.isArray(request.vehicle)
        ? request.vehicle[0]
        : request.vehicle;

      const loads = (request.driver_request_loads ?? [])
        .map((relation) => {
          const load = Array.isArray(relation.load)
            ? relation.load[0]
            : relation.load;

          return load ?? null;
        })
        .filter((load): load is NonNullable<typeof load> => load !== null);

      return {
        id: request.id,
        tracking_code: request.tracking_code,
        status: request.status,
        created_at: request.created_at,

        vehicle: vehicle ?? null,

        loads,
      };
    });

  return {
    id: data.id,
    name: data.name,
    national_id: data.national_id,
    phone: data.phone,
    created_at: data.created_at,

    vehicles,
    requests,
  };
}
