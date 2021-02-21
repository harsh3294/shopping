import React, { useEffect, useState } from "react";
import "./util.css";
import "./Login.css";
import Background from "./background.jpg";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
import { Divider } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../FirebaseConfig/firebase";
import { login, logout, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(username, password)
      .then((authUser) => {
        const unsuscribe = auth.onAuthStateChanged((userAuth) => {
          if (userAuth) {
            let unmounted = false;
            function fetchData() {
              const req = axios
                .get(`/user/${userAuth.uid}`)
                .then((res) => {
                  if (!unmounted) {
                    dispatch(
                      login({
                        uid: res.data[0].uid,
                        name: res.data[0].name,
                      })
                    );
                  }
                  setLoading(false);
                  history.push("/");
                })
                .catch((error) => alert(error));
            }
            fetchData();

            return () => {
              unmounted = true;
            };
            //login
          } else {
            //logout
            dispatch(logout());
          }
        });
        return unsuscribe;
      })
      .catch((error) => {
        alert(error.message);
      });
  };
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
              data-validate="Username is required"
            >
              <span className="label-input100">Username</span>
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Type your username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="focus-input100 focus__icon">
                <PermIdentityIcon />
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span className="label-input100">Password</span>
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Type your password"
                onChange={(e) => setPassword(e.target.value)}
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
                <button className="login100-form-btn" onClick={signIn}>
                  Login
                </button>
              </div>
            </div>
            <Divider style={{ marginTop: "40px" }} />
            <div
              className="txt1 text-center"
              style={{ paddingBottom: "20px", paddingTop: "20px" }}
            >
              <span>Or Login Using</span>
            </div>
            <Divider style={{ marginTop: "40px" }} />
            <div
              className="txt1 text-center"
              style={{ paddingBottom: "20px", paddingTop: "20px" }}
            >
              <span>Or SignUp Using</span>
              <br />
              <Link to="/sign-up">
                <span className="txt2">SignUp</span>
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
