import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deactivateLoad } from "../../services/apiLoads";

export function useDeactivateLoad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deactivateLoad(id),

    onSuccess: (load) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-loads"],
      });

      queryClient.invalidateQueries({
        queryKey: ["load", load.id],
      });

      toast.success("بار غیرفعال شد");
    },

    onError: (error: Error) => {
      toast.error(error.message || "غیرفعال کردن بار انجام نشد");
    },
  });
}
