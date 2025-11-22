import axios from 'axios';
import type { Movie } from '../types/movie';

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});


export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<FetchMoviesResponse> => {
  const response = await api.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      page,
      language: 'en-US', 
      include_adult: false,
    },
  });

  return response.data;
};