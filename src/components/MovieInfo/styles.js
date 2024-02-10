import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "100%",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  posterContainer: {},
  poster: {
    borderRadius: "20px",
    boxShadow: "0.5em 1em 1em rgb(64,64,70)",
    width: "80%",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
      height: "350px",
      marginBottom: "30px",
    },
  },

  links: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 1rem",
    },
  },
  genreImages: {
    filter:
      theme.palette.mode === "dark"
        ? "invert(12%) sepia(82%) saturate(3860%) hue-rotate(357deg) brightness(112%) contrast(117%)"
        : "invert(31%) sepia(83%) saturate(2608%) hue-rotate(184deg) brightness(94%) contrast(102%)",
    marginRight: "10px",
    height: "30px",
  },
  genresContainer: {
    margin: "10px 0 !important",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginLeft: "20px",
  },
  actorImage: {
    width: "100%",
    height: "8em",
    maxWidth: "7em",
    objectFit: "cover",
    borderRadius: "10px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "50%",
    height: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "90%",
    },
  },
  buttonGroup: {
    "& .MuiButton-root": {
      color: theme.palette.mode === "dark" ? "#c30702" : "#007fd2", // Text color
      border:
        theme.palette.mode === "dark"
          ? "0.5px solid #c30702"
          : "0.5px solid #007fd2",
      "&:hover": {
        backgroundColor: "#faf7f7",
        border:
          theme.palette.mode === "dark"
            ? "1px solid #c30702"
            : "1px solid #007fd2",
      },
    },
  },
  tagline: {
    fontWeight: "lighter",
  },
}));
