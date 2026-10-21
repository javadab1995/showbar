import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { restoreLoad } from "../../services/apiLoads";

export function useRestoreLoad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreLoad,

    onSuccess: (load) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-loads"],
      });

      queryClient.invalidateQueries({
        queryKey: ["load", load.id],
      });

      toast.success("بار از آرشیو خارج شد.");
    },

    onError: () => {
      toast.error("بازگردانی بار انجام نشد.");
    },
  });
}
