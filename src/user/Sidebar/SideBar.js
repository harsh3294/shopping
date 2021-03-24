import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./SideBar.css";
import { Divider, List, ListItem, ListItemIcon } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import EmptyCart from "../../assets/images/empty_cart_image.jpg";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Link to="/">
        <div className="sidebar__logo">
          <img src={EmptyCart} alt="" className="sidebar__img" />
        </div>
      </Link>
      <Divider />
      <List>
        <ListItem button>
          <Link to="/orders">
            <div className="sidebar__menuItem">
              <ListItemIcon>
                <ShoppingBasketIcon className="sidebar__menuIcon" />
              </ListItemIcon>
              <ListItemText primary="Orders" className="sidebar__menuName" />
            </div>
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/cart">
            <div className="sidebar__menuItem">
              <ListItemIcon>
                <ShoppingCartIcon className="sidebar__menuIcon" />
              </ListItemIcon>
              <ListItemText primary="Cart" className="sidebar__menuName" />
            </div>
          </Link>
        </ListItem>
      </List>
      ;
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            className="sidebar__navigation"
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
