import { Movie } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Actors, Movies, MovieInfo, Navbar, Profile } from ".";
import useStyles from "./styles";
const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          {["/", "/category/:id", "/genre/:id", "?page=:id"].map(
            (path, index) => (
              <Route exact path={path} element={<Movies />} key={index} />
            )
          )}
          <Route exact path="/actors/:id" element={<Actors />} />
          <Route exact path="/movie/:id" element={<MovieInfo />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          {/* <Route exact path="*" element={<NoMatch />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
