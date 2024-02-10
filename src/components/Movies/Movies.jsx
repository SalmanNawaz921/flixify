import { useState } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { useGetMoviesQuery } from "../../services/moviesApi";
import { useSelector } from "react-redux";
import { MovieList } from "..";
import { Link, useNavigate } from "react-router-dom";
import FeatureCard from "../FeatureCard/FeatureCard";
import useStyles from "./styles";
const Movies = () => {
  const classes = useStyles();
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const noOfMovies = lg ? 16 : 17;
  const history = useNavigate();
  const [page, setPage] = useState(1);
  const { genreIdorCategoryName, searchQuery } = useSelector(
    (state) => state.currGenreorCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdorCategoryName,
    page,
    searchQuery,
  });
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data?.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }
  if (error) return "An error has occured";
  const navigateToPage = (newPage) => {
    history(`?page=${newPage}`);
    setPage(newPage);
  };
  return (
    <>
      <FeatureCard featuredMovie={data?.results[0]} />
      <MovieList movies={data?.results} noOfMovies={noOfMovies} excludeFirst />
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {" "}
        <Button
          component={Link}
          to={`?page=${page - 1}`}
          onClick={() => (page - 1 === 0 ? setPage(page) : setPage(page - 1))}
        >
          <ArrowCircleLeft
            fontSize="large"
            className={classes.paginationIcon}
          />
        </Button>
        <Typography variant="h4">{page}</Typography>
        <Button
          component={Link}
          to={`?page=${page + 1}`}
          onClick={() =>
            page + 1 > data?.total_pages
              ? navigateToPage(page)
              : navigateToPage(page + 1)
          }
        >
          <ArrowCircleRight
            fontSize="large"
            className={classes.paginationIcon}
          />
        </Button>
      </div>
    </>
  );
};

export default Movies;
