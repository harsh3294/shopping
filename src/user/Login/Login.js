import React from "react";
import "./util.css";
import "./Login.css";
import Background from "./background.jpg";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
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
              Login
            </span>

            <div
              className="wrap-input100 validate-input m-b-23"
              style={{ marginBottom: "23px" }}
            >
              <span className="label-input100">Username</span>
              <input
                className="input100"
                type="text"
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
                <button className="login100-form-btn">Login</button>
              </div>
            </div>

            <div
              className="txt1 text-center"
              style={{ paddingBottom: "20px", paddingTop: "40px" }}
            >
              <span>Or Login Using</span>
            </div>
            <div
              className="txt1 text-center"
              style={{ paddingBottom: "20px", paddingTop: "54px" }}
            >
              <span>Or SignUp Using</span>
              <br />
              <span className="txt2">SignUp</span>
              {/* <a className="txt2">Sign Up</a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
