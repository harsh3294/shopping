import React, { useState } from "react";
import CarouselSlider from "react-carousel-slider";
import "./ProductSlider.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { DATA } from "../DATA";
import Rating from "@material-ui/lab/Rating";
// import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
function ProductSlider() {
  let itemsStyle = {
    padding: "0px",
    background: "white",
    marginLeft: "4px",
    marginRight: "10px",
    boxShadow: "1px 1px 1px 1px #9E9E9E",
    borderRadius: "4px",
  };

  let imgStyle = {
    height: "60%",
    padding: "10px",
    width: "150px",
    borderBottom: "1px solid #9E9E9E",
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  let textBoxStyle = {
    fontFamily: "Quicksand, sans-serif",
    cursor: "pointer",
    width: "100%",
    top: "260px",
    color: "black",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    background: "transparent",
    fontSize: "12px",
    fontWeight: "800",
  };

  let textBoxStyle2 = {
    width: "100%",
    top: "340px",
    color: "black",
    fontFamily: "Times New Roman",
    background: "transparent",
    fontSize: "12px",
    fontWeight: "600",
  };
  let rating = {
    marginLeft: "16px",
    top: "80px",
  };

  let scientists = DATA.map((item) => (
    <div key={item.id}>
      <img style={imgStyle} src={item.img}></img>
      <p style={textBoxStyle}>{truncate(item.name, 50)}</p>
      <Rating style={rating} name="read-only" value={item.rating} readOnly />
      <p style={textBoxStyle2}>{item.price}</p>
    </div>
    // <MediaCard image={item.imgSrc} p1={item.name} p2={item.des} />
  ));

  let btnWrapperStyle = {
    position: "relative",
    borderRadius: "50%",
    height: "50px",
    width: "50px",
    boxShadow: "1px 1px 1px 1px transparent",
    textAlign: "center",
  };

  let btnStyle = {
    display: "inline-block",
    position: "relative",
    top: "25%",
    transform: "translateY(-40%)",
    fontSize: "46px",
  };

  let rBtnCpnt = (
    <div style={btnWrapperStyle}>
      <div style={btnStyle} className="material-icons">
        <ChevronRightIcon />
      </div>
    </div>
  );

  let lBtnCpnt = (
    <div style={btnWrapperStyle}>
      <div style={btnStyle} className="material-icons">
        <ChevronLeftIcon />
      </div>
    </div>
  );

  let scientistsCard = (
    <CarouselSlider
      sliderBoxStyle={{
        height: "450px",
        width: "100%",
        background: "transparent",
      }}
      accEle={{ dots: false }}
      slideCpnts={scientists}
      itemsStyle={itemsStyle}
      buttonSetting={{ placeOn: "middle-outside" }}
      rBtnCpnt={rBtnCpnt}
      lBtnCpnt={lBtnCpnt}
    />
  );
  return (
    <>
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "97%",
        }}
      >
        {scientistsCard}
      </div>
    </>
  );
}

export default ProductSlider;
