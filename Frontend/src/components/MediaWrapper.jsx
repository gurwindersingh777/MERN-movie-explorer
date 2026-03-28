import MediaRow from "./MediaRow";
import { Spinner } from "./ui/spinner";

export default function MediaWrapper({ title, query, pageContext }) {
  const { data, isPending, isError } = query;

  if (isPending)
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className="flex h-40 items-center justify-center text-neutral-400">
        Something went wrong
      </div>
    );

  return (
    <MediaRow
      title={title}
      data={data?.results}
      pageContext={pageContext}
    />
  );
}