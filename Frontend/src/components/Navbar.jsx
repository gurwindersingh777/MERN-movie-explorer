import { Link } from "react-router-dom";
import { LoginAndSignupBtn } from "./Component.jsx";
import { useCurrentUser, useLogout } from "../hooks/useAuth.js";
import { CircleUser, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

export default function Navbar() {
  const { data } = useCurrentUser();

  const { mutate, isPending } = useLogout();

  function handleLogout() {
    mutate();
  }

  return (
    <nav className="w-full  h-16 flex justify-between sticky top-0 z-20 items-center px-15 border-b bg-[#111111] border-neutral-800">
      <div className="flex gap-10 items-center">
        <div className=" font-mono tracking-wide text-red-400 text-xl ">Movie Explorer</div>
        <div className="text-[13px] font-semibold flex gap-4  text-neutral-300">
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
        <Field className="gap-1.5" orientation="horizontal">
          <Input
            className="w-70 "
            type="search"
            placeholder="Search any Movie and TV show"
          />
          <Button  size="icon-sm" >
            <Search  />
          </Button>
        </Field>

        {data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <CircleUser />
                {data?.user.username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <UserIcon />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} variant="destructive">
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
