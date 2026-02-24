import { Info, Play } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export default function Hero({ query }) {
  const { data, isPending, isError } = query;

  const media = data?.results[0];
  const background = `https://image.tmdb.org/t/p/original${media?.backdrop_path}`;

  if (isPending)
    return (
      <div className="w-full h-50  flex justify-center items-center text-xs">
        <Spinner/>
      </div>
    );
  if (isError) {
    refetch;
    return (
      <div className="w-full h-50  flex justify-center items-center text-xs text-neutral-400">
        <p>Something went wrong while loading : {title}</p>
      </div>
    );
  }

  return (
    <>
      {media && (
        <div
          className="relative rounded-4xl  h-screen w-full bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-[#111111] bg-neutral-900/50 " />

          <div className=" z-10 p-15 w-2xl">
            <h1 className="r text-4xl font-bold tracking-tight text-balance mb-4">
              {media.title}
            </h1>
            <p className="text-sm text-gray-300 line-clamp-3 ">
              {media.overview}
            </p>

            <div className="mt-6 flex gap-4">
              <Button size="lg">
                Watch Now <Play />
              </Button>
              <Button variant="outline" size="lg">
                More Info <Info />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
