import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const FeatureCard = ({ featuredMovie }) => {
  const classes = useStyles();
  return (
    <Box
      component={Link}
      to={`/movie/${featuredMovie.id}`}
      className={classes.featuredCardContainer}
    >
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          alt={featuredMovie.title}
          image={
            featuredMovie?.poster_path
              ? `https://image.tmdb.org/t/p/original/${featuredMovie?.backdrop_path}`
              : "https://www.fillmurray.com/200/300"
          }
          className={classes.cardMedia}
        />
        <Box padding="20px">
          <CardContent
            className={classes.cardContent}
            classes={{ root: classes.cardContentRoot }}
          >
            <Typography variant="h5" gutterBottom>
              {featuredMovie.title}
            </Typography>
            <Typography variant="body2">{featuredMovie.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeatureCard;
