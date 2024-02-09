import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "../services/moviesApi";
import genreorCategoryReducer from "../features/currGenreorCategory";
import userReducer from "../features/auth";
export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    currGenreorCategory: genreorCategoryReducer,
    user: userReducer,
    // player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});
