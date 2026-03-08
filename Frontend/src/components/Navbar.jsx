import { Link, NavLink } from "react-router-dom";
import { LoginAndSignupBtn } from "./Component.jsx";
import { useCurrentUser, useLogout } from "../hooks/useAuth.js";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  CircleUser,
  Heart,
} from "lucide-react";
import { Spinner } from "./ui/spinner.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavSearch from "./NavSearch.jsx";

export default function Navbar() {
  const { data } = useCurrentUser();
  const user = data?.user
  const { mutate: logout, isPending } = useLogout();

  return (
    <nav className="w-full  h-16 flex justify-between sticky top-0 z-20 items-center px-15 border-b bg-[#111111] border-neutral-800">
      <div className="flex gap-5 items-center ">
        <div className=" font-mono tracking-wide text-red-400 text-xl border-r pr-5">
          <NavLink to="/"> Movie Explorer</NavLink>
        </div>
        <div className="text-[13px] font-semibold flex items-center gap-4 text-neutral-400">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "underline text-white decoration-2  underline-offset-8"
                : "hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive
                ? "underline text-white decoration-2  underline-offset-8"
                : "hover:text-white"
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/tv"
            className={({ isActive }) =>
              isActive
                ? "underline text-white decoration-2  underline-offset-8"
                : "hover:text-white"
            }
          >
            TV Shows
          </NavLink>
          <NavLink
            to="/genre"
            className={({ isActive }) =>
              isActive
                ? "underline text-white decoration-2  underline-offset-8"
                : "hover:text-white"
            }
          >
            Genre
          </NavLink>
          <NavLink
            to="/watchlater"
            className={({ isActive }) =>
              isActive
                ? "underline text-white decoration-2  underline-offset-8"
                : "hover:text-white"
            }
          >
            Watchlater
          </NavLink>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <NavSearch />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                {user?.avatar ? (
              <Avatar  className=" w-5 h-5 border border-neutral-500" >
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.username}</AvatarFallback>
              </Avatar>
            ) : (
              <CircleUser  />
            )}
                {isPending ? <Spinner /> : user?.username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link to="/profile">
              <DropdownMenuItem>
                <UserIcon />
                Profile
              </DropdownMenuItem>
              </Link>
              <Link to="/favorite">
                <DropdownMenuItem>
                  <Heart />
                  Favorites
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <SettingsIcon />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} variant="destructive">
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginAndSignupBtn />
        )}
      </div>
    </nav>
  );
}
