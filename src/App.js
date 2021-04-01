import React, { useEffect } from "react";
import "./App.css";
import UserDash from "./Components/UserDash";
import Dashboard from "./Components/Dashboard";
import Login from "./Pages/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import auth from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //login
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //logout
        dispatch(logout());
      }
    });
    return unsuscribe;
  }, [dispatch]);
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
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
      )}
    </Router>
  );
}

export default App;
