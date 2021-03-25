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
        <Route path="/orders">
          <Dashboard name="Orders" />
        </Route>
        <Route path="/">
          <Dashboard name="DashBoard" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
