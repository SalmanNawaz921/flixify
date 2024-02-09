import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const movieApiKey = import.meta.env.VITE_MOVIE_API_KEY;
const page = 1;
// 'https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1'
export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${movieApiKey}`,
    }),
    // Get Movie
    getMovie: builder.query({
      query: (id) =>
        `movie/${id}?append_to_response=videos,credits&api_key=${movieApiKey}`,
    }),
    // Get Movies By Type
    getMovies: builder.query({
      query: ({ genreIdorCategoryName, page, searchQuery }) => {
        //Search Movie

        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${movieApiKey}`;
        }

        // GET Movies By Category
        if (
          genreIdorCategoryName &&
          typeof genreIdorCategoryName === "string"
        ) {
          // consol e.log(genreIdorCategoryName);
          return `movie/${
            genreIdorCategoryName === "top-rated"
              ? "top_rated"
              : genreIdorCategoryName
          }?page=${page}&api_key=${movieApiKey}`;
        }
        // GET Movies By Genre
        if (
          genreIdorCategoryName &&
          typeof genreIdorCategoryName === "number"
        ) {
          console.log(genreIdorCategoryName);
          return `discover/movie?with_genres=${genreIdorCategoryName}&page=${page}&api_key=${movieApiKey}`;
        }
        // GET Popular Movies
        return `movie/popular?page=${page}&api_key=${movieApiKey}`;
      },
    }),
    // GET Recommended Movies
    getRecommendedMovies: builder.query({
      query: ({ list, movie_id }) =>
        `/movie/${movie_id}/${list}?api_key=${movieApiKey}`,
    }),
    //GET Actor Details
    getActorInfo: builder.query({
      query: ({ actorId }) => `/person/${actorId}?api_key=${movieApiKey}`,
    }),
    //GET Actor Movies
    getActorMovies: builder.query({
      query: ({ actorId }) =>
        `/person/${actorId}/movie_credits?api_key=${movieApiKey}`,
    }),
    // GET User Specific Lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${movieApiKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendedMoviesQuery,
  useGetActorInfoQuery,
  useGetActorMoviesQuery,
  useGetListQuery,
} = moviesApi;
