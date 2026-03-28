import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function MediaPagination({
  totalPages,
  page,
  setPage = null,
  setSearchParams = null,
}) {
  const goToPage = (p) => {
    setPage ? setPage(p) : setSearchParams({ page: p });
  };

  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
        {/* Previous */}
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={prevPage} />
          </PaginationItem>
        )}

        {/* First page */}
        {page > 2 && (
          <PaginationItem className="hidden sm:block">
            <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis */}
        {page > 3 && (
          <PaginationItem className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Previous number */}
        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={prevPage}>{page - 1}</PaginationLink>
          </PaginationItem>
        )}

        {/* Current */}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {/* Next number */}
        {page + 1 <= totalPages && (
          <PaginationItem>
            <PaginationLink onClick={nextPage}>{page + 1}</PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis */}
        {page + 2 < totalPages && (
          <PaginationItem className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page */}
        {page + 1 < totalPages && (
          <PaginationItem className="hidden sm:block">
            <PaginationLink onClick={() => goToPage(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next */}
        {page < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={nextPage} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
