import MediaRow from "@/components/MediaRow";
import { Spinner } from "@/components/ui/spinner";
import { useDiscover } from "@/hooks/useMedia";
import React from "react";
import { useParams } from "react-router-dom";

export default function GenreDetails() {
  const { media_type, genre_name, genre_id } = useParams();

  const { data, isPending } = useDiscover(media_type, {
    with_genres: genre_id,
    page: 1,
  });

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center pb-25">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-15 px-25 flex justify-center w-full h-full">
      {data?.results.length > 0 && (
        <MediaRow data={data?.results} title={genre_name} more={false} wrap={true} />
      )}
      <button></button>
    </div>
  );
}
