import { useState } from "react";
import {
  useAddSearchhistory,
  useSearchhistory,
} from "@/hooks/useSearchhistory.js";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { SearchIcon, X } from "lucide-react";

export default function NavSearch() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { mutate: addSearchhistory } = useAddSearchhistory();
  const { data: searchHistory } = useSearchhistory();

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim().length === 0) return;
    addSearchhistory({ query: search });
    navigate(`/search/${search}`);
    setSearch("");
  }

  return (
    <form onSubmit={handleSearch}>
      <ButtonGroup className="group relative">
        <Input
          className="w-70 "
          placeholder="Search for any Movie and TV shows"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        
        />
        {searchHistory && (

          <div className=" absolute w-70  top-8 hidden text-neutral-100  group-focus-within:block p-2">
          <div className="flex flex-col  bg-neutral-900 rounded-md ">
            {searchHistory.map((search)=>(

              <span className="flex  justify-between  items-center rounded-md  p-2 px-3 hover:bg-neutral-800 text-xs">
              {search.query}
              <span className="hover:bg-neutral-700 rounded-full p-0.5  ">
                <X size={13} />
              </span>
            </span>
            ))}
          </div>
        </div>
        )}
        <Button type="submit" variant="outline" aria-label="Search">
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </form>
  );
}
