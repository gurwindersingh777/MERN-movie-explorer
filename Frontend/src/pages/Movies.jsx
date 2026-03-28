import PageWrapper from "@/components/PageWrapper";
import Hero from "../components/Hero";
import Wrapper from "../components/MediaWrapper";
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
    <PageWrapper>
      <Hero query={hero} />
      <Wrapper
        title="Trending Movies Today"
        query={trendingDay}
        pageContext={{
          category: "trending",
          media_type: "movie",
          time_window: "day",
        }}
      />
      <Wrapper
        title="Trending Movies This Week"
        query={trendingWeek}
        pageContext={{
          category: "trending",
          media_type: "movie",
          time_window: "week",
        }}
      />
      <Wrapper
        title="Popular Movies"
        query={popularMovie}
        pageContext={{
          category: "popular",
          media_type: "movie",
        }}
      />
      <Wrapper
        title="Top Rated Movies"
        query={topRatedMovie}
        pageContext={{
          category: "top_rated",
          media_type: "movie",
        }}
      />
      <Wrapper
        title="Upcoming Movies "
        query={upcomingMovie}
        pageContext={{
          category: "upcoming",
          media_type: "movie",
        }}
      />
      <Wrapper
        title="Now Playing"
        query={nowPlayingMovie}
        pageContext={{
          category: "now_playing",
          media_type: "movie",
        }}
      />
    </PageWrapper>
  );
}
