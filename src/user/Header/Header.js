import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./Header.css";
import SideBar from "../Sidebar/SideBar";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#05386b",
    fontWeight: "bold",
    fontFamily: "Dancing Script, cursive",
    letterSpacing: "0.130rem",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {/* <MenuIcon /> */}
            <SideBar />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Shoppers
          </Typography>
          <Link to="/cart">
            <IconButton>
              <ShoppingCartIcon className="header__cart" />
              <span className="header__cartCount">0</span>
            </IconButton>
          </Link>

          <Link to="/login">
            <Button
              color="inherit"
              className="header__login"
              endIcon={<ExitToAppIcon />}
            >
              Login
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
