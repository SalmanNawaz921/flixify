import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useStyles from "./styles";
import { findMovie } from "../../features/currGenreorCategory";
const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(findMovie(query));
      console.log(query);
    }
  };
  const location = useLocation();
  if (
    location.pathname !== "/" &&
    !location.pathname.startsWith("/category/") &&
    !location.pathname.startsWith("/genre/") &&
    !location.search.startsWith("?page=")
  )
    return null;
  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
};

export default Search;
