import { Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MediaCard({ data }) {
  const navigate = useNavigate();

  const type = data?.first_air_date ? "tv" : "movie";

  return (
    <div className="w-48  shrink-0 ">
      {data?.poster_path ? (
        <img
          className="w-full h-auto border rounded-md border-neutral-800 cursor-pointer 
        transition-transform duration-200 ease-in-out hover:scale-105"
          src={
            data?.poster_path
              ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
              : "/placeholder.png"
          }
          alt={data?.title || data?.name}
          onClick={() =>
            navigate(`/media-details/${data?.media_type || type}/${data?.id || data?.tmdbID}`)
          }
        />
      ) : (
        <div
          onClick={() =>
            navigate(`/media-details/${data?.media_type || type}/${data?.id}`)
          }
          className="w-full h-72 border  border-neutral-800 cursor-pointer 
        transition-transform duration-200 ease-in-out hover:scale-105 flex items-center justify-center rounded-md "
        >
          <Image className=" opacity-55" size={70} />
        </div>
      )}

      <p className="text-xs text-center mt-2 line-clamp-1 text-neutral-400 font-mono">
        {data?.name || data?.title}
      </p>
    </div>
  );
}
