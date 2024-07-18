"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { fetchMovie } from "@/lib/api";
import { addToWatchlist } from "@/lib/firestore"; // Import the function to add to Firestore
import { IMG_PATH } from "@/lib/api";
import Card from "@/components/card";
import Header from "@/components/header";

export default function MovieDetails({ params }) {
  const [cookies] = useCookies(["token"]);
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.token;
    const isLoginPage = router.pathname === "/login";
    const isSignupPage = router.pathname === "/signup";

    if (!token && !isLoginPage && !isSignupPage) {
      router.push("/login");
      return;
    }

    const fetchAndSetMovie = async () => {
      try {
        const movieData = await fetchMovie(params.movieID);
        setMovie(movieData);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetMovie();
  }, [params.movieID, cookies.token, router]);

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(cookies.token, movie.id); // Add movie ID to Firestore
      alert("Added to your watchlist!");
    } catch (error) {
      console.error("Failed to add to watchlist:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="flex flex-col items-center bg-[#111] h-screen">
      <Header />
      <div className="flex justify-between gap-[320px] ">
        <img
          src={IMG_PATH + "/" + movie.poster_path}
          width="375"
          height="200"
          className="rounded-t-3xl mt-8 h-[700px] w-[680px] group z-50 ml-4"
          alt={movie.original_title}
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <h1 className="text-white text-4xl max-w-[780px] font-black">
            Title: {movie.original_title}
          </h1>
          <h2 className="text-white text-xl max-w-[780px] font-bold">
            Release date: {movie.release_date}
          </h2>
          <h2 className="text-white text-xl max-w-[780px] font-bold">
            Description: {movie.overview}
          </h2>
          <div>
            <a
              href={`https://www.youtube.com/results?search_query=${movie.original_title}+Trailer`}
              target="blank_"
              className="text-white text-xl max-w-[780px] font-bold cursor-pointer hover:text-yellow-500"
            >
              Check out the Trailer
            </a>
          </div>
          <div>
            <a
              href="https://imdb.com"
              target="blank_"
              className="text-white text-xl max-w-[780px] font-bold cursor-pointer hover:text-yellow-500"
            >
              Check out the IMDB
            </a>
          </div>
          <div>
            <a
              href={`https://www.rottentomatoes.com/`}
              target="blank_"
              className="text-white text-xl max-w-[780px] font-bold cursor-pointer hover:text-yellow-500"
            >
              Check out the Rotten Tomato
            </a>
          </div>
          <button
            className="text-black p-2 text-xl max-w-[780px] font-bold bg-yellow-500 hover:bg-yellow-600 border-l-black "
            onClick={handleAddToWatchlist}
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
