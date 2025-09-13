import Constants from 'expo-constants';

const EXPO_PUBLIC_TMDB_API_KEY = Constants.manifest?.extra?.EXPO_PUBLIC_TMDB_API_KEY ?? "";

const EXPO_PUBLIC_TMDB_BASE = "https://api.themoviedb.org/3";

// ----------------------
// Types
// ----------------------
export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Person {
  id: number;
  name: string;
  known_for_department: string;
  popularity: number;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  order: number;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

interface SearchResponse<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}

// ----------------------
// Helper
// ----------------------
async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, any> = {},
): Promise<T> {
  const url = new URL(`${EXPO_PUBLIC_TMDB_BASE}${endpoint}`);
  url.searchParams.set("api_key", EXPO_PUBLIC_TMDB_API_KEY);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ----------------------
// API Functions
// ----------------------

/** Search movies by title */
export async function searchMovieByTitle(
  title: string,
  page = 1,
  year?: number,
): Promise<Movie[]> {
  const data = await tmdbFetch<SearchResponse<Movie>>("/search/movie", {
    query: title,
    page,
    year,
  });
  return data.results;
}

/** Get full movie details */
export async function getMovieDetails(movieId: number): Promise<Movie> {
  return tmdbFetch<Movie>(`/movie/${movieId}`);
}

/** Get credits (cast + crew) for a movie */
export async function getMovieCredits(movieId: number): Promise<MovieCredits> {
  return tmdbFetch<MovieCredits>(`/movie/${movieId}/credits`);
}

/** Search people by name */
export async function searchPersonByName(
  name: string,
  page = 1,
): Promise<Person[]> {
  const data = await tmdbFetch<SearchResponse<Person>>("/search/person", {
    query: name,
    page,
  });
  return data.results;
}

/** Find movies by director name */
export async function findMoviesByDirector(
  directorName: string,
  minVoteCount = 0,
): Promise<Movie[]> {
  const persons = await searchPersonByName(directorName);
  if (!persons.length) return [];

  const director = persons[0]; // take the first match
  const credits = await tmdbFetch<{ crew: (Movie & { job: string })[] }>(
    `/person/${director.id}/movie_credits`,
  );

  return credits.crew.filter(
    (m) => m.job === "Director" && m.vote_count >= minVoteCount,
  );
}
