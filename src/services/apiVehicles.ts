
import {   VehicleDetails, VehicleFilters } from "../types/vehicles";
import supabase from "./supabase";

export async function getVehicles(filters: VehicleFilters = {}) {
  const {
    search,
    vehicleType,
    status,
    identifierType,
    sortBy = "created_at",
    sortOrder = "desc",
    page = 1,
    limit = 10,
  } = filters;

  let query = supabase.from("vehicles").select("*", {
    count: "exact",
  });

  // جستجو
  if (search) {
    query = query.or(
      `
      plate.ilike.%${search}%,
      transit_code.ilike.%${search}%,
      vehicle_type.ilike.%${search}%
      `,
    );
  }

  // فیلتر نوع خودرو
  if (vehicleType) {
    query = query.eq("vehicle_type", vehicleType);
  }

  // فیلتر وضعیت
  if (status) {
    query = query.eq("status", status);
  }

  // نوع شناسه
  if (identifierType) {
    query = query.eq("identifier_type", identifierType);
  }

  // sort
  query = query.order(sortBy, {
    ascending: sortOrder === "asc",
  });

  // pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    data,
    count: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  };
}



export async function getVehicleDetails(vehicleId: string) {
  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single();

  if (vehicleError) {
    throw vehicleError;
  }



  const { data: vehicleDrivers, error: driversError } = await supabase
    .from("vehicle_drivers")
    .select(
      `
      id,
      created_at,
      driver:drivers (
        id,
        name,
        phone,
        national_id
      )
    `,
    )
    .eq("vehicle_id", vehicleId)
    .order("created_at", {
      ascending: false,
    });
  



  if (driversError) {
    throw driversError;
  }

  const { data: assignments, error: assignmentsError } = await supabase
    .from("load_assignments")
    .select(
      `
      id,
      assigned_at,

      load:loads!load_assignments_load_id_fkey (
        id,
        origin,
        destination,
        cargo,
        cargo_type,
        weight,
        price,
        currency,
        status,
        loading_date
      ),

      driver:drivers (
        id,
        name,
        phone
      )
    `,
    )
    .eq("vehicle_id", vehicleId)
    .order("assigned_at", {
      ascending: false,
    });



  if (assignmentsError) {
    throw assignmentsError;
  }

  const { data: requests, error: requestsError } = await supabase
    .from("driver_requests")
    .select(
      `
      id,
      status,
      created_at,

      driver:drivers (
        id,
        name,
        phone
      ),

      vehicle:vehicles (
        id,
        plate,
        transit_code
      ),

      loads:driver_request_loads (
        status,

        load:loads (
          id,
          origin,
          destination,
          cargo,
          weight,
          price,
          currency
        )
      )
    `,
    )
    .eq("vehicle_id", vehicleId)
    .order("created_at", {
      ascending: false,
    });


  if (requestsError) {
    throw requestsError;
  }


 return {
   vehicle,
   drivers: vehicleDrivers ?? [],
   assignments: assignments ?? [],
   requests: requests ?? [],
 } as unknown as VehicleDetails;
}