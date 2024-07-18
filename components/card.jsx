import React from "react";
import { IMG_PATH } from "@/lib/api";

const Card = ({ movie }) => {
  function handleClick() {
    window.location.href = `/movieDetails/${movie.id}`;
  }
  console.log(movie);
  return (
    <div className="flex items-center justify-center h-screen transform transition-transform duration-300 hover:scale-103 hover:z-10 h-[650px] mb-16">
      <div
        onClick={handleClick}
        className="mx-auto bg-white rounded-3xl shadow-xl"
      >
        <div className="grid rounded-3xl max-w-[370px] shadow-sm bg-[#EBF4F6]  flex-col h-[650px] cursor-pointer">
          <img
            src={IMG_PATH + "/" + movie.poster_path}
            width="375"
            height="200"
            className="rounded-t-3xl justify-center grid h-80 object-cover group"
            alt={movie.original_title}
          />

          <div className="group p-6 grid z-10">
            <a
              href={`movieDetails/${movie.id}`}
              className="group-hover:text-yellow-500 font-bold sm:text-2xl line-clamp-2"
            >
              {movie.original_title}
            </a>
            <span className="text-slate-400 pt-2 font-semibold">
              {movie.release_date}
            </span>
            <div className="h-28">
              <span className="line-clamp-4 py-2 text-sm font-light leading-relaxed">
                {movie.overview}
              </span>
            </div>
            <div className="grid-cols-2 flex group justify-between">
              <div className="font-black flex flex-col">
                <span className="text-yellow-500 text-xl">IMDB SCORE</span>
                <span className="text-3xl flex gap-x-1 items-center">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <div className="h-7" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
