import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import NavbarSearch from "./NavbarSearch.jsx";
import NavbarProfile from "./NavbarProfile.jsx";
import { Button } from "../ui/button.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const navLinkItems = [
    { to: "/", name: "Home" },
    { to: "/movies", name: "Movies" },
    { to: "/tv", name: "TV Shows" },
    { to: "/genre", name: "Genre" },
    { to: "/watchlater", name: "Watchlater" },
  ];

  return (
    <nav className="sticky top-0 z-10 flex h-16 items-center border-b bg-neutral-950 border-neutral-800 px-6 lg:px-10">
      <div className="flex w-full items-center justify-between">

  
        <div className="flex items-center gap-10">
          <NavLink
            to="/"
            className="font-mono text-lg tracking-wide text-red-400 sm:text-xl"
          >
            Movie Explorer
          </NavLink>

       
          <div className="hidden lg:flex items-center gap-5 text-[13px] font-semibold text-neutral-400">
            {navLinkItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-white underline underline-offset-8"
                    : "hover:text-white"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">

          <div className="hidden lg:block">
            <NavbarSearch />
          </div>

          <NavbarProfile />

          <div className="lg:hidden">
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon-sm">
                  <Menu size={20} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-72 mr-3">

                {navLinkItems.map((item) => (
                  <DropdownMenuItem asChild key={item.to}>
                    <NavLink to={item.to}>{item.name}</NavLink>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <div className="p-2">
                  <NavbarSearch />
                </div>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </div>
    </nav>
  );
}

