import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateLoadStatus } from "../../services/apiLoads";
import { LoadStatus } from "../../types/status";



export function useUpdateLoadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LoadStatus }) =>
      updateLoadStatus(id, status),

    onSuccess: (load) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-loads"],
      });

      queryClient.invalidateQueries({
        queryKey: ["load", load.id],
      });

      toast.success("وضعیت بار با موفقیت تغییر کرد");
    },

    onError: (error: Error) => {
      toast.error(error.message || "تغییر وضعیت بار انجام نشد");
    },
  });
}
