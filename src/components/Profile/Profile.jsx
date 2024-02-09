import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { ExitToApp } from "@mui/icons-material";

const Profile = () => {
  const { id } = useParams();
  const { user } = useSelector(userSelector);
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const fvrtMovies = [];
  console.log(user);
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
      {!fvrtMovies.length ? (
        <Typography variant="h5">No Favourite Movies</Typography>
      ) : (
        <Box> Favourite Movies</Box>
      )}
    </Box>
  );
};

export default Profile;
