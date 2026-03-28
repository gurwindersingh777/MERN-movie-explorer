import { Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MediaCard({ data }) {
  const navigate = useNavigate();
  const type = data?.first_air_date ? "tv" : "movie";

  return (
    <div className="w-35 sm:w-40 md:w-45 shrink-0 ">
      {data?.poster_path ? (
        <img
          className="w-full rounded-md border border-neutral-800 cursor-pointer 
          transition-transform duration-200 ease-in-out hover:scale-105"
          src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
          alt={data?.title || data?.name}
          onClick={() =>
            navigate(
              `/media-details/${data?.media_type || type}/${data?.id || data?.tmdbID}`
            )
          }
        />
      ) : (
        <div
          onClick={() =>
            navigate(`/media-details/${data?.media_type || type}/${data?.id}`)
          }
          className="aspect-2/3 border border-neutral-800 cursor-pointer 
          flex items-center justify-center rounded-md"
        >
          <Image className="opacity-55" size={60} />
        </div>
      )}

      <p className="mt-2 text-center text-[10px] sm:text-xs line-clamp-1 text-neutral-400 font-mono">
        {data?.name || data?.title}
      </p>
    </div>
  );
}
