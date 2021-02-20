import React, { useState, useEffect } from "react";
import CarouselSlider from "react-carousel-slider";
import "./ProductSlider.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { DATA } from "../DATA";
import axios from "../../axios";
import numeral from "numeral";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router-dom";
import Loading from "../../assets/images/Loading.gif";
// import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
function ProductSlider() {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const req = await axios
        .get("/products/mobiles")
        .then((res) => {
          if (!unmounted) {
            setMobiles(res.data);
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

  let itemsStyle = {
    padding: "0px",
    background: "white",
    marginLeft: "20px",
    marginRight: "20px",
    boxShadow: "1px 1px #9E9E9E",
    borderRadius: "15px",
    border: "1px solid black",
  };

  let imgStyle = {
    height: "60%",
    padding: "10px",
    width: "150px",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
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
    fontSize: "13px",
    fontWeight: "700",
  };
  let rating = {
    marginLeft: "40px",
    top: "80px",
  };

  // let scientists = DATA.map((item) => (
  //   <div key={item.id}>
  //     <img style={imgStyle} src={item.img}></img>
  //     <p style={textBoxStyle}>{truncate(item.name, 50)}</p>
  //     <Rating style={rating} name="read-only" value={item.rating} readOnly />
  //     <p style={textBoxStyle2}>{item.price}</p>
  //   </div>
  //   // <MediaCard image={item.imgSrc} p1={item.name} p2={item.des} />
  // ));
  const history = useHistory();

  let scientists = mobiles.map((item) => (
    <div key={item._id}>
      <img style={imgStyle} src={item.img}></img>
      <p
        style={textBoxStyle}
        onClick={() => {
          history.push(`/product-detail/${item._id}`);
        }}
      >
        {truncate(item.name, 50)}
      </p>
      <Rating style={rating} name="read-only" value={item.rating} readOnly />
      <p style={textBoxStyle2}>
        {" "}
        ₹{" "}
        {numeral(
          item.originalPrice - item.originalPrice * (item.discount / 100)
        ).format("0,0.00")}
      </p>
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
  if (loading) {
    return <img src={Loading} alt="loading" className="loading" />;
  }
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
