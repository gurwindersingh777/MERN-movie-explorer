import { Spinner } from "@/components/ui/spinner";
import { useGenre } from "@/hooks/useMedia";
import { Clapperboard, TvMinimalPlay } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Genre() {
  const { data: movieGenres, isPending } = useGenre("movie");
  const { data: tvGenres } = useGenre("tv");

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center pb-25">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-15 px-25 flex flex-col gap-16 w-full h-full">
      {movieGenres && (
        <div>
          <h1 className="flex gap-2 items-center text-2xl font-semibold mb-8">
            <Clapperboard /> Movies
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {movieGenres.genres?.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/movie/${genre.name}/${genre.id}`}
              >
                <div
                  className="h-28 rounded-xl flex items-center justify-center
                bg-linear-to-br from-neutral-800 to-neutral-900
                border border-neutral-700 cursor-pointer
                hover:scale-105 hover:border-neutral-500 transition"
                >
                  <h4 className="text-lg font-medium">{genre.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {tvGenres && (
        <div>
          <h1 className="flex gap-3 items-center text-2xl font-semibold mb-8">
            <TvMinimalPlay /> TV Shows
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {tvGenres?.genres.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/tv/${genre.name}/${genre.id}`}
              >
                <div
                  className="h-28 rounded-xl flex items-center justify-center
                bg-linear-to-br from-neutral-800 to-neutral-900
                border border-neutral-700 cursor-pointer
                hover:scale-105 hover:border-neutral-500 transition"
                >
                  <h4 className="text-lg font-medium">{genre.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
