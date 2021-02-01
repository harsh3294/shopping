import React, { Component } from "react";
import { Carousel } from "react-circular-carousel";
import "react-circular-carousel/dist/index.css";
import OutlinedCard from "./OutlinedCard";

class Example extends Component {
  render() {
    return (
      <Carousel height={350} width={280} id={5}>
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
