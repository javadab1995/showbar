import { useCallback, useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
  hasNextPage: boolean;

  isFetchingNextPage: boolean;

  fetchNextPage: () => void;
};

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasNextPage) {
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
    [hasNextPage, isFetchingNextPage, fetchNextPage],
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
