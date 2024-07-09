"use client";
import React, { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import Card from "@/components/card";
import Header from "@/components/header";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const token = cookies.token;
    const isLoginPage = router.pathname === "/login";
    const isSignupPage = router.pathname === "/signup";

    // Redirect unauthorized users
    if (!token && !isLoginPage && !isSignupPage) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, []);

  const fetchMovies = (page) => {
    fetchApi(`${page}`)
      .then((data) => {
        console.log("Fetched data:", data);
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
      })
      .catch((error) => {
        console.log(error + "lolzies");
      });
  };

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
    fetchMovies(page);
  };

  const loadMovies = () => {
    if (movies?.length > 0) {
      return movies.map((movie) => <Card key={movie.id} movie={movie} />);
    } else {
      console.log("waiting for movies to be fetched xd");
    }
  };
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loadMovies()}
      </div>
      <button
        onClick={loadMoreMovies}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Load More
      </button>
    </div>
  );
}
