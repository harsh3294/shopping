import React, { Component } from "react";
import { Carousel } from "react-circular-carousel";
import "react-circular-carousel/dist/index.css";
import OutlinedCard from "./OutlinedCard";
import "./Example.css";
import { DATA } from "./DATA";

class Example extends Component {
  render() {
    return (
      <Carousel height={400} width={300} id={0} className="carousel">
        {DATA.map((item) => (
          <OutlinedCard
            id={item.id}
            img={item.img}
            name={item.name}
            rating={item.rating}
            price={item.price}
          />
        ))}
      </Carousel>
    );
  }
}

export default Example;
