import MediaRow from "@/components/MediaRow";
import { Spinner } from "@/components/ui/spinner";
import { useDiscover } from "@/hooks/useMedia";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function GenrePage() {
  const { media_type, genre_name, genre_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isPending, isError } = useDiscover(media_type, {
    with_genres: genre_id,
    page,
  });
  const totalPages = Math.min(data?.total_pages || 1, 500);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isPending) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center pb-25">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center pb-25 text-sm text-neutral-300">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="p-15 px-25 flex flex-col gap-5 justify-center w-full h-full">
      {data?.results.length > 0 && (
        <MediaRow
          data={data?.results}
          title={genre_name}
          more={false}
          wrap={true}
        />
      )}
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setSearchParams({ page: page - 1 })}
              />
            </PaginationItem>
          )}

          {page > 2 && (
            <PaginationItem>
              <PaginationLink onClick={() => setSearchParams({ page: 1 })}>
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
                onClick={() => setSearchParams({ page: page - 1 })}
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
                onClick={() => setSearchParams({ page: page + 1 })}
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
                onClick={() => setSearchParams({ page: totalPages })}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext
                onClick={() => setSearchParams({ page: page + 1 })}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
