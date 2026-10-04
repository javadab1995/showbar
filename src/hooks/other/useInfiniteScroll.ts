import { useCallback, useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  enabled?: boolean;
};

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  enabled = true,
}: UseInfiniteScrollProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (!enabled) {
        return;
      }

      if (isFetchingNextPage) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasNextPage && enabled) {
            fetchNextPage();
          }
        },
        {
          rootMargin: "200px",
        },
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [enabled, hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return {
    lastItemRef,
  };
}
