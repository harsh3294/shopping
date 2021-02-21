import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../src/user/Header/Header";
import Carousel from "./user/Carousel";
import Example from "./user/Example";
import Login from "./user/Login/Login";
import SignUp from "./user/SignUp/SignUp";
import Footer from "./user/Footer/Footer";
import ProductSlider from "./user/ProductSlider/ProductSlider";
import Description from "./user/Description/Description";
import DisplayList from "./user/List/DisplayList";
import DisplayProduct from "./user/List/DisplayProduct";
import Cart from "./user/Cart/Cart";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { login, logout, selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <>
          <Header />
          <Switch>
            <Route path="/product">
              <DisplayProduct />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/product-detail/:product_id">
              <Description />
            </Route>
            <Route path="/">
              <>
                <br />
                <br />
                <br />
                <Carousel />
                <br />
                <Example />
                <br />
                <ProductSlider />
              </>
            </Route>
          </Switch>
          <Footer />
        </>
      </Switch>
    </Router>
  );
}

export default App;
