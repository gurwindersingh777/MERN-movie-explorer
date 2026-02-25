import { useNavigate } from "react-router-dom";

export default function MediaCard({ data }) {
  const navigate = useNavigate();

  function onPosterClick() {
    navigate(`/media-details/${data?.media_type}/${data?.id}`);
  }
  return (
    <>
      {data && (
        <img
          className="w-47 border rounded-md border-neutral-800 cursor-pointer 
                     transition-transform duration-200 ease-in-out 
                     hover:scale-110"
          src={`https://image.tmdb.org/t/p/w200${data?.poster_path}`}
          alt={data?.title}
          onClick={onPosterClick}
        />
      )}
    </>
  );
}
