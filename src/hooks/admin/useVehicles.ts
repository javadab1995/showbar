import { useQuery } from "@tanstack/react-query";
import { VehicleFilters } from "../../types/vehicles";
import { getVehicles } from "../../services/apiVehicles";


export function useVehicles(filters: VehicleFilters) {
  return useQuery({
    queryKey: ["vehicles", filters],

    queryFn: () => getVehicles(filters),
  });
}
