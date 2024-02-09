import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useGetListQuery } from "../../services/moviesApi";
import { Movie } from "..";
import useStyles from "./styles";
import { useEffect } from "react";
const Watchlist = ({ id }) => {
  const classes = useStyles();
  const {
    data: watchlistMovies,
    isFetching: watchlistFetching,
    error,
    refetch,
  } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  useEffect(() => {
    refetch();
  }, []);
  if (watchlistFetching)
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  if (error) return "An error has occured";
  return (
    <Grid>
      {!watchlistMovies?.results.length ? (
        <Typography variant="h5">Watchlist is empty!</Typography>
      ) : (
        <>
          <Typography variant="h5"> Watchlist</Typography>
          <Grid container className={classes.movieContainer}>
            {watchlistMovies?.results.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Watchlist;
