import MediaPagination from "@/components/MediaPagination";
import MediaRow from "@/components/MediaRow";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAllWatchlater } from "@/hooks/useLibrary";
import { ArrowLeft, OctagonX } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function WatchLater() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isPending } = useAllWatchlater(page);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center pb-25">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {data?.results?.length > 0 ? (
        <div className="p-15 px-25 flex flex-col gap-5 w-full min-h-screen">
          <MediaRow
            data={data.results}
            title={"Watchlaters"}
            more={false}
            wrap={true}
          />
          <MediaPagination
            totalPages={data.totalPages}
            page={data.page}
            setSearchParams={setSearchParams}
          />
        </div>
      ) : (
        <div className="p-15 px-25 flex flex-col gap-5 w-full h-full justify-center items-center pb-20">
          <span className="flex items-center justify-center gap-2">
            <OctagonX />
            There is no Watchlater
          </span>
          <Link to="/">
            <Button>
              <ArrowLeft />
              Back to home
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
