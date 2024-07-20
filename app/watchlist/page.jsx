"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { getWatchlist } from "@/lib/firestore.js";
import { fetchMovie } from "@/lib/api.js";
import Card from "@/components/card";
import Header from "@/components/header";

const Watchlist = () => {
  const [cookies] = useCookies(["token"]);
  const router = useRouter();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      const token = cookies.token;
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const movieIDs = await getWatchlist(token);
        const movies = await Promise.all(movieIDs.map((id) => fetchMovie(id)));
        setWatchlist(movies);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistMovies();
  }, [cookies.token, router]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center bg-[#111]">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1720px] mx-8 gap-4 mt-16 mb-4">
        {watchlist.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
