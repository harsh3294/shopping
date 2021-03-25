import React, { useState } from "react";
import "./UserDash.css";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";

import {
  IconButton,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  dividerColor: {
    backgroundColor: "white",
  },
}));

const CssList = withStyles({
  root: {
    "& .MuiButtonBase-root": {
      color: "rgb(255,255,255)",
    },
    "& .MuiListItem-root": {
      marginTop: 20,
      fontFamily: "Raleway",
    },
  },
})(List);

export function UserDash() {
  const classes = useStyles();
  const history = useHistory();
  const [click, setClick] = useState(false);
  const [page, setPage] = useState("");

  const handleChange = (name) => {
    switch (name) {
      case "dashboard":
        setPage("");
        break;
      case "newcase":
        setPage("");
        break;
      case "pencase":
        setPage("<h1/>");
        break;
      default:
        setPage("<UDash />");
        break;
    }
  };
  const handleClick = () => {
    setClick(!click);
  };

  return (
    <>
      <div className="main">
        <nav className={click ? "dashbar " : "dashbar active"}>
          <p className="logo">DPS</p>
          <Divider variant="middle" classes={{ root: classes.dividerColor }} />
          <CssList>
            <ListItem button onClick={() => handleChange("dashboard")}>
              <ListItemIcon>
                <DashboardOutlinedIcon className="iconss" />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  style={{ color: "rgb(255, 217, 0)", fontFamily: "Raleway" }}
                >
                  Dashboard
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={() => handleChange("newcase")}>
              <ListItemIcon>
                <CreateOutlinedIcon className="iconss" />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  style={{ color: "rgb(255, 217, 0)", fontFamily: "Raleway" }}
                >
                  Register New Case
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={() => handleChange("pencase")}>
              <ListItemIcon>
                <DescriptionOutlinedIcon className="iconss" />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  style={{ color: "rgb(255, 217, 0)", fontFamily: "Raleway" }}
                >
                  Registered Case
                </Typography>
              </ListItemText>
            </ListItem>
            {/* <ListItem button onClick={signOut}>
              <ListItemIcon>
                <ExitToAppOutlinedIcon className="iconss" />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  style={{ color: "rgb(255, 217, 0)", fontFamily: "Raleway" }}
                >
                  Logout
                </Typography>
              </ListItemText>
            </ListItem> */}
          </CssList>
        </nav>
        <div className="page">
          <div>
            <IconButton onClick={handleClick} className="BtnActive">
              {click ? (
                <CloseRoundedIcon className="iconss" />
              ) : (
                <MenuRoundedIcon className="iconss" />
              )}
            </IconButton>
            {!click && (
              <div className="BtnActive">
                <IconButton onClick={() => handleChange("dashboard")}>
                  <DashboardOutlinedIcon className="iconss" />
                </IconButton>
                <IconButton onClick={() => handleChange("newcase")}>
                  <CreateOutlinedIcon className="iconss" />
                </IconButton>
                <IconButton onClick={() => handleChange("pencase")}>
                  <DescriptionOutlinedIcon className="iconss" />
                </IconButton>
                {/* <IconButton onClick={signOut}>
                  <ExitToAppOutlinedIcon className="iconss" />
                </IconButton> */}
              </div>
            )}
          </div>
          {page}
        </div>
      </div>
    </>
  );
}

export default UserDash;
