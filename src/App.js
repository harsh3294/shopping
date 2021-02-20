import React from "react";
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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <div>
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
              <br />
              <br />
              <br />
              <Carousel />
              <br />
              <Example />
              <br />
              <ProductSlider />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
