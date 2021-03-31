import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import { Link } from "react-router-dom";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CreateIcon from "@material-ui/icons/Create";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
export const mainListItems = (
  <div>
    <ListItem button>
      <Link to="/">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>{" "}
          <ListItemText primary="View & Update Orders" />{" "}
        </div>
      </Link>
    </ListItem>
    <ListItem button>
      <Link to="/delivered-orders">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ListItemIcon>
            <AllInboxIcon />
          </ListItemIcon>{" "}
          <ListItemText primary="Delivered Orders" />{" "}
        </div>
      </Link>
    </ListItem>
    <ListItem button>
      <Link to="/list-products">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ListItemIcon>
            <BorderColorIcon />
          </ListItemIcon>
          <ListItemText primary="View Products" />
        </div>
      </Link>
    </ListItem>
    <ListItem button>
      <Link to="/add-product">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Add Product" />
        </div>
      </Link>
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Delivery Process</ListSubheader>
    <ListItem button>
      <Link to="/delivery">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ListItemIcon>
            <LocalShippingIcon />
          </ListItemIcon>
          <ListItemText primary="Delivery" />
        </div>
      </Link>
    </ListItem>
    <ListItem button>
      <Link to="/delivery-user">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText primary="Add Delivery Boy" />
        </div>
      </Link>
    </ListItem>
    {/* <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);
