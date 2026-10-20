import { useQuery } from "@tanstack/react-query";

import {
  getFeaturedPost,
  getPublishedPostBySlug,
  getPublishedPosts,
  getRelatedPosts,
  type GetPublishedPostsParams,
} from "../../services/apiPosts";

export function usePublishedPosts(params: GetPublishedPostsParams) {
  return useQuery({
    queryKey: ["public-posts", params],
    queryFn: () => getPublishedPosts(params),
  });
}

export function useFeaturedPost() {
  return useQuery({
    queryKey: ["public-post-featured"],
    queryFn: getFeaturedPost,
  });
}

export function usePublishedPost(slug: string | undefined) {
  return useQuery({
    queryKey: ["public-post", slug],
    queryFn: () => getPublishedPostBySlug(slug!),
    enabled: Boolean(slug),
  });
}

export function useRelatedPosts(
  category: string | null | undefined,
  postId: string | undefined,
) {
  return useQuery({
    queryKey: ["public-related-posts", category, postId],
    queryFn: () => getRelatedPosts(category ?? null, postId!),
    enabled: Boolean(postId),
  });
}
