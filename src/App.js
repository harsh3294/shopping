import React from "react";
import "./App.css";
import Header from "../src/user/Header/Header";
// import Carousel from "./user/Carousel";
// import Example from "./user/Example";
// import Login from "./user/Login/Login";
// import SignUp from "./user/SignUp/SignUp";
import Footer from "./user/Footer/Footer";
// import ProductSlider from "./user/ProductSlider/ProductSlider";
// import Description from "./user/Description/Description";
// import DisplayList from "./user/List/DisplayList";
// import DisplayProduct from "./user/List/DisplayProduct";
import Cart from "./user/Cart/Cart";
function App() {
  return (
    <div className="app">
      <Header />
      {/* <Header />
      <br />
      <br />
      <br />
      <Carousel />
      <br />

      <Example /> */}
      {/* <Login /> */}
      {/* <SignUp /> */}
      {/* <ProductSlider />
      <Footer /> */}
      {/* <Description /> */}
      {/* <DisplayList /> */}
      {/* <DisplayProduct /> */}
      <Cart />
      <Footer />
    </div>
  );
}

export default App;
