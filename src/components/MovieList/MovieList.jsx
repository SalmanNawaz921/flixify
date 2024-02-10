import { Grid } from "@mui/material";
import useStyles from "./style";
import { Movie } from "..";

const MovieList = ({ movies, noOfMovies, excludeFirst }) => {
  const classes = useStyles();
  const stFrom = excludeFirst ? 1 : 0;
  return (
    <Grid container className={classes.movieContainer}>
      {movies.length >= 12
        ? movies
            .slice(stFrom, noOfMovies)
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
