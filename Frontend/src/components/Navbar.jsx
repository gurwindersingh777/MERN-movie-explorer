import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { AccountNavbarBtn, LoginAndSignupBtn } from "./Component.jsx";
import { useCurrentUser } from "../hooks/useAuth.js";

export default function Navbar() {
  const { data } = useCurrentUser();

  return (
    <nav className="w-full h-18 flex justify-between items-center px-15 border-b border-neutral-800">
      <div className="flex gap-10 items-center">
        <div className="font-bold text-lg">Movie Explorer</div>
        <div className="text-[13px] flex gap-4 mt-1 text-neutral-300">
          <Link to="/" className="hover:text-white ">
            Home
          </Link>
          <Link to="/movies" className="hover:text-white ">
            Movies
          </Link>
          <Link to="/tv" className="hover:text-white">
            TV Shows
          </Link>
          <Link to="/category" className="hover:text-white ">
            Category
          </Link>
          <Link to="/watchlater" className="hover:text-white ">
            Watchlater
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center h-8 w-70">
          <input
            type="text"
            id="search"
            placeholder="Search any movie and TV show"
            className="border border-neutral-600  bg-neutral-800 text-white placeholder:text-neutral-400  text-xs h-full w-full px-4   "
          />
          <label
            htmlFor="search"
            className="border ml-0.5 flex items-center bg-neutral-200 hover:bg-white  text-black px-2 pr-3  h-full  cursor-pointer"
          >
            <LuSearch />
          </label>
        </div>
        {data?.user ? (
          <AccountNavbarBtn username={data.user.username} />
        ) : (
          <LoginAndSignupBtn />
        )}
      </div>
    </nav>
  );
}
