import Hero from "../components/Hero";
import Wrapper from "../components/Wrapper";
import { useCategory, useTrending } from "../hooks/useMedia";

export default function Movies() {
  const hero = useTrending("movie", "day");
  const trendingDay = useTrending("movie", "day");
  const trendingWeek = useTrending("movie", "week");
  const popularMovie = useCategory("movie", "popular");
  const topRatedMovie = useCategory("movie", "top_rated");
  const upcomingMovie = useCategory("movie", "upcoming");
  const nowPlayingMovie = useCategory("movie", "now_playing");

  return (
    <>
      <div className="flex flex-col gap-10 w-full px-20 pt-10 pb-40">
        <Hero query={hero} />
        <Wrapper title="Trending Movies Today" query={trendingDay} />
        <Wrapper title="Trending Movies This Week" query={trendingWeek} />
        <Wrapper title="Popular Movies" query={popularMovie} />
        <Wrapper title="Top Rated Movies" query={topRatedMovie} />
        <Wrapper title="Upcoming Movies " query={upcomingMovie} />
        <Wrapper title="Now Playing" query={nowPlayingMovie} />
      </div>
    </>
  );
}
