import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDetails } from "@/hooks/useMedia";
import {
  Bookmark,
  Calendar,
  Clock,
  HeartPlus,
  Languages,
  Play,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MediaRow from "@/components/MediaRow";
import {
  useAddToWatchlater,
  useMediaWatchlater,
  useRemoveFromWatchlater,
} from "@/hooks/useLibrary";
import Review from "@/components/Review";

export default function MediaDetails() {
  const { media_type, id: tmdbID } = useParams();
  const { data, isLoading } = useDetails(media_type, tmdbID);
  const { data: watchlater, isFetching } = useMediaWatchlater(tmdbID);

  const video = data?.videos.results.find((video) =>
    video.type === "Trailer" || video.type === "Teaser" ? video.key : null,
  );

  const { mutate: addToWatchlater, isPending: addWLPending } =
    useAddToWatchlater();
  const { mutate: removeFromWatchlater, isPending: removeWLPending } =
    useRemoveFromWatchlater();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="relative h-screen w-full">
      {data && (
        <>
          {/* backdrop  */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-neutral-900/50 " />
          <div className="relative z-10 flex flex-col justify-between py-25 px-35 h-full">
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
                  className="pt-4"
                  to={data.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg">
                    Watch now <Play />
                  </Button>
                </Link>

                <div className="flex gap-3">
                  <Button
                    disabled={addWLPending || isFetching || removeWLPending}
                    onClick={
                      watchlater
                        ? () =>
                            removeFromWatchlater({ id: watchlater._id, tmdbID })
                        : () => addToWatchlater({ media_type, tmdbID })
                    }
                    size="lg"
                    variant="outline"
                  >
                    {addWLPending || removeWLPending || isFetching ? (
                      <Spinner />
                    ) : watchlater ? (
                      "Remove from Watchlater"
                    ) : (
                      "Add to Watchlater"
                    )}
                    <Bookmark />
                  </Button>
                  <Button size="lg" variant="outline">
                    Add to Favorite <HeartPlus />
                  </Button>
                </div>
              </div>
              <div className="pr-20">
                <img
                  className=" shadow-lg shadow-black w-65 rounded-xl border border-neutral-700"
                  src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                />
              </div>
            </div>

            {/* Trailer */}
            <div className="mt-30 flex flex-col items-center border-t">
              <h1 className=" self-start text-2xl my-10 ">Official Trailer</h1>
              <iframe
                className="aspect-video "
                src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&mute=1`}
                allow="autoplay "
                allowFullScreen
              ></iframe>
            </div>

            {/* Videos */}
            {data?.videos?.results.length > 1 && (
              <div className="mt-30 flex flex-col items-center border-t">
                <h1 className=" self-start text-2xl my-10 font-medium">
                  Videos
                </h1>
                <div className="h-50 w-full flex overflow-x-scroll">
                  {data?.videos.results?.slice(0, 5).map((video) => (
                    <iframe
                      key={video.id}
                      className="aspect-video "
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
              <div className="mt-30  border-t">
                <h1 className=" self-start text-2xl my-10 font-medium">
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
                      <img
                        className="w-35 border rounded-md border-neutral-800 
                      "
                        src={`https://image.tmdb.org/t/p/w200${season?.poster_path}`}
                        alt={season?.title}
                      />
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
            <Review
              reviews={data?.reviews}
              media_type={media_type}
              tmdbID={tmdbID}
            />
            {/* Similer */}
            {data?.similar.results.length !== 0 && (
              <div className="mt-25">
                <MediaRow title="Similar" data={data.similar.results} />
              </div>
            )}

            {/* Recomendation */}
            {data?.recommendations.results.length !== 0 && (
              <div className="mt-25">
                <MediaRow
                  title="Recommendations"
                  data={data.recommendations.results}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
