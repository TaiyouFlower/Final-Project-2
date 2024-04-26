"use client"
import React, { useEffect, useState } from "react";
import { fetchSearchApi } from "@/lib/api";
import Card from "@/components/card";
import Header from "@/components/header";
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import {fetchMovie} from "@/lib/api"


export default function MovieDetails ({params}) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const router = useRouter();
  const options = {method: 'GET', headers: {accept: 'application/json'}};


  useEffect(() => {
    const token = cookies.token; 
    const isLoginPage = router.pathname === '/login';
    const isSignupPage = router.pathname === '/signup';

    if (!token && !isLoginPage && !isSignupPage) {
      router.push('/login'); 
    }
  }, []);
  const fetchedMovie = fetchMovie(params.movieID);
  return (
    <div>
      <Header  />
      <Card key={fetchedMovie.id} movie={fetchMovie} />
    </div>
  ) 
}