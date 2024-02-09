import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  movieContainer: {
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));
