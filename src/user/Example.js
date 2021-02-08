import React, { Component } from "react";
import { Carousel } from "react-circular-carousel";
import "react-circular-carousel/dist/index.css";
import OutlinedCard from "./OutlinedCard";
import "./Example.css";

class Example extends Component {
  render() {
    return (
      <Carousel height={393} width={300} id={5} className="carousel">
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
        <OutlinedCard />
      </Carousel>
    );
  }
}

export default Example;
