import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
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
      <Link to="/orders">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
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
