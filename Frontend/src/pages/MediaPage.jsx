import MediaRow from "@/components/MediaRow";
import MediaPagination from "@/components/MediaPagination";
import { Spinner } from "@/components/ui/spinner";
import { useCategory, useTrending } from "@/hooks/useMedia";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function MediaPage() {
  const { category, media_type, time_window } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const query =
    category === "trending"
      ? useTrending(media_type, time_window, { page })
      : useCategory(media_type, category, { page });

  const { data, isPending, isError } = query;

  const totalPages = Math.min(data?.total_pages || 1, 500);

  const title =
    category === "trending" ? `Trending by ${time_window}` : `${category}`;

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
    <>
      {data?.results?.length > 0 && (
        <div className="p-15 px-25 flex flex-col gap-5 w-full min-h-screen ">
          <MediaRow
            data={data?.results}
            title={title}
            more={false}
            wrap={true}
          />
          <MediaPagination
            totalPages={totalPages}
            page={page}
            setSearchParams={setSearchParams}
          />
        </div>
      )}
    </>
  );
}
