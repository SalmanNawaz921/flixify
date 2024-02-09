import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { ExitToApp } from "@mui/icons-material";
import { useGetListQuery } from "../../services/moviesApi";
import { MovieList } from "..";
const Profile = () => {
  const { id } = useParams();
  const { data: fvrtMovies, isFetching: fvrtFetching } = useGetListQuery({
    listName: "favorite/movies",
    accountId: id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchListMovies, isFetching: watchFetching } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { user } = useSelector(userSelector);
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout <ExitToApp />
        </Button>
      </Box>
      <Grid>
        {!fvrtMovies?.results.length ? (
          <Typography variant="h5">No Favourite Movies</Typography>
        ) : (
          <Box>
            <Typography variant="h5"> Favourite Movies</Typography>
            <MovieList movies={fvrtMovies?.results} />
          </Box>
        )}
        {!watchListMovies?.results.length ? (
          <Typography variant="h5">No Movies To Watch</Typography>
        ) : (
          <Box>
            <Typography variant="h5"> Watchlist</Typography>
            <MovieList movies={watchListMovies?.results} />
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Profile;
