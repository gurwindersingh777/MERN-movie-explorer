import Hero from "../components/Hero";
import Wrapper from "../components/Wrapper";
import { useCategory, useTrending } from "../hooks/useMedia";

export default function TvShows() {
  const hero = useTrending("tv", "day");
  const trendingDay = useTrending("tv", "day");
  const trendingWeek = useTrending("tv", "week");
  const popularTvShows = useCategory("tv", "popular");
  const airingTodayTvShows = useCategory("tv", "airing_today");
  const topRatedTvShows = useCategory("tv", "top_rated");
  const onTheAirTvShows = useCategory("tv", "on_the_air");

  return (
    <>
      <div className="flex flex-col gap-10 w-full px-20 pt-10 pb-40">
        <Hero query={hero} />
        <Wrapper title="Trending Tv Shows Today" query={trendingDay} />
        <Wrapper title="Trending Tv Shows This Week" query={trendingWeek} />
        <Wrapper title="Popular Tv Shows" query={popularTvShows} />
        <Wrapper title="Top Rated Tv Shows" query={topRatedTvShows} />
        <Wrapper title="Airing today" query={airingTodayTvShows} />
        <Wrapper title="On the Air" query={onTheAirTvShows} />
      </div>
    </>
  );
}
