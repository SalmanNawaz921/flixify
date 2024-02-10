import { useEffect } from "react";
import blueLogo from "../../assets//images/blueLogo.png";
import redLogo from "../../assets/images/redLogo.png";
import genreIcons from "../../assets/genres";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import { useGetGenresQuery } from "../../services/moviesApi";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreorCategory } from "../../features/currGenreorCategory";
const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top-rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdorCategoryName } = useSelector(
    (state) => state.currGenreorCategory
  );
  const theme = useTheme();
  const classes = useStyles();
  const { data, error, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdorCategoryName]);
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          src={theme.palette.mode === "light" ? blueLogo : redLogo}
          alt="flixify_logo"
          className={classes.image}
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            className={classes.links}
            // to="/"
            to={`/category/${label.toLowerCase()}`}
          >
            <ListItem onClick={() => dispatch(selectGenreorCategory(value))}>
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  alt="Logo"
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data?.genres.map((genre, i) => (
            <Link
              key={genre.id}
              className={classes.links}
              to={`/genre/${genre.name.toLowerCase()}`}
              i={i}
            >
              <ListItem
                onClick={() => dispatch(selectGenreorCategory(genre.id))}
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[genre.name.toLowerCase()]}
                    alt="Logo"
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={genre.name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
      {/* <Routes>
        <Route exact path="/category/:categoryName" element={<Movies />} />
        <Route exact path="/genre/:genreName" element={<Movies />} />
      </Routes> */}
    </>
  );
};

export default Sidebar;
