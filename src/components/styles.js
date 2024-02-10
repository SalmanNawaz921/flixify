import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  toolbar: {
    height: "70px",
  },
  content: {
    flexGrow: 1,
    padding: "2em",
  },
}));
