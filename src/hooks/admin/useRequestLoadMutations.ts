import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  assignLoadToRequest,
  rejectLoadFromRequest,
} from "../../services/apiRequest";

import { useOnlineStatus } from "../other/useOnlineStatus";

type RequestLoadMutationArgs = {
  requestId: string;
  loadId: string;
};

export function useAssignLoadToRequest() {
  const queryClient = useQueryClient();
  const isOnline = useOnlineStatus();

  return useMutation({
    mutationFn: (data: RequestLoadMutationArgs) => {
      if (!isOnline) {
        throw new Error("برای تخصیص بار، اتصال به اینترنت لازم است.");
      }

      return assignLoadToRequest(data);
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["request-details", variables.requestId],
      });

      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["loads"],
      });
    },
  });
}

export function useRejectLoadFromRequest() {
  const queryClient = useQueryClient();
  const isOnline = useOnlineStatus();

  return useMutation({
    mutationFn: (data: RequestLoadMutationArgs) => {
      if (!isOnline) {
        throw new Error("برای رد بار، اتصال به اینترنت لازم است.");
      }

      return rejectLoadFromRequest(data);
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["request-details", variables.requestId],
      });

      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
    },
  });
}
