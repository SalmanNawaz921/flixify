import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useGetListQuery, useGetMovieQuery } from "../../services/moviesApi";
import useStyles from "./styles";
import genreIcons from "../../assets/genres";
import { selectGenreorCategory } from "../../features/currGenreorCategory";
import { useGetRecommendedMoviesQuery } from "../../services/moviesApi";
import { MovieList } from "..";
import { useEffect, useState } from "react";
import { userSelector } from "../../features/auth";

const MovieInfo = () => {
  const { user } = useSelector(userSelector);
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispatch = useDispatch();
  // console.log(data);
  // const isMovieFavourited = false;
  // const isMovieWatchlisted = false;
  const [isMovieFavourited, setIsMovieFavourited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: fvrtMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchListMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const {
    data: recommendedMovies,
    isFetching: isRecommendedFetching,
    error: recommendedError,
  } = useGetRecommendedMoviesQuery({ list: "/recommendations", movie_id: id });

  useEffect(() => {
    setIsMovieFavourited(
      !!fvrtMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [fvrtMovies, data]);
  useEffect(() => {
    setIsMovieWatchlisted(
      watchListMovies?.results?.findIndex((movie) => movie.id === data?.id) !==
        -1
    );
  }, [watchListMovies, data]);
  const addToFavourites = async () => {
    const session_id = localStorage.getItem("session_id");
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        import.meta.env.VITE_MOVIE_API_KEY
      }&session_id=${session_id}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavourited,
      }
    );
    setIsMovieFavourited((prev) => !prev);
  };
  const addToWatchList = async () => {
    const session_id = localStorage.getItem("session_id");
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        import.meta.env.VITE_MOVIE_API_KEY
      }&session_id=${session_id}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  };
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
      <Grid
        item
        sm={12}
        lg={4}
        style={{ display: "flex", marginBottom: "40px" }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
          className={classes.poster}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className={classes.title}
        >
          {data?.title} - {data?.release_date?.slice(0, 4)}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          className={classes.tagline}
          gutterBottom
        >
          {data?.tagline}
        </Typography>

        <Grid className={classes.containerSpaceAround} item>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2} precision={0.1} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average.toFixed(1)} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} min | Language:
            {data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres.map(({ id, name }) => (
            <Link
              key={id}
              className={classes.links}
              onClick={() => dispatch(selectGenreorCategory(id))}
              to="/"
            >
              {" "}
              <img
                src={genreIcons[name.toLowerCase()]}
                alt="Logo"
                className={classes.genreImages}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle_1" gutterBottom>
                {name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography
          variant="h5"
          // marginLeft="40px"
          align="left"
          style={{ marginTop: "10px" }}
          gutterBottom
        >
          Overview
        </Typography>
        <Typography
          variant="subtitle_1"
          align="left"
          // marginLeft="40px"
          marginBottom="2rem"
          gutterBottom
        >
          {data?.overview}
        </Typography>
        <Typography variant="h5" align="left" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {/* Limit to only 6 */}
          {data?.credits?.cast.slice(0, 6).map(
            (actor, i) =>
              actor.profile_path && (
                <Grid
                  item
                  xs={4}
                  md={2}
                  key={i}
                  marginBottom="10px"
                  // marginLeft={i === 0 ? "20px" : "0px"}
                  component={Link}
                  to={`/actors/${actor.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                    className={classes.actorImage}
                  />
                  <Typography letterSpacing="0.00938em" color="textPrimary">
                    {actor.name}
                  </Typography>
                  <Typography variant="subtitle_1" color="textSecondary">
                    {actor.character.split("/")[0]}
                  </Typography>
                </Grid>
              )
          )}
        </Grid>
        <Grid item container>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  WEBSITE
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/titles/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  href="#"
                  onClick={() => setOpen(true)}
                  endIcon={<Theaters />}
                >
                  TRAILER
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  // href={data?.homepage}
                  endIcon={
                    isMovieFavourited ? (
                      <FavoriteBorderOutlined />
                    ) : (
                      <Favorite />
                    )
                  }
                  onClick={addToFavourites}
                >
                  {isMovieFavourited ? "UNFAVORITE" : "FAVORITE"}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  {isMovieWatchlisted ? "REMOVE" : "WATCHLIST"}
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<ArrowBack />}
                  // sx={{ borderColor: "primary.main", textDecoration: "none" }}
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
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          You Might Also Like
        </Typography>
        {isRecommendedFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : recommendedMovies ? (
          <MovieList movies={recommendedMovies?.results} noOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
            title="Trailer"
            frameBorder="0"
            className={classes.video}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInfo;
