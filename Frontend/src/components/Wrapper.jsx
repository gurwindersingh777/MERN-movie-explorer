
import MediaRow from "./MediaRow";
import { Spinner } from "./ui/spinner";

export default function Wrapper({ title, query }) {
  const { data, isPending, isError, refetch } = query;

  if (isPending)
    return (
      <div className="w-full h-50  flex justify-center items-center text-xs">
        <Spinner/>
      </div>
    );
  if (isError) {
    refetch;
    return (
      <div className="w-full h-50  flex justify-center items-center text-xs text-neutral-400">
        <p>Something went wrong while loading : {title}</p>
      </div>
    );
  }

  return <MediaRow title={title} data={data?.results} />;
}
