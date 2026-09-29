import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createLoad } from "../../services/apiLoads";



export function useCreateLoad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLoad,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loads"],
      });

      toast.success("بار جدید با موفقیت ثبت شد");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
