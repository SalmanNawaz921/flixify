import { useContext, useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";

import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { ToggleModeContext } from "../../utils/ToggleMode";
import { useTheme } from "@mui/material/styles";
import { Link, Routes } from "react-router-dom";
import useStyles from "./styles";
import { Search, Sidebar } from "..";
import { fetchToken, moviesApi, createSessionId } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../features/auth";
const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const colorMode = useContext(ToggleModeContext);
  const token = localStorage.getItem("request_token");
  const session_id_storage = localStorage.getItem("session_id");
  useEffect(() => {
    const loginUser = async () => {
      if (token && session_id_storage) {
        const { data: userData } = await moviesApi.get(
          `/account?session_id=${session_id_storage}`
        );
        dispatch(setUser(userData));
      } else if (token && !session_id_storage) {
        const session_id = await createSessionId(token);
        const { data: userData } = await moviesApi.get(
          `/account?session_id=${session_id}`
        );
        dispatch(setUser(userData));
      }
    };
    loginUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() =>
                setMobileOpen((prevMobileState) => !prevMobileState)
              }
              className={classes.menuBtn}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkBtn}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies </>}
                <Avatar
                  style={{ width: "30", height: "30" }}
                  alt="profile"
                  src={`https://www.themoviedb.prg/t/p/w-64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                ></Avatar>
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() =>
                setMobileOpen((prevMobileState) => !prevMobileState)
              }
              //   className={classes.drawerBackground}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
