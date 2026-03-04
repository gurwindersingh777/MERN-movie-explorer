import Hero from "../components/Hero";
import Wrapper from "../components/Wrapper";
import { useCategory, useTrending } from "../hooks/useMedia";

export default function Home() {
  const hero = useTrending("all", "day");
  const trendingDay = useTrending("all", "day");
  const trendingWeek = useTrending("all", "week");
  const popularMovie = useCategory("movie", "popular");
  const popularTv = useCategory("tv", "popular");
  const topRatedMovie = useCategory("movie", "top_rated");
  const upcomingMovie = useCategory("movie", "upcoming");
  const nowPlayingMovie = useCategory("movie", "now_playing");
  const onTheAirTv = useCategory("tv", "on_the_air");
  const airingToday = useCategory("tv", "airing_today");

  return (
    <>
      <div className="flex flex-col gap-10 w-full px-20 pt-10 pb-40">
        <Hero query={hero} />
        <Wrapper title="Trending Today" query={trendingDay} pageContext={{
            category: "trending",
            media_type: "all",
            time_window: "day",
          }} />
        <Wrapper title="Trending This Week" query={trendingWeek} pageContext={{
            category: "trending",
            media_type: "all",
            time_window: "week",
          }} />
        <Wrapper title="Popular Movies" query={popularMovie} pageContext={{
            category: "popular",
            media_type: "movie",
          }}/>
        <Wrapper title="Popular Tv Shows" query={popularTv} pageContext={{
            category: "popular",
            media_type: "tv",
          }} />
        <Wrapper title="Top Rated" query={topRatedMovie} pageContext={{
            category: "top_rated",
            media_type: "movie",
          }}/>
        <Wrapper title="Upcoming Movies " query={upcomingMovie} pageContext={{
            category: "upcoming",
            media_type: "movie",
          }}/>
        <Wrapper title="Now Playing" query={nowPlayingMovie} pageContext={{
            category: "now_playing",
            media_type: "movie",
          }}/>
        <Wrapper title="On the Air " query={onTheAirTv} pageContext={{
            category: "on_the_air",
            media_type: "tv",
          }}/>
        <Wrapper title="Airing Today " query={airingToday} pageContext={{
            category: "airing_today",
            media_type: "tv",
          }}/>
      </div>
    </>
  );
}
