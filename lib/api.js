export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const IMG_PATH = process.env.NEXT_PUBLIC_IMG_PATH;
export const SEARCH_API = process.env.NEXT_PUBLIC_SEARCH_API;
export const MOVIE_API = process.env.NEXT_PUBLIC_MOVIE_API;
const fetchMovieEnd = `?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`;
export async function fetchApi(page) {
  console.log(API_URL);
  console.log(`${API_URL}${page}`);
  const response = await fetch(`${API_URL}${page}`, {});
  return response.json();
}
export async function fetchSearchApi(searchValue) {
  const response = await fetch(`${SEARCH_API}${searchValue}`, {});
  return response.json();
}
export async function fetchMovie(movieID) {
  const response = await fetch(`${MOVIE_API}${movieID}${fetchMovieEnd}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch movie with ID ${movieID}: ${response.statusText}`
    );
  }
  return response.json();
}
