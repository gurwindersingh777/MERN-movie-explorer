import { Plus } from "lucide-react";
import MediaCard from "./MediaCard";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function MediaRow({
  data,
  title,
  more = true,
  wrap = false,
  pageContext,
}) {
  return (
    <div>
      {data && (
        <>
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold sm:text-xl md:text-2xl">
            {title}
          </h2>

          <div
            className={`gap-4 py-3 sm:gap-6 ${
              wrap
                ? "grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 justify-items-center"
                : "flex overflow-x-auto scrollbar-hide  items-center"
            }`}
          >
            {data?.map((element) => (
              <MediaCard data={element} key={element.id} />
            ))}

            {more && (
              <Button size="xs">
                <Link
                  to={`media/${pageContext?.category}/${pageContext?.media_type}/${pageContext?.time_window || ""}`}
                >
                  <Plus />
                </Link>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}