import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDetails } from "@/hooks/useMedia";
import {
  Bookmark,
  Calendar,
  Clock,
  Heart,
  Image,
  Languages,
  Play,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import MediaRow from "@/components/MediaRow";
import {
  useAddToFavorite,
  useAddToWatchlater,
  useMediaFavorite,
  useMediaWatchlater,
  useRemoveFromFavorite,
  useRemoveFromWatchlater,
} from "@/hooks/useLibrary";
import Review from "@/components/Review";
import PageWrapper from "@/components/PageWrapper";

export default function MediaDetails() {
  const { media_type, id: tmdbID } = useParams();
  const { data, isLoading } = useDetails(media_type, tmdbID);

  const { data: watchlater, isFetching: WLfetching } =
    useMediaWatchlater(tmdbID);

  const { data: favorite, isFetching: Favfetching } = useMediaFavorite(tmdbID);

  const video = data?.videos?.results?.find(
    (video) => video.type === "Trailer" || video.type === "Teaser",
  );

  const { mutate: addToWatchlater, isPending: addWLPending } =
    useAddToWatchlater();

  const { mutate: addToFavorite, isPending: addFavPending } =
    useAddToFavorite();

  const { mutate: removeFromWatchlater, isPending: removeWLPending } =
    useRemoveFromWatchlater();

  const { mutate: removeFromFavorite, isPending: removeFavPending } =
    useRemoveFromFavorite();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="relative min-h-[80vh] w-full lg:min-h-[70vh]">
        <div
          className="absolute inset-0 rounded-2xl bg-cover bg-center lg:bg-top"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-[#111111]/70 to-transparent" />

        <div className="absolute inset-0 flex flex-col gap-20 bg-neutral-950/40 sm:bg-transparent">
          {/* info */}
          <div className="relative z-5 flex flex-col items-center justify-between gap-10 px-5 py-[10vh] sm:px-10 lg:flex-row lg:items-end lg:px-20">
            <div className="flex max-w-xl flex-col gap-5 text-center lg:text-left">
              <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {data.title || data.name}
              </h1>

              <p className="text-sm text-neutral-300 sm:text-base">
                {data?.tagline}
              </p>

              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {data?.genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="secondary"
                    className="bg-neutral-800/70 text-xs backdrop-blur"
                    asChild
                  >
                    <Link to={`/genre/${media_type}/${genre.name}/${genre.id}`}>
                      {genre.name}
                    </Link>
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-xs text-neutral-200 sm:text-sm lg:justify-start">
                <span className="flex items-center gap-1 rounded-md bg-neutral-900/60 px-2 py-1">
                  <Star size={14} />
                  {data?.vote_average}
                </span>

                {data?.runtime && (
                  <span className="flex items-center gap-1 rounded-md bg-neutral-900/60 px-2 py-1">
                    <Clock size={14} />
                    {Math.floor(data?.runtime / 60)}h {data?.runtime % 60}m
                  </span>
                )}

                <span className="flex items-center gap-1 rounded-md bg-neutral-900/60 px-2 py-1">
                  <Calendar size={14} />
                  {data?.release_date || data?.first_air_date}
                </span>

                <span className="flex items-center gap-1 rounded-md bg-neutral-900/60 px-2 py-1">
                  <Languages size={14} />
                  {data.original_language}
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-3 lg:justify-start">
                <Link
                  to={data?.homepage}
                  target="_blank"
                  onClick={(e) => !data?.homepage && e.preventDefault()}
                >
                  <Button size="lg" disabled={!data?.homepage}>
                    Watch Now <Play />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  disabled={addWLPending || removeWLPending || WLfetching}
                  onClick={
                    watchlater
                      ? () =>
                          removeFromWatchlater({
                            id: watchlater._id,
                            tmdbID,
                          })
                      : () =>
                          addToWatchlater({
                            media_type,
                            tmdbID,
                            title: data?.title || data?.name,
                            poster_path: data?.poster_path,
                          })
                  }
                >
                  {addWLPending || removeWLPending || WLfetching ? (
                    <Spinner />
                  ) : watchlater ? (
                    "Remove Watchlater"
                  ) : (
                    "Watchlater"
                  )}
                  <Bookmark />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  disabled={addFavPending || removeFavPending || Favfetching}
                  onClick={
                    favorite
                      ? () =>
                          removeFromFavorite({
                            id: favorite._id,
                            tmdbID,
                          })
                      : () =>
                          addToFavorite({
                            media_type,
                            tmdbID,
                            title: data?.title || data?.name,
                            poster_path: data?.poster_path,
                            overview: data?.overview,
                          })
                  }
                >
                  {addFavPending || removeFavPending || Favfetching ? (
                    <Spinner />
                  ) : favorite ? (
                    "Remove Favorite"
                  ) : (
                    "Favorite"
                  )}
                  <Heart />
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              {data?.poster_path ? (
                <img
                  className="w-48 rounded-xl border border-neutral-700 shadow-lg sm:w-60 lg:w-72"
                  src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                />
              ) : (
                <div className="flex h-72 w-48 items-center justify-center rounded-md border">
                  <Image size={50} />
                </div>
              )}
            </div>
          </div>

          {/* TRAILER */}
          {video && (
            <div className="flex flex-col gap-10">
              <h2 className="border-b pb-2 text-2xl">Official Trailer</h2>

              <iframe
                className="aspect-video w-full p-10"
                src={`https://www.youtube.com/embed/${video.key}`}
                allowFullScreen
              />
            </div>
          )}

          {/* VIDEOS */}
          {data?.videos?.results?.length > 0 && (
            <div>
              <h2 className="mb-8 border-b pb-2 text-2xl">Videos</h2>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {data.videos.results.slice(0, 6).map((video) => (
                  <iframe
                    key={video.id}
                    className="aspect-video w-65 shrink-0 border sm:w-[320px]"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    allowFullScreen
                  />
                ))}
              </div>
            </div>
          )}

          {/* REVIEWS */}
          <Review media_type={media_type} tmdbID={tmdbID} />

          {/* SIMILAR */}
          {data?.similar?.results?.length > 0 && (
            <MediaRow title="Similar" data={data.similar.results} />
          )}

          {/* RECOMMENDATIONS */}
          {data?.recommendations?.results?.length > 0 && (
            <MediaRow
              title="Recommendations"
              data={data.recommendations.results}
            />
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
