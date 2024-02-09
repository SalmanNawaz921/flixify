import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  movieContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "hidden",
    // justifyContent: "flex-start", // Default to center

    // overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));
