import Hero from "../components/Hero";
import Wrapper from "../components/Wrapper";
import { useCategory, useTrending } from "../hooks/useMedia";

export default function Home() {
  return (
    <>
    <Hero query={useTrending("movie", "day")}/>
    <div className="flex flex-col gap-8 w-full p-20 py-15">
      <Wrapper title="Trending Today" query={useTrending("movie", "day")} />
      <Wrapper title="Trending This Week" query={useTrending("movie", "week")} />
      <Wrapper title="Popular Movies" query={useCategory("movie", "popular")} />
      <Wrapper title="Popular Tv Shows" query={useCategory("tv", "popular")} />
      <Wrapper title="Top Rated" query={useCategory("movie", "top_rated")} />
      <Wrapper title="Upcoming Movies " query={useCategory("movie", "upcoming")} />
      <Wrapper title="Now Playing" query={useCategory("movie", "now_playing")} />
      <Wrapper title="On the Air " query={useCategory("tv", "on_the_air")} />
      <Wrapper title="Airing Today " query={useCategory("tv", "airing_today")} />
    </div>
    </>
  );
}
