import { db } from "./firebase"; // Ensure you have Firebase initialized in firebase.js
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

export const addToWatchlist = async (userToken, movieID) => {
  const watchlistRef = doc(
    db,
    "usernames",
    userToken,
    "watchlist",
    movieID.toString()
  );
  await setDoc(watchlistRef, { id: movieID });
};

export const getWatchlist = async (userToken) => {
  const watchlistRef = collection(db, "usernames", userToken, "watchlist");
  const watchlistSnapshot = await getDocs(watchlistRef);
  const watchlist = [];
  watchlistSnapshot.forEach((doc) => {
    watchlist.push(doc.data().id);
  });
  return watchlist;
};
