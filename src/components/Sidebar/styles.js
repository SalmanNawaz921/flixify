import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "10% 0",
  },
  image: {
    width: "70%",
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  genreImages: {
    filter:
      theme.palette.mode === "dark"
        ? "invert(12%) sepia(82%) saturate(3860%) hue-rotate(357deg) brightness(112%) contrast(117%)"
        : "invert(31%) sepia(83%) saturate(2608%) hue-rotate(184deg) brightness(94%) contrast(102%)",
    height: "30px",
  },
}));
