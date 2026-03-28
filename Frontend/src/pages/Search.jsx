import MediaRow from "@/components/MediaRow";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSearch } from "@/hooks/useMedia";
import { ArrowLeft, OctagonX } from "lucide-react";
import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PageWrapper from "@/components/PageWrapper";
import MediaPagination from "@/components/MediaPagination";

export default function Search() {
  const { q } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isPending, isError } = useSearch(q, page);
  const totalPages = Math.min(data?.total_pages || 1, 500);

  if (isPending) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center pb-25">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center pb-25 text-sm text-neutral-300">
        Something went wrong
      </div>
    );
  }

  return (
    <PageWrapper>
   
        {data?.results?.length > 0 && (
          <div className="flex min-h-screen w-full flex-col gap-8 px-9 py-6 sm:px-6 md:px-10 lg:px-16 xl:px-24">
            <MediaRow
              data={data?.results}
              title={q}
              more={false}
              wrap={true}
            />

            <div className="flex justify-center pt-4">
              <MediaPagination
                totalPages={totalPages}
                page={page}
                setSearchParams={setSearchParams}
              />
            </div>
          </div>
        )}
    
    </PageWrapper>
  );
}
