import { useMutation } from "@tanstack/react-query";
import {
  createLoadAvailabilityAlert,
  type CreateLoadAvailabilityAlertInput,
} from "../../services/loadAvailabilityAlertService";

export function useCreateLoadAvailabilityAlert() {
  return useMutation({
    mutationFn: (data: CreateLoadAvailabilityAlertInput) =>
      createLoadAvailabilityAlert(data),
  });
}
