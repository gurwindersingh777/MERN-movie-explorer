import React from "react";

export default function Hero({ query }) {
  const { data, isPending, isError } = query;
  const movie = data?.results[0];
  const background = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;

  return (
    <>
      {movie && (
        <div
          className="relative  h-[85vh] w-full bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${background})` }}
        >
       
          <div className="absolute inset-0 bg-linear-to-t from-[#111111] " />

          <div className=" z-10 p-10 w-2xl">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-sm text-gray-300 line-clamp-3">
              {movie.overview}
            </p>

            <div className="mt-6 flex gap-4">
              <button className="px-6 py-2 bg-white text-black rounded">
                 Watch Now
              </button>
              <button className="px-6 py-2 bg-blue-700 text-white rounded">
                More Info
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
