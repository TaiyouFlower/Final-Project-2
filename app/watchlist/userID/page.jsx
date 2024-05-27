import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page

// import React, { useEffect, useState } from 'react';
// import { db } from './firebase';
// import { useAuth } from './useAuth';
// import Header from "@/components/header";
// import Card from "@/components/card";

// const Watchlist = () => {
//   const { user } = useAuth();
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     if (user) {
//       const unsubscribe = db.collection('usernames').doc(user.uid).collection('watchlist')
//         .onSnapshot(snapshot => {
//           const movieIds = snapshot.docs.map(doc => doc.id);
//           fetchMovieDetails(movieIds);
//         });
//       return () => unsubscribe();
//     }
//   }, [user]);


//   const removeFromWatchlist = async (movieId) => {
//     await db.collection('usernames').doc(user.uid).collection('watchlist').doc(movieId).delete();
//     alert("Movie removed from your watchlist.");
//   };
//   const fetchMovieDetails = async (movieIds) => {
//     const movieDetails = await Promise.all(movieIds.map(movieId => fetchApi(`/movie/${movieId}`)));
//     setMovies(movieDetails);
//   };


//   return (
//     <div>
//       <Header />
//       <Card movies={movies} removeFromWatchlist={removeFromWatchlist} />
//     </div>
//   );
// };

// export default Watchlist;