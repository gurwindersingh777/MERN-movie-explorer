import { ArrowUpRightIcon } from "lucide-react";
import MediaCard from "./MediaCard";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

export default function MediaRow({ data, title }) {
  return (
    <div>
      {data && (
        <>
          <h2 className="scroll-m-20 border-b pb-2 mb-5 text-2xl font-semibold tracking-tight first:mt-0">
            {title}
          </h2>
          <div className="flex items-center gap-10 overflow-x-auto  py-5 px-4 ">
            {data?.map((element) => (
              <MediaCard data={element} key={element.id} />
            ))}
            <Badge asChild>
              <Link >
                More <ArrowUpRightIcon data-icon="inline-end" />
              </Link>
            </Badge>
          </div>
        </>
      )}
    </div>
  );
}
