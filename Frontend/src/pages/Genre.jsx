import { Spinner } from "@/components/ui/spinner";
import { useGenre } from "@/hooks/useMedia";
import { Clapperboard, TvMinimalPlay } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Genre() {
  const {
    data: movieGenres,
    isPending: moviePending,
    isError: movieError,
  } = useGenre("movie");
  const {
    data: tvGenres,
    isPending: tvPending,
    isError: tvError,
  } = useGenre("tv");

  if (moviePending || tvPending) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center pb-25">
        <Spinner />
      </div>
    );
  }

  if (movieError || tvError) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center pb-25 text-sm text-neutral-300">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-16 p-10 sm:p-15 sm:px-25">
      {movieGenres && (
        <div>
          <h1 className="mb-8 flex items-center gap-2 font-semibold sm:text-2xl">
            <Clapperboard /> Movies
          </h1>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {movieGenres.genres?.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/movie/${genre.name}/${genre.id}`}
              >
                <div className="flex h-20 cursor-pointer items-center justify-center rounded-xl border border-neutral-700 bg-linear-to-br from-neutral-800 to-neutral-900 transition hover:scale-105 hover:border-neutral-500 sm:h-28">
                  <h4 className="text-sm font-medium sm:text-lg text-center ">
                    {genre.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {tvGenres && (
        <div>
          <h1 className="mb-8 flex items-center gap-3 text-2xl font-semibold">
            <TvMinimalPlay /> TV Shows
          </h1>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {tvGenres?.genres.map((genre) => (
              <Link key={genre.id} to={`/genre/tv/${genre.name}/${genre.id}`}>
                <div className="flex h-20 cursor-pointer items-center justify-center rounded-xl border border-neutral-700 bg-linear-to-br from-neutral-800 to-neutral-900 transition hover:scale-105 hover:border-neutral-500 sm:h-28">
                  <h4 className="text-center text-sm font-medium sm:text-lg">
                    {genre.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
