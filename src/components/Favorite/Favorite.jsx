import { Box, CircularProgress, Button, Grid, Typography } from "@mui/material";
import { useGetListQuery } from "../../services/moviesApi";
import { Movie } from "..";
import useStyles from "./styles";
import { useEffect } from "react";
const Favorite = ({ id }) => {
  const classes = useStyles();
  const {
    data: fvrtMovies,
    isFetching: fvrtFetching,
    error,
    refetch,
  } = useGetListQuery({
    listName: "favorite/movies",
    accountId: id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(() => {
    refetch();
  }, []);
  if (fvrtFetching)
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  if (error) return "An error has occured";
  return (
    <Grid>
      {!fvrtMovies?.results.length ? (
        <Typography variant="h5">No Favourite Movies</Typography>
      ) : (
        <>
          {" "}
          <Typography variant="h5"> Favourite Movies</Typography>
          <Grid container className={classes.movieContainer}>
            {fvrtMovies?.results.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Favorite;
