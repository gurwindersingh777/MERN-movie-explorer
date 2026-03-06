import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpRightIcon, EllipsisVertical, HeartMinus } from "lucide-react";

export default function Favorites() {
  return (
    <div className="w-full h-screen px-35 py-15">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl">Favorites</h1>

        <div className="border rounded-md">
          <div className="flex justify-between p-5 gap-4">
            <div className="flex gap-5">
              <img
                className="min-w-23 h-30 bg-amber-300 rounded-md"
                src=""
                alt=""
              />
              <div>
                <span className="text-xl flex items-center gap-2">
                  Title{" "}
                  <Button size="icon-xs" variant="outline">
                    <ArrowUpRightIcon />
                  </Button>
                </span>
                <p className="line-clamp-4 text-xs mt-3">
                  Overview Lorem ipsum dolor sit amet consectetur, adipisicing
                  elit. Dicta autem eligendi deleniti esse reprehenderit odio ab
                  eos similique cumque. Quisquam veritatis dolorum sicing elit.
                  Dicta autem eligendi deleniti esse reprehenderit odio ab eos
                  similique cumque. Quisquam veritatis dolorum tempore dolores,
                  consequuntur ab. Corporis esse delectus tenetur.
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon-xs" variant="outline">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem variant="destructive">
                  <HeartMinus /> Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        
      </div>
    </div>
  );
}
