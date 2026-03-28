import { useState } from "react";
import {
  useAddSearchhistory,
  useRemoveSearchhistory,
  useSearchhistory,
} from "@/hooks/useSearchhistory.js";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SearchIcon, X } from "lucide-react";

export default function NavbarSearch() {
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
    <>
      <form onSubmit={handleSearch} >
        <ButtonGroup className="relative">
          <Input
            className="h-8 w-55 lg:w-70 text-xs"
            placeholder="Search for any Movie and TV shows"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setShowHistory(false)}
          />
          {showHistory && searchHistory && (
            <div
              onMouseDown={(e) => e.preventDefault()}
              className="absolute top-8 w-70 p-2 text-neutral-100"
            >
              <div className="flex flex-col rounded-md bg-neutral-900">
                {searchHistory.map((search) => (
                  <span
                    onClick={() => setSearch(search.query)}
                    key={search._id}
                    className="flex items-center justify-between rounded-md p-2 px-3 text-xs hover:bg-neutral-800"
                  >
                    {search.query}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSearchhistory(search._id);
                      }}
                      className="rounded-full p-0.5 hover:bg-neutral-700"
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
    </>
  );
}
