import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost, type CreatePostInput } from "../../services/apiPosts";

interface UpdatePostVariables {
  id: string;
  input: CreatePostInput;
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: UpdatePostVariables) => updatePost(id, input),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["admin-posts"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["admin-post", variables.id],
        }),
      ]);
    },
  });
}
