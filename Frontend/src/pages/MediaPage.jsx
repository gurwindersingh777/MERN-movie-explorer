import MediaRow from "@/components/MediaRow";
import MediaPagination from "@/components/MediaPagination";
import { Spinner } from "@/components/ui/spinner";
import { useCategory, useTrending } from "@/hooks/useMedia";
import { useEffect } from "react";
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
    category === "trending"
      ? `Trending by ${time_window}`
      : `${category.replace("_", " ")}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-sm text-neutral-300">
        Something went wrong
      </div>
    );
  }

  return (
    <>
      {data?.results?.length > 0 && (
        <div className="flex min-h-screen w-full flex-col gap-8 px-9 py-6 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          
          <MediaRow
            data={data?.results}
            title={title}
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
    </>
  );
}