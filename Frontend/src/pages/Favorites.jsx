import MediaPagination from "@/components/MediaPagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useAllFavorite, useRemoveFromFavorite } from "@/hooks/useLibrary";
import {
  ArrowLeft,
  ArrowUpRightIcon,
  EllipsisVertical,
  HeartMinus,
  OctagonX,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isPending } = useAllFavorite(page);
  const { mutate: removeFromFavorite } = useRemoveFromFavorite();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center pb-25">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full h-screen px-35 py-10 flex flex-col gap-8">
      <h1 className="text-3xl">Favorites</h1>

      {data?.results?.length > 0 ? (
        <div className="flex flex-col gap-2">
          {data?.results.map((item) => (
            <div className="flex border rounded-md bg-neutral-900 justify-between p-4 gap-4">
              <div className="flex gap-7">
                <img
                  className="w-15 rounded-sm"
                  src={
                    item?.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item?.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={item?.title}
                  onClick={() =>
                    navigate(
                      `/media-details/${item?.media_type}/${item?.tmdbID}`,
                    )
                  }
                />
                <div>
                  <span className="text-lg flex items-center gap-2">
                    {item?.title}

                    <Button
                      onClick={() =>
                        navigate(
                          `/media-details/${item?.media_type || type}/${item?.id || item?.tmdbID}`,
                        )
                      }
                      size="icon-xs"
                      variant="outline"
                    >
                      <ArrowUpRightIcon />
                    </Button>
                  </span>
                  <p className="line-clamp-4 text-neutral-400 text-xs mt-3 overflow-y-auto">{item?.overview}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon-xs" variant="outline">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() =>
                      removeFromFavorite({
                        id: item?._id,
                        tmdbID: item?.tmdbID,
                      })
                    }
                    variant="destructive"
                  >
                    <HeartMinus /> Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
          <MediaPagination
            totalPages={data.totalPages}
            page={data.page}
            setSearchParams={setSearchParams}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5">
          <span className="flex items-center justify-center gap-2">
            <OctagonX />
            There is no Favorites
          </span>
          <Link to="/">
            <Button>
              <ArrowLeft />
              Back to home
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
