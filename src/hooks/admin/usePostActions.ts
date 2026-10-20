import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { archivePost, deletePost } from "../../services/apiPosts";

export function useArchivePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archivePost,

    onSuccess: async (_, id) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["admin-posts"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["admin-post", id],
        }),
      ]);

      toast.success("مطلب به آرشیو منتقل شد.");
    },

    onError: (error: Error) => {
      toast.error(error.message || "آرشیو مطلب ناموفق بود.");
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: async (_, id) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["admin-posts"],
        }),
        queryClient.removeQueries({
          queryKey: ["admin-post", id],
        }),
      ]);

      toast.success("مطلب حذف شد.");
    },

    onError: (error: Error) => {
      toast.error(error.message || "حذف مطلب ناموفق بود.");
    },
  });
}
