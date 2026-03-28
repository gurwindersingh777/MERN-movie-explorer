import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "../ui/spinner.jsx";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  CircleUser,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrentUser, useLogout } from "@/hooks/useAuth.js";

export default function NavbarProfile() {
  const { data } = useCurrentUser();
  const user = data?.user;
  const { mutate: logout, isPending } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="flex">
          {user?.avatar ? (
            <Avatar className="h-5 w-5 border border-neutral-500">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.username}</AvatarFallback>
            </Avatar>
          ) : (
            <CircleUser />
          )}

          <span className="hidden sm:block">
            {isPending ? <Spinner /> : user?.username}
          </span>
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
  );
}
