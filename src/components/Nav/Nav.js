import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./nav.css";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#80cbc4",
      },
      button: {
        main: "#212121",
      },
    },
  });

  const userLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsLoggedIn(false);
      window.location.pathname = "/";
    });
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <Typography>
              <Link to="/" className="nav-link">
                HOME
              </Link>
            </Typography>

            {!isLoggedIn ? (
              <Link to="/login" className="button">
                Login
              </Link>
            ) : (
              <>
                <Typography>
                  <Link to="/newpost" className="nav-link">
                    Add Coffee
                  </Link>
                </Typography>

                <Button
                  color="button"
                  variant="outlined"
                  onClick={userLogout}
                  className="nav-button"
                >
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Nav;
