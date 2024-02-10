import { useContext, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { ToggleModeContext } from "../utils/ToggleMode";
import { useDispatch } from "react-redux";
import {
  findMovie,
  selectGenreorCategory,
} from "../features/currGenreorCategory";

import { fetchToken } from "../utils";
import { useNavigate } from "react-router-dom";

const useAlan = () => {
  const { setMode } = useContext(ToggleModeContext);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    alanBtn({
      key: "ee78f3247a695a149501ea7aa19f71092e956eca572e1d8b807a3e2338fdd0dc/stage",

      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );

          if (foundGenre) {
            history(`/genre/${foundGenre.name.toLowerCase()}`);
            dispatch(selectGenreorCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            history(`/category/${category}`);
            dispatch(selectGenreorCategory(category));
          }
        } else if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          window.location.href = "/";
        } else if (command === "search") {
          dispatch(findMovie(query));
        }
      },
    });
  }, [dispatch, setMode]);
};

export default useAlan;
