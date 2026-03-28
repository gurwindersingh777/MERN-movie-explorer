import PageWrapper from "@/components/PageWrapper";
import Hero from "../components/Hero";
import MediaWrapper from "../components/MediaWrapper";
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
     <PageWrapper>
        <Hero query={hero} />
        <MediaWrapper title="Trending Today" query={trendingDay} pageContext={{
            category: "trending",
            media_type: "all",
            time_window: "day",
          }} />
        <MediaWrapper title="Trending This Week" query={trendingWeek} pageContext={{
            category: "trending",
            media_type: "all",
            time_window: "week",
          }} />
        <MediaWrapper title="Popular Movies" query={popularMovie} pageContext={{
            category: "popular",
            media_type: "movie",
          }}/>
        <MediaWrapper title="Popular Tv Shows" query={popularTv} pageContext={{
            category: "popular",
            media_type: "tv",
          }} />
        <MediaWrapper title="Top Rated" query={topRatedMovie} pageContext={{
            category: "top_rated",
            media_type: "movie",
          }}/>
        <MediaWrapper title="Upcoming Movies " query={upcomingMovie} pageContext={{
            category: "upcoming",
            media_type: "movie",
          }}/>
        <MediaWrapper title="Now Playing" query={nowPlayingMovie} pageContext={{
            category: "now_playing",
            media_type: "movie",
          }}/>
        <MediaWrapper title="On the Air " query={onTheAirTv} pageContext={{
            category: "on_the_air",
            media_type: "tv",
          }}/>
        <MediaWrapper title="Airing Today " query={airingToday} pageContext={{
            category: "airing_today",
            media_type: "tv",
          }}/>
    </PageWrapper>
  );
}
