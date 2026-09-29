import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


import { LoadData } from "../../types/load";
import { updateLoad } from "../../services/apiLoads";

export function useUpdateLoad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LoadData }) =>
      updateLoad(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["loads"],
      });

      queryClient.invalidateQueries({
        queryKey: ["load", variables.id],
      });

      toast.success("تغییرات بار با موفقیت ذخیره شد");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
