import React, { useState } from "react";
import "./Description.css";
import Rating from "@material-ui/lab/Rating";
import ShowMoreText from "react-show-more-text";
import { Divider } from "@material-ui/core";
import IconReturn from "./../../assets/images/IconReturn.png";
import IconDelivered from "./../../assets/images/IconDelivered.png";
import IconNoContact from "./../../assets/images/IconNoContactDelivery.png";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import IconWaranty from "./../../assets/images/IconWarranty.png";
import ReactReadMoreReadLess from "react-read-more-read-less";
function Description() {
  const [description, setDescription] = useState([
    `Triple Camera Setup - 48MP (F2.0) Main Camera +8MP (F2.2) Ultra Wide Camera +5MP(F2.2) Depth Camera and 20MP (F2.2) front facing Punch Hole Camera`,
    "6.4-inch(16.21 centimeters) Super Amoled - Infinity U Cut Display , FHD+ Resolution (2340 x 1080) , 404 ppi pixel density and 16M color support",
    "Android 10.0 operating system with Exynos 9611,2.3GHz,1.7GHz Octa-Core processor, 6GB RAM, 128GB internal memory expandable up to 512GB and dual SIM",
    "6000 mAh Battery",
    "1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
  ]);
  return (
    <div className="description">
      <div className="description__left">
        <div className="description__imageContainer">
          <img
            className="description__image"
            src="https://images-na.ssl-images-amazon.com/images/I/71QLvGIAq5L._SL1500_.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="description__right">
        <div className="product__title">
          Samsung Galaxy M21 (Raven Black, 6GB RAM, 128GB Storage)
        </div>
        <div className="product__brand">
          Brand : <span className="brand__name">Samsung</span>
        </div>
        <div className="product__rating">
          <Rating name="read-only" value={4} readOnly />
        </div>
        <Divider />
        <div className="product__price">
          <div className="product__mrp">
            M.R.P. : <strike className="mrp">₹ 15,999.00</strike>
          </div>
          <div className="productPrice">
            Price : <span className="price"> ₹ 13,999.00</span>
          </div>
          <div className="product__priceSave">
            You Save : <span className="price"> ₹ 2,000</span>
          </div>
        </div>
        <div className="product__delivery">Estimating delivery date</div>
        <div className="product__delivery__info">
          <div className="product__info">
            <img src={IconReturn} alt="" />
            <span className="return">7 Days Replacement</span>
          </div>
          <div className="product__info">
            <img src={IconDelivered} alt="" />
            <span className="return">Shoppers Delivered</span>
          </div>
          <div className="product__info">
            <img src={IconWaranty} alt="" />
            <span className="return">Waranty</span>
          </div>
          <div className="product__info">
            <img src={IconNoContact} alt="" />
            <span className="return">No-Contact Delivery</span>
          </div>
        </div>
        <div className="product__inStock">In Stock</div>
        <div className="product__outOfStock">Out Of Stock</div>
        <br />
        <div className="product__description">
          <h2>Specification</h2>
          <Divider light className="divider" />
          <div className="content-css">
            <ShowMoreText
              /* Default options */
              lines={3}
              className="content-css"
              anchorClass="my-anchor-css-class"
              more="Read more ▼"
              less="Read less ▲"
              className="content-css"
              expanded={false}
            >
              {" "}
              {description.map((item) => (
                <div className="desc">
                  <FiberManualRecordIcon className="dot__icon" />
                  {item}
                </div>
              ))}
            </ShowMoreText>
          </div>
          {/* {description.map((item) => (
            <div className="desc">
              <FiberManualRecordIcon className="dot__icon" />

              {item}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Description;
{
  /* <ReactReadMoreReadLess
                charLimit={200}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
                readMoreClassName="read-more-less--more"
                readLessClassName="read-more-less--less"
              ></ReactReadMoreReadLess> */
}
