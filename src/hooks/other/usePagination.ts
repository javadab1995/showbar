
type PaginationItem = number | "...";

export function usePagination(
  totalItems: number,
  pageSize: number,
  currentPage: number,
): PaginationItem[] {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) {
    return [];
  }

  const siblingCount = 1;

  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= totalPages) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  const leftSiblingIndex = Math.max(
    currentPage - siblingCount,
    1,
  );

  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPages,
  );

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + siblingCount * 2;

    return [
      ...Array.from(
        { length: leftItemCount },
        (_, index) => index + 1,
      ),
      "...",
      totalPages,
    ];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + siblingCount * 2;

    return [
      1,
      "...",
      ...Array.from(
        { length: rightItemCount },
        (_, index) =>
          totalPages - rightItemCount + index + 1,
      ),
    ];
  }

  return [
    1,
    "...",
    ...Array.from(
      {
        length:
          rightSiblingIndex - leftSiblingIndex + 1,
      },
      (_, index) => leftSiblingIndex + index,
    ),
    "...",
    totalPages,
  ];
}

