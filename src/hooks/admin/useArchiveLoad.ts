import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { archiveLoad } from "../../services/apiLoads";

export function useArchiveLoad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => archiveLoad(id),

    onSuccess: (load) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-loads"],
      });

      queryClient.invalidateQueries({
        queryKey: ["load", load.id],
      });

      toast.success("بار با موفقیت آرشیو شد");
    },

    onError: (error: Error) => {
      toast.error(error.message || "آرشیو کردن بار انجام نشد");
    },
  });
}
