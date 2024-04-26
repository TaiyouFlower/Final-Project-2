import React from 'react'
import { IMG_PATH } from '@/lib/api'


const Card = ({ movie }) => {
  // const addToWatchlist = async () => {

  //   const watchlistRef = db.collection('usernames').doc(user.uid).collection('watchlist');
  //   // Save only the movie ID
  //   await watchlistRef.doc(movie.id.toString()).set({ id: movie.id });
  //   alert("Added to your watchlist!");
  // };
  function handleClick() {
    window.location.href = `/movieDetails/${movie.id}`;
  }
  console.log(movie);
  return (
    <div onClick={handleClick} className='flex items-center justify-center h-screen transform transition-transform duration-300 hover:scale-103 hover:z-10'>
      <div className='mx-auto bg-white rounded-3xl shadow-xl'>
        <div className='grid rounded-3xl max-w-[370px] shadow-sm bg-slate-100  flex-col'>
          <img
            src={IMG_PATH + "/" + movie.poster_path}
            width='375'
            height='200'
            className='rounded-t-3xl justify-center grid h-80 object-cover'
            alt={movie.original_title}
          />

          <div className='group p-6 grid z-10'>
            <a
              href="https://www.youtube.com/watch?v=fx8j7XQjgXA&ab_channel=TbilisiSchoolOfCommunication"
              className='group-hover:text-cyan-700 font-bold sm:text-2xl line-clamp-2'
            >
              {movie.original_title}
            </a>
            <span className='text-slate-400 pt-2 font-semibold'>{movie.release_date}</span>
            <div className='h-28'>
              <span className='line-clamp-4 py-2 text-sm font-light leading-relaxed'>
                {movie.overview}
              </span>
            </div>
            <div className='grid-cols-2 flex group justify-between'>
              <div className='font-black flex flex-col'>
                <span className='text-yellow-500 text-xl'>IMDB SCORE</span>
                <span className='text-3xl flex gap-x-1 items-center group-hover:text-yellow-600'>
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <div className='flex flex-col items-end'>
                <div className='h-7' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
