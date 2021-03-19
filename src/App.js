import React, { useEffect, useState } from "react";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./FirebaseConfig/firebase";
import axios from "./axios";
import Category from "./user/Category/Category";

const useStyles = makeStyles({
  root: {
    width: "auto",
    maxWidth: 350,
    textAlign: "center",
    minWidth: 100,

    // marginLeft: 7,
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //login
        let unmounted = false;
        async function fetchData() {
          const req = await axios
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
            })
            .catch((error) => alert(error));
        }
        fetchData();

        return () => {
          unmounted = true;
        };
      } else {
        //logout
        dispatch(logout());
      }
    });
    return unsuscribe;
  }, [dispatch]);

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
            <Route path="/category/:category">
              <DisplayProduct />
            </Route>
            <Route path="/product-detail/:route/:product_id">
              <Description />
            </Route>
            <Route path="/">
              <>
                <br />

                <br />
                <br />
                <Category />
                <br />
                <Carousel />
                <br />
                <div className={classes.root}>
                  <Typography variant="h3" component="h4" gutterBottom>
                    <span className="category__name">Mobiles</span>
                  </Typography>
                </div>
                <Example route="mobiles" />
                <br />
                <div className={classes.root}>
                  <Typography variant="h3" component="h4" gutterBottom>
                    <span className="category__name">Mobiles</span>
                  </Typography>
                </div>
                <ProductSlider route="mobiles" />
                <div className={classes.root}>
                  <Typography variant="h3" component="h4" gutterBottom>
                    <span className="category__name">Accessories</span>
                  </Typography>
                </div>
                <Example route="accessories" />
                <div className={classes.root}>
                  <Typography variant="h3" component="h4" gutterBottom>
                    <span className="category__name">Mens Wear</span>
                  </Typography>
                </div>
                <Example route="menswear" />
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
