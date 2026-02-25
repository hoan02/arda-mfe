import { Button } from "@workspace/ui/components/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function SimplePagination({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
}: SimplePaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalElements);

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-gray-500">
        Showing {startItem} to {endItem} of {totalElements} results
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center space-x-1">
          <span className="text-sm">
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
