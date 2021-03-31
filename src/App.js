import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import UserDash from "./Components/UserDash";
import Dashboard from "./Components/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/delivery">
          <Dashboard name="Delivery" />
        </Route>{" "}
        <Route path="/delivery-user">
          <Dashboard name="Delivery User" />
        </Route>
        <Route path="/add-product">
          <Dashboard name="Add Product" />
        </Route>
        <Route path="/delivered-orders">
          <Dashboard name="Delivered Orders" />
        </Route>
        <Route path="/list-products">
          <Dashboard name="List Products" />
        </Route>
        <Route path="/">
          <Dashboard name="DashBoard" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
