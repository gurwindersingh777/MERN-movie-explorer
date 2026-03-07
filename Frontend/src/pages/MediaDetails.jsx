import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDetails } from "@/hooks/useMedia";
import {
  Bookmark,
  Calendar,
  Clock,
  Heart,
  HeartPlus,
  Image,
  Languages,
  Play,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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

export default function MediaDetails() {
  const { media_type, id: tmdbID } = useParams();
  const { data, isLoading } = useDetails(media_type, tmdbID);
  const { data: watchlater, isFetching: WLfetching } =
    useMediaWatchlater(tmdbID);
  const { data: favorite, isFetching: Favfetching } = useMediaFavorite(tmdbID);

  const video = data?.videos.results.find((video) =>
    video.type === "Trailer" || video.type === "Teaser" ? video.key : null,
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
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="relative h-screen w-full ">
      {data && (
        <>
          {/* backdrop  */}
          <div
            className="absolute inset-0  bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-neutral-900/50 " />

          <div className="relative z-10 flex flex-col gap-20  py-25 px-35 h-full">
            {/* info */}
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-5 items-start">
                <h1 className=" text-4xl font-bold">
                  {data.title || data.name}
                </h1>
                <span className="w-full text-sm mb-3">{data?.tagline}</span>
                <div className="text-[12px] flex gap-3">
                  {data?.genres.map((genre) => (
                    <Badge key={genre.id} asChild variant="outline">
                      <Link
                        to={`/genre/${media_type}/${genre.name}/${genre.id}`}
                      >
                        {genre.name}
                      </Link>
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <span className=" flex items-center gap-1 text-xs">
                    <Star size={15} /> {data?.vote_average} ({data?.vote_count}{" "}
                    votes)
                  </span>
                  {data?.runtime && (
                    <span className="flex gap-1 text-xs">
                      {" "}
                      <Clock size={15} /> {Math.floor(data?.runtime / 60)}h
                      {data?.runtime % 60}m
                    </span>
                  )}
                  <span className="flex gap-1 text-xs">
                    <Calendar size={15} /> Release Date :{" "}
                    {data?.release_date || data?.first_air_date}
                  </span>
                  <span className="flex gap-1 text-xs">
                    <Languages size={15} /> Languege : {data.original_language}
                  </span>
                </div>

                <Link
                  onClick={(e) => {
                    !data?.homepage ? e.preventDefault() : null;
                  }}
                  className="pt-4"
                  to={data?.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button disabled={!data?.homepage} size="lg">
                    Watch now <Play />
                  </Button>
                </Link>

                <div className="flex gap-3">
                  <Button
                    disabled={addWLPending || WLfetching || removeWLPending}
                    onClick={
                      watchlater
                        ? () =>
                            removeFromWatchlater({
                              id: watchlater?._id,
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
                    size="lg"
                    variant="outline"
                  >
                    {addWLPending || removeWLPending || WLfetching ? (
                      <Spinner />
                    ) : watchlater ? (
                      "Remove from Watchlaters"
                    ) : (
                      "Add to Watchlaters"
                    )}
                    <Bookmark />
                  </Button>

                  <Button
                    disabled={addFavPending || Favfetching || removeFavPending}
                    onClick={
                      favorite
                        ? () =>
                            removeFromFavorite({ id: favorite?._id, tmdbID })
                        : () =>
                            addToFavorite({
                              media_type,
                              tmdbID,
                              title: data?.title || data?.name,
                              poster_path: data?.poster_path,
                              overview: data?.overview,
                            })
                    }
                    size="lg"
                    variant="outline"
                  >
                    {addFavPending || Favfetching || removeFavPending ? (
                      <Spinner />
                    ) : favorite ? (
                      "Remove from Favorites"
                    ) : (
                      "Add to Favorites"
                    )}
                    <Heart />
                  </Button>
                </div>
              </div>
              <div className="pr-20">
                {data?.poster_path ? (
                  <img
                    className=" shadow-lg shadow-black w-65 rounded-xl border border-neutral-700"
                    src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                  />
                ) : (
                  <div className="w-65 h-90 border  border-neutral-800  flex items-center justify-center rounded-md ">
                    <Image className=" opacity-55" size={50} />
                  </div>
                )}
              </div>
            </div>

            {/* Trailer */}
            <div className=" flex flex-col items-center ">
              <h1 className=" self-start text-2xl my-10 w-full pb-3 border-b">
                Official Trailer
              </h1>
              <iframe
                className="aspect-video border"
                src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&mute=1`}
                allow="autoplay "
                allowFullScreen
              ></iframe>
            </div>

            {/* Videos */}
            {data?.videos?.results.length > 0 && (
              <div className="flex flex-col items-center ">
                <h1 className=" self-start text-2xl my-10 font-medium w-full pb-3 border-b">
                  Videos
                </h1>
                <div className="h-50 w-full flex overflow-x-scroll gap-2">
                  {data?.videos.results?.slice(0, 5).map((video) => (
                    <iframe
                      key={video.id}
                      className="aspect-video border"
                      src={`https://www.youtube.com/embed/${video?.key}`}
                      allow="autoplay"
                      allowFullScreen
                    ></iframe>
                  ))}
                </div>
              </div>
            )}

            {/* Season */}
            {data?.seasons && (
              <div>
                <h1 className=" self-start text-2xl my-10 font-medium w-full pb-3 border-b">
                  Seasons
                </h1>
                <div className="text-sm flex gap-2 mb-5">
                  <span>Total Episodes : {data.number_of_episodes}</span>
                  <span>Total Season : {data.number_of_seasons}</span>
                </div>
                <div className="flex justify-between items-center gap-5  flex-wrap  overflow-scroll">
                  {data?.seasons?.map((season) => (
                    <div
                      key={season.id}
                      className="flex gap-10 border items-center rounded-2xl p-3"
                    >
                      {season?.poster_path ? (
                        <img
                          className="w-35 border rounded-md border-neutral-800 
                      "
                          src={`https://image.tmdb.org/t/p/w200${season?.poster_path}`}
                          alt={season?.title}
                        />
                      ) : (
                        <div className="w-35 h-53 border  border-neutral-800  flex items-center justify-center rounded-md ">
                          <Image className=" opacity-55" size={50} />
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <span className="underline text-neutral-200">
                          {season.name}
                        </span>
                        <ScrollArea>
                          <p className="text-[12px] w-85 max-h-30  text-neutral-400">
                            {season.overview}
                          </p>
                          <ScrollBar orientation="vertical" />
                        </ScrollArea>

                        <span className="text-neutral-300">
                          Episodes : {season.episode_count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <Review media_type={media_type} tmdbID={tmdbID} />

            {/* Similer */}
            {data?.similar.results.length > 0 && (
              <MediaRow title="Similar" data={data.similar.results} />
            )}

            {/* Recomendation */}
            {data?.recommendations.results.length > 0 && (
              <MediaRow
                title="Recommendations"
                data={data.recommendations.results}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
