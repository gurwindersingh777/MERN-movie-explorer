import MediaRow from "@/components/MediaRow";
import MediaPagination from "@/components/MediaPagination";
import { Spinner } from "@/components/ui/spinner";
import { useDiscover } from "@/hooks/useMedia";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";


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
    <>
      {data?.results.length > 0 && (
        <div className="p-15 px-25 flex flex-col gap-5 justify-center w-full h-full">
          <MediaRow
            data={data?.results}
            title={genre_name}
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
