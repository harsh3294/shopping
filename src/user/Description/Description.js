import React, { useState, useEffect } from "react";
import "./Description.css";
import Rating from "@material-ui/lab/Rating";
import ShowMoreText from "react-show-more-text";
import { Button, Divider } from "@material-ui/core";
import IconReturn from "./../../assets/images/IconReturn.png";
import IconDelivered from "./../../assets/images/IconDelivered.png";
import IconNoContact from "./../../assets/images/IconNoContactDelivery.png";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import IconWaranty from "./../../assets/images/IconWarranty.png";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import numeral from "numeral";
import Loading from "../../assets/images/Loading.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  EMPTY_BASKET,
  ADD_TO_BASKET,
  REMOVE_FROM_CART,
  selectBasket,
} from "../../features/cartSlice";

function Description() {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [cartValue, setCartValue] = useState(1);
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);
  const addToCart = () => {
    dispatch(
      ADD_TO_BASKET({
        id: product._id,
        name: product.name,
        img: product.img,
        originalPrice: product.originalPrice,
        rating: product.rating,
        seller: product.seller,
        discount: product.discount,
        totalStock: product.totalStock,
        cartValue: cartValue,
      })
    );
  };

  const decrementCounter = () => {
    if (cartValue === 1) {
      //redux
      return cartValue;
    } else {
      setCartValue(cartValue - 1);
    }
  };

  const incrementCounter = () => {
    //redux
    setCartValue(cartValue + 1);
  };
  useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const req = await axios
        .get(`/products/${product_id}`)
        .then((res) => {
          if (!unmounted) {
            setProduct(res.data);
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
  // const [description, setDescription] = useState([
  //   `Triple Camera Setup - 48MP (F2.0) Main Camera +8MP (F2.2) Ultra Wide Camera +5MP(F2.2) Depth Camera and 20MP (F2.2) front facing Punch Hole Camera`,
  //   "6.4-inch(16.21 centimeters) Super Amoled - Infinity U Cut Display , FHD+ Resolution (2340 x 1080) , 404 ppi pixel density and 16M color support",
  //   "Android 10.0 operating system with Exynos 9611,2.3GHz,1.7GHz Octa-Core processor, 6GB RAM, 128GB internal memory expandable up to 512GB and dual SIM",
  //   "6000 mAh Battery",
  //   "1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
  // ]);

  return (
    <div className="description" key={product._id}>
      <div className="description__left">
        <div className="description__imageContainer">
          <img className="description__image" src={product.img} alt="" />
        </div>
      </div>
      <div className="description__right">
        <div className="product__title">{product.name}</div>
        <div className="product__brand">
          Brand : <span className="brand__name">{product.seller}</span>
        </div>
        <div className="product__rating">
          <Rating
            name="read-only"
            value={product.rating}
            readOnly
            precision={0.1}
          />
        </div>
        <Divider />
        <div className="product__price">
          <div className="product__mrp">
            M.R.P. :{" "}
            <strike className="mrp">
              ₹ {numeral(product.originalPrice).format("0,0")}
            </strike>
          </div>
          <br />
          <div className="productPrice">
            Price :{" "}
            <span className="price">
              ₹{" "}
              {numeral(
                product.originalPrice -
                  product.originalPrice * (product.discount / 100)
              ).format("0,0.00")}
            </span>
          </div>
          <br />
          <div className="product__priceSave">
            You Save :{" "}
            <span className="price">
              {" "}
              ₹{" "}
              {numeral(product.originalPrice * (product.discount / 100)).format(
                "0,0.00"
              )}
            </span>
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
        {product.stock ? (
          <>
            <div className="product__inStock">In Stock</div>
            <br />
            <>
              <div className="cart__button">
                <h3>Quantity</h3>
                <div className="cart__addRemoveButton">
                  <Button
                    onClick={decrementCounter}
                    disabled={cartValue !== 1 ? false : true}
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    className="cartValue"
                    value={cartValue}
                    readOnly
                  />
                  {/* <TextField id="standard-basic" /> */}
                  <Button
                    onClick={incrementCounter}
                    disabled={cartValue !== product.totalStock ? false : true}
                  >
                    +
                  </Button>
                </div>
              </div>
            </>
            <br />
            <Button className="addToCart" onClick={addToCart}>
              Add to Cart
            </Button>
          </>
        ) : (
          <div className="product__outOfStock">Out Of Stock</div>
        )}

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
              {product.description.map((item) => (
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
