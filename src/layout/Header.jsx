import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const { darkMode, btnDarkMode } = useContext(ThemeContext);
  const auth = useAuth();
  const logout = useLogout();

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        bgcolor: "info",
        color: "white",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          <Link style={{ color: "white", textDecoration: "none" }} to={`/`}>
            Person Management
          </Link>
          {!auth?.UserId > 0 ? (
            <>
              <Link style={{ color: "white", textDecoration: "none", marginInline: "50px" }} to={`/login`}>
                Login
              </Link>
              <Link style={{ color: "white", textDecoration: "none" }} to={`/register`}>
                Register
              </Link>
            </>
          ) : (
            <Button
              onClick={() => {
                logout();
              }}
              variant="contained"
              color="warning"
              sx={{ marginInlineStart: "2rem" }}
              size="small"
            >
              Logout
            </Button>
          )}
        </Typography>
        <IconButton onClick={btnDarkMode}>{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
