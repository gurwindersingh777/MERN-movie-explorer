import MediaRow from "@/components/MediaRow";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSearch } from "@/hooks/useMedia";
import { ArrowLeft, OctagonX } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Search() {
  const { q } = useParams();
  const { data, isPending } = useSearch(q);

  if(isPending){
    return <div className="w-full h-full flex justify-center items-center pb-25"><Spinner/></div>
  }

  return (
    <div className="p-15 px-25 flex justify-center w-full h-full">
      {data?.results.length > 0 ? (
        <MediaRow data={data?.results} title={q} more={false} wrap={true} />
      ):(
        <div className="flex flex-col gap-5">
        <span className="flex items-center justify-center gap-2"><OctagonX />No result Found : {q}</span>
        <Link to="/">
        <Button ><ArrowLeft />Back to home</Button>
        </Link>
        </div>
      )}
    </div>
  );
}
