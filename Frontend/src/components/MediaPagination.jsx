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
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setPage
                  ? setPage((prev) => prev - 1)
                  : setSearchParams({ page: page - 1 });
              }}
            />
          </PaginationItem>
        )}

        {page > 2 && (
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                setPage ? setPage(1) : setSearchParams({ page: 1 })
              }
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                setPage
                  ? setPage((prev) => prev - 1)
                  : setSearchParams({ page: page - 1 })
              }
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive> {page} </PaginationLink>
        </PaginationItem>

        {page + 1 < totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                setPage
                  ? setPage((prev) => prev + 1)
                  : setSearchParams({ page: page + 1 })
              }
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page + 2 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page < totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                setPage
                  ? setPage(totalPages)
                  : setSearchParams({ page: totalPages })
              }
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPage
                  ? setPage((prev) => prev + 1)
                  : setSearchParams({ page: page + 1 })
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
