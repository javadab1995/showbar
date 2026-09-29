import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { duplicateLoad } from "../../services/apiLoads";

export function useDuplicateLoad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => duplicateLoad(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-loads"],
      });

      toast.success("بار با موفقیت کپی شد");
    },

    onError: (error: Error) => {
      toast.error(error.message || "کپی بار انجام نشد");
    },
  });
}
