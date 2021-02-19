import React from "react";
import "./util.css";
import "./SignUp.css";
import Background from "./background.jpg";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
import CreateIcon from "@material-ui/icons/Create";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="limiter">
      <div
        className="container-login100"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div
          className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54"
          style={{
            paddingLeft: "55px",
            paddingRight: "55px",
            paddingTop: "65px",
            paddingBottom: "54px",
          }}
        >
          <form className="login100-form validate-form">
            <span
              className="login100-form-title p-b-49"
              style={{ paddingBottom: "49px" }}
            >
              Sign Up
            </span>
            <div
              className="wrap-input100 validate-input m-b-23"
              style={{ marginBottom: "23px" }}
            >
              <span className="label-input100">Enter Name</span>
              <input
                className="input100"
                type="text"
                name="fname"
                placeholder="Enter Name"
              />
              <span className="focus-input100 focus__icon">
                <CreateIcon />
              </span>
            </div>
            <div
              className="wrap-input100 validate-input m-b-23"
              style={{ marginBottom: "23px" }}
            >
              <span className="label-input100">Username</span>
              <input
                className="input100"
                type="email"
                name="username"
                placeholder="Type your username"
              />
              <span className="focus-input100 focus__icon">
                <PermIdentityIcon />
              </span>
            </div>

            <div className="wrap-input100 validate-input">
              <span className="label-input100">Password</span>
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Type your password"
              />
              <span className="focus-input100 focus__icon">
                <LockIcon />
              </span>
            </div>

            <div
              className="text-right"
              style={{ paddingBottom: "31px", paddingTop: "8px" }}
            >
              {/* <a href="#">Forgot password?</a> */}
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">Sign Up</button>
              </div>
            </div>
            <Divider style={{ marginTop: "40px" }} />
            <div
              className="txt1 text-center"
              style={{ paddingBottom: "20px", paddingTop: "20px" }}
            >
              <span>Already a user?</span>
              <br />
              <Link to="/login">
                <span className="txt2">Login</span>
              </Link>

              {/* <a className="txt2">Sign Up</a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
