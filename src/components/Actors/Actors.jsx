import {
  Grid,
  Box,
  CircularProgress,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import { ArrowBack, Theaters } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import {
  useGetActorInfoQuery,
  useGetActorMoviesQuery,
} from "../../services/moviesApi";
import useStyles from "./styles";
import { MovieList } from "..";

const Actors = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorInfoQuery({ actorId: id });
  const {
    data: actorMovies,
    isFetching: fetchingMovies,
    error: moviesError,
  } = useGetActorMoviesQuery({ actorId: id });
  console.log(data);
  const classes = useStyles();
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error)
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gone wrong - go back</Link>
      </Box>
    );
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          alt={data?.name}
          className={classes.poster}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          className={classes.title}
          marginTop="20px"
        >
          {data?.name}
          {/* //- {data?.biography?.slice(0, 4)} */}
        </Typography>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className={classes.title}
          marginTop="20px"
        >
          Born : &nbsp;{" "}
          {new Date(data?.birthday).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {/* //- {data?.biography?.slice(0, 4)} */}
        </Typography>
        <Typography
          variant="subtitle_1"
          align="center"
          className={classes.tagline}
          gutterBottom
        >
          {data?.biography}
        </Typography>
        <Grid item className={classes.buttonsContainer} marginTop="20px">
          <Button
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/names/${data?.imdb_id}`}
            endIcon={<Theaters />}
            variant="contained"
          >
            IMDB
          </Button>
          <Button
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<ArrowBack />}
            sx={{ borderColor: "primary.main", textDecoration: "none" }}
            variant="contained"
          >
            <Typography
              component={Link}
              to="/"
              variant="subtitle_2"
              sx={{ textDecoration: "none" }}
              color="inherit"
            >
              Back
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          Movies
        </Typography>
        {fetchingMovies ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : actorMovies ? (
          <MovieList movies={actorMovies?.cast} noOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found</Box>
        )}
      </Box>
    </Grid>
  );
};

export default Actors;
