import MovieCard from "./MovieCard";
import { MdMoreHoriz } from "react-icons/md";


export default function MovieRow({ data, title }) {

  return (
    <div>
      {data && (
        <>
          <h2 className="text-2xl mb-5">{title}</h2>
          <div className=" flex items-center gap-8 overflow-y-auto     ">
            {data?.map((element) => (
              <MovieCard data={element} key={element.id} />
            ))}
            <button className="border flex items-end border-neutral-600 rounded-md p-2 h-fit w-fit">More<span><MdMoreHoriz/></span></button>
          </div>
        </>
      )}
    </div>
  );
}
