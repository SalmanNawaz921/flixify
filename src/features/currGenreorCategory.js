import { createSlice } from "@reduxjs/toolkit";

export const genreorCategory = createSlice({
  name: "genreorCategory",
  initialState: {
    genreIdorCategoryName: "",
    page: 1,
    searchQuery: "",
  },
  reducers: {
    selectGenreorCategory: (state, action) => {
      state.genreIdorCategoryName = action.payload;
      state.searchQuery = "";
    },
    findMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreorCategory, findMovie } = genreorCategory.actions;
export default genreorCategory.reducer;
