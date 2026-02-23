
export default function MovieCard({ data }) {
  
  return (
    <div className="flex flex-col shrink-0 w-40 gap-2">
      {data && (
        <>
          <img
            className=" border border-neutral-800 cursor-pointer hover:border-neutral-400"
            src={`https://image.tmdb.org/t/p/w200${data?.poster_path}`}
            alt={data?.title}
          />
          <span className="text-xs text-neutral-400 text-center">{data?.title}</span>
        </>
      )}
    </div>
  );
}
