import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, type CreatePostInput } from "../../services/apiPosts";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin-posts"],
      });
    },
  });
}
