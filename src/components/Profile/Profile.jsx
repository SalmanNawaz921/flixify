import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { ExitToApp } from "@mui/icons-material";
import { useGetListQuery } from "../../services/moviesApi";
import { MovieList } from "..";
import { Favorite, Watchlist } from "..";
const Profile = () => {
  const { id } = useParams();
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
        <Favorite id={id} />
        <Watchlist id={id} />
      </Grid>
    </Box>
  );
};

export default Profile;
