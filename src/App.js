import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import auth from "./firebase";
import Header from "./Pages/Header/Header";
import Login from "./Pages/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import DisplayOrders from "./Pages/DisplayList/DisplayOrders";
import Order from "./Pages/Order/Order";
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
        <>
          <Header />
          <Switch>
            <Route path="/order/:orderid">
              <Order />
            </Route>
            <Route path="/">
              <DisplayOrders />
            </Route>
          </Switch>
        </>
      )}
    </Router>
  );
}

export default App;
