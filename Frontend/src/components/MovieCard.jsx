export default function MovieCard({ data }) {
  return (
    <div className="flex flex-col shrink-0 items-center">
      <img
        className="w-40"
        src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
        alt={data?.title}
      />
      <span>{data?.title}</span>
    </div>
  );
}
