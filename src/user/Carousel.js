import React, { useState } from "react";
import CarouselSlider from "react-carousel-slider";
import "./Carousel.css";
function Carousel() {
  const [image, setImage] = useState([
    {
      imgSrc:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Xiaomi/RedmiNote9Series/Mob_Hero_1242x450._CB660800169_SY250_.jpg",
    },
    {
      imgSrc:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/WLA/Jan21/Headset/D20517472_WLA_BAU_OnePlus_Buds_Z_Mobile_hero_1242x450._CB660829695_SY250_.jpg",
    },
    {
      imgSrc:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/JanART21/TailBrands/mobhero_1242x450._CB660604674_SY250_.jpg",
    },
    {
      imgSrc:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/Xiaomi/Redmi_9Power/PostJanArt/D19338206_WLM_Redmi_9Power_Launch_mobhero._CB662599013_SY250_.jpg",
    },
  ]);
  let manner = {
    autoSliding: { interval: "3s" },
    duration: "2s",
  };
  let itemsStyle = {
    height: "300px",
    width: "100vw",
    background: "transparent",
    border: "1px solid #e1e4e8",
    borderRadius: "2px",
  };

  //   let accEleSetting;
  let sliderBoxStyle = {
    height: "320px",
    // marginLeft: "10px",
    // marginRight: "10px",
    width: "98%",
    background: "transparent",
    border: "1px solid #e1e4e8",
  };

  let buttonSetting = {
    placeOn: "middle-inside",
    hoverEvent: true,
    style: {
      left: {
        height: "50px",
        width: "50px",
        color: "#929393",
        background: "rgba(225, 228, 232, 0.8)",
        borderRadius: "50%",
      },
      right: {
        height: "50px",
        width: "50px",
        color: "#929393",
        background: "rgba(225, 228, 232, 0.8)",
        borderRadius: "50%",
      },
    },
  };
  let rcs_sliderBox = {
    height: "150px",
    transform: "translateX(-2500px)",
    transition: " transform 2s ease 0s",
  };
  return (
    <div>
      <CarouselSlider
        className="carouselSlider"
        style={rcs_sliderBox}
        slideItems={image}
        manner={manner}
        sliderBoxStyle={sliderBoxStyle}
        buttonSetting={buttonSetting}
        itemsStyle={itemsStyle}
      />
    </div>
  );
}

export default Carousel;
