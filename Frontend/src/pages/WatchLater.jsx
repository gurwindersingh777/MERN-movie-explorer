import MediaRow from "@/components/MediaRow";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAllWatchlater } from "@/hooks/useLibrary";
import { useDetails } from "@/hooks/useMedia";
import { ArrowLeft, OctagonX } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function WatchLater() {
  const { data, isPending } = useAllWatchlater();

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center pb-25">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-15 px-25 flex justify-center  w-full h-full">
      {data.length > 0 ? (
        <MediaRow data={data} title={"Watchlaters"} more={false} wrap={true} />
      ) : (
        <div className="flex flex-col gap-5 w-full h-full justify-center items-center pb-20">
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
    </div>
  );
}
