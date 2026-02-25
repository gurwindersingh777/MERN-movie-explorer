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
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function MediaDetails() {
  const { media_type, id } = useParams();

  const { data } = useDetails(media_type, id);

  console.log(data);
  const background = `https://image.tmdb.org/t/p/original${data?.backdrop_path}`;
  const video = data?.videos.results.find((video) =>
    video.type === "Trailer" ? video.key : null,
  );

  return (
    <div className="relative h-screen w-full">
      {data && (
        <>
          {/* backdrop  */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
          />
          <div className="absolute inset-0 bg-black opacity-70 " />

          <div className="relative z-10 flex flex-col justify-between py-25 px-40 h-full">
            {/* info */}
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-4 items-start">
                <h1 className=" text-4xl font-bold">
                  {data.title || data.name}
                </h1>
                <span className="w-full text-sm mb-3">{data?.tagline}</span>
                <div className="text-[12px] flex gap-3">
                  {data?.genres.map((genre) => (
                    <Badge asChild variant="outline">
                      <Link
                        to={`/category/${media_type}/${genre.name}/${genre.id}`}
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
                  <span className="flex gap-1 text-xs">
                    {" "}
                    <Clock size={15} /> {Math.floor(data?.runtime / 60)}h
                    {data?.runtime % 60}m
                  </span>
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
                  <Link
                    to={data.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="outline">
                      Added to WatchLater
                      <Bookmark />
                    </Button>
                  </Link>
                  <Link
                    to={data.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="outline">
                      Add to Favorite <HeartPlus />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="pr-20">
                <img
                  className=" shadow-lg shadow-black w-65 rounded-xl border border-neutral-700"
                  src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                />
              </div>
            </div>
            {/* trailer */}
            <div className="pt-15">
              <div className="mt-45 flex flex-col items-center">
                <h1 className=" self-start text-xl mb-15 font-medium">
                  Officail Trailer
                </h1>
                <iframe
                  className="aspect-video "
                  src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1`}
                  allow="autoplay encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
