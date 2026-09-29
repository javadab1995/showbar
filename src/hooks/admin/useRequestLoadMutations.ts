import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  assignLoadToRequest,
  rejectLoadFromRequest,
} from "../../services/apiRequest";

type RequestLoadMutationArgs = {
  requestId: string;
  loadId: string;
};

export function useAssignLoadToRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RequestLoadMutationArgs) => assignLoadToRequest(data),

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

  return useMutation({
    mutationFn: (data: RequestLoadMutationArgs) => rejectLoadFromRequest(data),

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
