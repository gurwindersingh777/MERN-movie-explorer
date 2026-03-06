import { useState } from "react";
import {
  useAddSearchhistory,
  useRemoveSearchhistory,
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
  const [showHistory, setShowHistory] = useState(false);

  const { mutate: addSearchhistory } = useAddSearchhistory();
  const { data: searchHistory } = useSearchhistory();
  const { mutate: removeSearchhistory } = useRemoveSearchhistory();


  function handleSearch(e) {
    e.preventDefault();
    if (search.trim().length === 0) return;

    addSearchhistory({ query: search });
    navigate(`/search/${search}`);
    setShowHistory(false);
    setSearch("");
  }

  return (
    <form onSubmit={handleSearch}>
      <ButtonGroup className=" relative">
        <Input
          className="w-70 h-8 text-xs"
          placeholder="Search for any Movie and TV shows"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setShowHistory(false)}
        />
        {showHistory && searchHistory && (
          <div
            onMouseDown={(e) => e.preventDefault()}
            className=" absolute w-70 top-8 text-neutral-100 p-2"
          >
            <div className="flex flex-col  bg-neutral-900 rounded-md ">
              {searchHistory.map((search) => (
                <span
                  onClick={() => setSearch(search.query)}
                  key={search._id}
                  className="flex  justify-between  items-center rounded-md  p-2 px-3 hover:bg-neutral-800 text-xs"
                >
                  {search.query}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSearchhistory(search._id);
                    }}
                    className="hover:bg-neutral-700 rounded-full p-0.5  "
                  >
                    <X size={13} />
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
        <Button type="submit" size="sm" variant="outline" aria-label="Search">
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </form>
  );
}
