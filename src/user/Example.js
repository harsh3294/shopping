import React, { Component, useState, useEffect } from "react";
import { Carousel } from "react-circular-carousel";
import "react-circular-carousel/dist/index.css";
import OutlinedCard from "./OutlinedCard";
import "./Example.css";
import { DATA } from "./DATA";
import axios from "../axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../assets/images/Loading.gif";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function Example() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const req = await axios
        .get("/products")
        .then((res) => {
          if (!unmounted) {
            setProducts(res.data);
          }
          setLoading(false);
        })
        .catch((error) => alert(error));
    }
    fetchData();

    return () => {
      unmounted = true;
    };
  }, []);
  if (loading) {
    return <img src={Loading} alt="loading" className="loading" />;
  }
  return (
    <Carousel height={410} width={300} id={0} className="carousel">
      {products.map((item) => (
        <OutlinedCard
          key={item?._id}
          id={item?._id}
          img={item?.img}
          name={item?.name}
          rating={item?.rating}
          discount={item?.discount}
          price={item?.originalPrice}
        />
      ))}
    </Carousel>
  );
}

export default Example;
