import { useQuery } from "@tanstack/react-query";
import { getVehicleDetails } from "../../services/apiVehicles";

export function useVehicleDetails(vehicleId?: string) {
  return useQuery({
    queryKey: ["vehicle-details", vehicleId],
    queryFn: () => getVehicleDetails(vehicleId!),
    enabled: Boolean(vehicleId),
  });
}
