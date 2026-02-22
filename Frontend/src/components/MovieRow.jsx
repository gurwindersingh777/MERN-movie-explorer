import MovieCard from "./MovieCard";

export default function MovieRow({ data }) {
  return (
    <div className="w-full flex gap-8 overflow-y-auto">
      {data?.map((element) => (
        <MovieCard data={element} key={element.id} />
      ))}
    </div>
  );
}