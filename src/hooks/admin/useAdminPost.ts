import { useQuery } from "@tanstack/react-query";
import { getAdminPost } from "../../services/apiPosts";

export function useAdminPost(id: string) {
  return useQuery({
    queryKey: ["admin-post", id],
    queryFn: () => getAdminPost(id),
    enabled: Boolean(id),
  });
}
