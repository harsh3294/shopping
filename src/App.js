import React from "react";
import "./App.css";
import Header from "../src/user/Header";
import Carousel from "./user/Carousel";
import Example from "./user/Example";
import Login from "./user/Login/Login";
import SignUp from "./user/SignUp/SignUp";
function App() {
  return (
    <div className="app">
      {/* <Header />
      <br />
      <br />
      <br />
      <br />

      <Carousel />
      <br />

      <Example />
      <br />
      <br />
      <br /> */}
      <Login />
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
