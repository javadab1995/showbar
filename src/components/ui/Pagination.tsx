import React from "react";

import { usePagination } from "../../hooks/usePagination";

import type { PaginationProps } from "../../types";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginationRange = usePagination(totalItems, pageSize, currentPage);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {paginationRange.map((pageNumber, index) => (
          <button
            key={`${pageNumber}-${index}`}
            disabled={pageNumber === "..."}
            onClick={() => {
              if (typeof pageNumber === "number") {
                onPageChange(pageNumber);
              }
            }}
            className={`
              flex size-8 items-center justify-center
              rounded-lg text-sm transition-all

              ${
                pageNumber === "..."
                  ? "cursor-default text-text/50"
                  : "text-text/75 hover:bg-text/10"
              }

              ${
                currentPage === pageNumber
                  ? "bg-primary-radial font-medium text-surface"
                  : ""
              }
            `}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <span className="text-xs text-text/60">
        {currentPage} / {totalPages}
      </span>
    </div>
  );
};
