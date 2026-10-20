import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { archiveExpiredLoads } from "../../services/apiLoads";


export function useArchiveExpiredLoads() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveExpiredLoads,

    onSuccess: async (count) => {
      await queryClient.invalidateQueries({
        queryKey: ["admin-loads"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["loads"],
      });

      if (count === 0) {
        toast.success("هیچ بار فعال تاریخ‌گذشته‌ای برای آرشیو وجود نداشت.");
        return;
      }

      toast.success(`${count.toLocaleString("fa-IR")} بار با موفقیت آرشیو شد.`);
    },

    onError: (error: Error) => {
      toast.error(error.message || "آرشیو بارهای تاریخ‌گذشته انجام نشد.");
    },
  });
}
