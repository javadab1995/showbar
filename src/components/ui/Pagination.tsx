// components/ui/Pagination.tsx
import React from "react";
import { usePagination } from "../../hooks/usePagination";


interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const paginationRange = usePagination(totalItems, pageSize, currentPage);

  return (
    <div className="flex items-center gap-1">
      {paginationRange.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() =>
            typeof pageNumber === "number" && onPageChange(pageNumber)
          }
          disabled={pageNumber === "..."}
          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all 
            ${pageNumber === "..." ? "cursor-default text-text/50" : "hover:bg-text-text/10"}
            ${currentPage === pageNumber ? "bg-primary-radial text-surface font-medium" : "text-text/75"}
          `}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};
