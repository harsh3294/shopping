import React, { Component, useState, useEffect } from "react";
import { Carousel } from "react-circular-carousel";
import "react-circular-carousel/dist/index.css";
import OutlinedCard from "./OutlinedCard";
import "./Example.css";
import { DATA } from "./DATA";
import axios from "../axios";

function Example() {
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
    return <h1>Loading</h1>;
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
          price={item?.originalPrice}
        />
      ))}
    </Carousel>
  );
}

export default Example;
