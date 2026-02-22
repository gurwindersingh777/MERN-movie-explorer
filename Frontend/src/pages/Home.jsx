import MovieRow from "../components/MovieRow";
import { useTrending } from "../hooks/useMedia";

export default function Home() {
  const { data, isError, isPending } = useTrending("movie", "day");

  return (
    <div className="w-full p-20">
      <MovieRow data={data?.results} />
    </div>
  );
}
