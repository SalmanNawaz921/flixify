import { Grid } from "@mui/material";
import useStyles from "./style";
import { Movie } from "..";

const MovieList = ({ movies, noOfMovies }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.movieContainer}>
      {movies.length >= 12
        ? movies
            .slice(0, noOfMovies)
            .map((movie, i) =>
              movie.poster_path ? <Movie key={i} movie={movie} i={i} /> : null
            )
        : movies?.map((movie, i) =>
            movie.poster_path ? <Movie key={i} movie={movie} i={i} /> : null
          )}
    </Grid>
  );
};

export default MovieList;
