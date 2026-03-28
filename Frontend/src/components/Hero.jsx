import { Info, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Link } from "react-router-dom";
import { useDetails } from "@/hooks/useMedia";

export default function Hero({ query }) {
  const { data, isPending, isError, refetch } = query;

  const media = data?.results[0];
  const background = `https://image.tmdb.org/t/p/original${media?.backdrop_path}`;

  const { data: details } = useDetails(media?.media_type, media?.id);

  if (isPending)
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <Spinner />
      </div>
    );

  if (isError) {
    refetch;
    return (
      <div className="flex h-40 w-full items-center justify-center text-neutral-400">
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <>
      {media && (
        <div
          className="relative flex min-h-[60vh] w-full items-end bg-cover bg-center md:min-h-[70vh] lg:min-h-[80vh] rounded-3xl"
          style={{ backgroundImage: `url(${background})` }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-[#111111]/70 to-transparent" />

          {/* Content */}
          <div className="relative z-10 max-w-xl px-5 pb-8 pt-20 sm:px-8 md:px-12 lg:px-16">
            
            <h1 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {media.title || media.name}
            </h1>

            <p className="text-xs text-gray-300 sm:text-sm md:text-base line-clamp-3">
              {media.overview}
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`${details?.homepage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full sm:w-auto">
                  Watch Now <Play />
                </Button>
              </Link>

              <Link to={`/media-details/${media.media_type}/${media.id}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  More Info <Info />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}