import React, { useState } from "react";
import CarouselSlider from "react-carousel-slider";
import "./ProductSlider.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

function ProductSlider() {
  let scientist = [
    {
      imgSrc:
        "https://c7.alamy.com/comp/KD4D0M/portrait-of-the-scientist-philosopher-niklas-koppernigk-KD4D0M.jpg",
      name: "Niklas Koppernigk",
      des: "19 February 1473 – 24 May 1543",
    },
    {
      imgSrc:
        "https://cdn.britannica.com/s:250x250,c:crop/29/18829-050-3F57E4F8/Galileo-Justus-Sustermans-Uffizi-Gallery-Florence-1637.jpg",
      name: "Galileo Galilei",
      des: "15 February 1564 – 8 January 1642",
    },
    {
      imgSrc:
        "https://i.guim.co.uk/img/media/abffc68f38357082e669f2227a6310740d982f25/0_214_2710_1626/master/2710.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=7340d7f149a7f15e95df155dfda0cc3a",
      name: "Michael Faraday",
      des: "22 September 1791 – 25 August 1867",
    },

    {
      imgSrc:
        "https://c7.alamy.com/comp/KD4D0M/portrait-of-the-scientist-philosopher-niklas-koppernigk-KD4D0M.jpg",
      name: "Niklas Koppernigk 1",
      des: "19 February 1473 – 24 May 1543",
    },
    {
      imgSrc:
        "https://cdn.britannica.com/s:250x250,c:crop/29/18829-050-3F57E4F8/Galileo-Justus-Sustermans-Uffizi-Gallery-Florence-1637.jpg",
      name: "Galileo Galilei 1",
      des: "15 February 1564 – 8 January 1642",
    },
    {
      imgSrc:
        "https://i.guim.co.uk/img/media/abffc68f38357082e669f2227a6310740d982f25/0_214_2710_1626/master/2710.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=7340d7f149a7f15e95df155dfda0cc3a",
      name: "Michael Faraday 1",
      des: "22 September 1791 – 25 August 1867",
    },
  ];
  let itemsStyle = {
    padding: "0px",
    background: "white",
    marginLeft: "4px",
    marginRight: "10px",
    boxShadow: "1px 1px 1px 1px #9E9E9E",
    borderRadius: "4px",
  };

  let imgStyle = {
    height: "70%",
    width: "180px",
    borderBottom: "1px solid #9E9E9E",
  };

  let textBoxStyle = {
    width: "50%",
    top: "290px",
    color: "black",
    background: "transparent",
    fontSize: "14px",
    fontFamily: "Times New Roman",
  };

  let textBoxStyle2 = {
    width: "70%",
    top: "330px",
    color: "black",
    background: "transparent",
    fontSize: "12px",
    fontStyle: "italic",
  };

  let scientists = scientist.map((item, index) => (
    <div key={index}>
      <img style={imgStyle} src={item.imgSrc}></img>
      <p style={textBoxStyle}>{item.name}</p>
      <p style={textBoxStyle2}>{item.des}</p>
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
