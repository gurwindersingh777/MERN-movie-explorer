import { ChevronRight } from "lucide-react";
import MediaCard from "./MediaCard";
import { Button } from "./ui/button";

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
            <Button  variant="outline">
              More
              <ChevronRight />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
