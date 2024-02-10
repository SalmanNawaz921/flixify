import { Movie } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Actors, Movies, MovieInfo, Navbar, Profile } from ".";
import useStyles from "./styles";
import useAlan from "./Alan";
import { useEffect, useRef } from "react";

const App = () => {
  const alanBtnContainer = useRef(null);

  // const navigate = useNavigate();
  useAlan();

  // useEffect(() => {
  //   navigate("/");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          {["/", "/category/:id", "/genre/:id", "?page=:id", "/approved"].map(
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
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default App;
