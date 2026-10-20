import { useQuery } from "@tanstack/react-query";

import {
  getAdminPosts,
  type PostStatus,
  type PostType,
} from "../../services/apiPosts";

interface UseAdminPostsParams {
  page: number;
  pageSize: number;
  query: string;
  status: PostStatus | "";
  type: PostType | "";
  sort: "newest" | "oldest";
}

export function useAdminPosts(params: UseAdminPostsParams) {
  return useQuery({
    queryKey: ["admin-posts", params],
    queryFn: () => getAdminPosts(params),
    placeholderData: (previousData) => previousData,
  });
}
