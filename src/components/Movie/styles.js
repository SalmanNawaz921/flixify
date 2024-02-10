import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  movie: {
    padding: "10px",
    marginRight: "20px",
  },
  link: {
    alignItems: "center",
    fontWeight: "bold",
    textDecoration: "none",
    color: theme.palette.color,
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  image: {
    borderRadius: "20px",
    height: "300px",
    marginBottom: "10px",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: "ellipsis",
    width: "230px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginTop: "10px",
    marginBottom: 0,
    textAlign: "center",
    // color: "red",
  },
}));
