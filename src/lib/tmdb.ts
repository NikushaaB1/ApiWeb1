import type { Movie, MovieDetails, TMDBResponse, Genre } from '@/types/movie'; 

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

if (!API_KEY) {
  throw new Error('TMDB_API_KEY is missing in .env.local');
}
// image helper
export function getImageUrl(
  path: string | null,
  size: 'w200' | 'w500' | 'w780' | 'original' = 'w500'
): string {
  if (!path) return '/placeholder.jpg';
  return `${IMAGE_BASE}/${size}${path}`;
}

// helper fetch
async function tmdbFetch(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('TMDB API error');
  return res.json();
}

// popular movies
export async function getPopularMovies(page = 1): Promise<TMDBResponse> {
  return tmdbFetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ka-GE&page=${page}`
  );
}

// now playing
export async function getNowPlaying(): Promise<TMDBResponse> {
  return tmdbFetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ka-GE&page=1`
  );
}

// search
export async function searchMovies(query: string, page = 1): Promise<TMDBResponse> {
  return tmdbFetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ka-GE&query=${encodeURIComponent(query)}&page=${page}`
  );
}

// movie details
export async function getMovieById(id: number): Promise<MovieDetails> {
  return tmdbFetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ka-GE`
  );
}

// genres
export async function getGenres(): Promise<Genre[]> {
  const data = await tmdbFetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ka-GE`
  );

  return data.genres || [];
}

// by genre
export async function getMoviesByGenre(genreId: number, page = 1): Promise<TMDBResponse> {
  return tmdbFetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ka-GE&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`
  );
}

// rating color
export function getRatingColor(rating: number): string {
  if (rating >= 8) return '#22c55e';
  if (rating >= 6) return '#d4a930';
  if (rating >= 4) return '#f97316';
  return '#ef4444';
}

// year
export function getYear(dateStr: string): string {
  if (!dateStr) return 'უცნობი';
  return dateStr.split('-')[0];
}

// Georgian genres
export const genreNamesKa: Record<number, string> = {
  28: 'მოქმედება',
  12: 'თავგადასავალი',
  16: 'ანიმაცია',
  35: 'კომედია',
  80: 'კრიმინალი',
  99: 'დოკუმენტური',
  18: 'დრამა',
  14: 'ფანტასტიკა',
  27: 'საშინელება',
  10749: 'რომანტიკა',
  878: 'სამეცნიერო ფანტასტიკა',
  53: 'თრილერი',
};