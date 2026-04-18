
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  budget: number;
  revenue: number;
  tagline: string;
  status: string;
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
}

export interface Genre {
  id: number;
  name: string;
}


export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}


export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}


export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}


export type SortOption = 'popularity.desc' | 'vote_average.desc' | 'release_date.desc' | 'revenue.desc';


export interface FilterState {
  genre: number | null;
  sort: SortOption;
  search: string;
}
