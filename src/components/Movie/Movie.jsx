import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { createTheme } from "@mui/material";
const Movie = ({ movie, i }) => {
  const theme = createTheme();
  const classes = useStyles();
  // console.log(movie, i);
  return (
    <Grid item xs={12} sm={8} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i}>
        <div>
          <Link className={classes.link} to={`/movie/${movie.id}`}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "https://www.fillmurray.com/200/300"
              }
              className={classes.image}
              alt={movie.title}
            />
            <Typography className={classes.title} variant="h5">
              {movie.title}
            </Typography>
            <Tooltip
              disableTouchListener
              title={`${movie.vote_average.toFixed(1)}/10`}
            >
              <div>
                <Rating
                  readOnly
                  value={movie.vote_average / 2}
                  precision={0.1}
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "#c30702" : "#007fd2",
                  }}
                />
              </div>
            </Tooltip>
          </Link>
        </div>
      </Grow>
    </Grid>
  );
};

export default Movie;
