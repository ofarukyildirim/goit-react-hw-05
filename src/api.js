import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w300";

const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

export const fetchMovies = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    ...options,
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });

  return response.data.results;
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);

  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    ...options,
    params: {
      language: "en-US",
    },
  });

  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    ...options,
    params: {
      language: "en-US",
    },
  });

  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    ...options,
    params: {
      language: "en-US",
      page: 1,
    },
  });

  return response.data.results;
};
