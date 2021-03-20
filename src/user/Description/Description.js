import React, { useState, useEffect } from "react";
import "./Description.css";
import Rating from "@material-ui/lab/Rating";
import ShowMoreText from "react-show-more-text";
import { Button, Divider, Typography } from "@material-ui/core";
import IconReturn from "./../../assets/images/IconReturn.png";
import IconDelivered from "./../../assets/images/IconDelivered.png";
import IconNoContact from "./../../assets/images/IconNoContactDelivery.png";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import IconWaranty from "./../../assets/images/IconWarranty.png";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../axios";
import numeral from "numeral";
import Loading from "../../assets/images/Loading.gif";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import {
  EMPTY_BASKET,
  ADD_TO_BASKET,
  REMOVE_FROM_CART,
  selectBasket,
} from "../../features/cartSlice";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginLeft: 30,
  },
  selectEmpty: {},
}));
function Description() {
  const classes = useStyles();

  const { route, product_id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [productExist, setProductExist] = useState(false);
  const [cartValue, setCartValue] = useState(1);
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const history = useHistory();
  const [size, setSize] = React.useState("");
  const [colors, setColors] = React.useState("");

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setColors(event.target.value);
  };
  console.log(route, product_id);
  useEffect(() => {
    basket.map((product) => {
      if (product.id === product_id) {
        setProductExist(true);
      }
    });
  }, [basket]);

  const addToCart = () => {
    dispatch(
      ADD_TO_BASKET({
        id: product._id,
        userid: user.uid,
        name: product.name,
        img: product.img,
        originalPrice: product.originalPrice,
        rating: product.rating,
        seller: product.seller,
        discount: product.discount,
        totalStock: product.totalStock,
        cartValue: cartValue,
        category: product.category,
      })
    );
  };

  const addToCartMensWear = () => {
    dispatch(
      ADD_TO_BASKET({
        id: product._id,
        userid: user.uid,
        name: product.name,
        img: product.img,
        originalPrice: product.originalPrice,
        rating: product.rating,
        seller: product.seller,
        discount: product.discount,
        totalStock: product.totalStock,
        cartValue: cartValue,
        size: size,
        color: colors,
        dataSize: product.size,
        dataColor: product.color,
        category: product.category,
      })
    );
  };

  const goToCart = () => {
    history.push("/cart");
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
        .get(`/products/${route}/${product_id}`)
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
        <div className="description__product__price">
          <div className="description__product__mrp">
            M.R.P. :{" "}
            <strike className="description__mrp">
              ₹ {numeral(product.originalPrice).format("0,0")}
            </strike>
          </div>
          <br />
          <div className="description__productPrice">
            Price :{" "}
            <span className="description__price">
              ₹{" "}
              {numeral(
                product.originalPrice -
                  product.originalPrice * (product.discount / 100)
              ).format("0,0.00")}
            </span>
          </div>
          <br />
          <div className="description__product__priceSave">
            You Save :{" "}
            <span className="description__price">
              {" "}
              ₹{" "}
              {numeral(product.originalPrice * (product.discount / 100)).format(
                "0,0.00"
              )}{" "}
              ({product.discount}%)
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
        {product.category === "shirts" && (
          <>
            <br />
            <div className="description__size">
              <Typography
                variant="h5"
                component="h4"
                className="description__typographySize"
              >
                Size
              </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={size}
                  onChange={handleChange}
                >
                  {product.size.map((size) => (
                    <MenuItem value={size.size}>{size.size}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </>
        )}
        {product.category === "shirts" && (
          <>
            <br />
            <div className="description__size">
              <Typography
                variant="h5"
                component="h4"
                className="description__typographySize"
              >
                Colors
              </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Colors</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={colors}
                  onChange={handleColorChange}
                >
                  {product.color.map((color) => (
                    <MenuItem value={color}>{color}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </>
        )}
        {product.category === "shirts" && (
          <>
            <br />
            <div className="description__size">
              <Typography
                variant="h5"
                component="h4"
                className="description__typographySize"
              >
                Quantity
              </Typography>
            </div>
            <br />
            {productExist ? (
              <Button className="addToCart" onClick={goToCart}>
                Go to Cart
              </Button>
            ) : (
              product.size.map((productsize) => (
                <>
                  {productsize.size === size && (
                    <>
                      {" "}
                      <div className="description__cart__button">
                        <div className="description__cart__addRemoveButton">
                          <Button
                            onClick={decrementCounter}
                            disabled={cartValue !== 1 ? false : true}
                          >
                            -
                          </Button>
                          <input
                            type="number"
                            className="description__cartValue"
                            value={cartValue}
                            readOnly
                          />
                          <Button
                            onClick={incrementCounter}
                            disabled={
                              cartValue !== productsize.totalStock
                                ? false
                                : true
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <br />
                      <Button className="addToCart" onClick={addToCartMensWear}>
                        Add to Cart
                      </Button>
                    </>
                  )}
                </>
              ))
            )}
          </>
        )}
        {product.stock ? (
          product.category !== "shirts" && (
            <>
              <div className="product__inStock">In Stock</div>
              <br />
              {productExist ? (
                <Button className="addToCart" onClick={goToCart}>
                  Go to Cart
                </Button>
              ) : (
                <>
                  {product.category !== "shirts" && (
                    <>
                      <div className="description__cart__button">
                        <h3>Quantity</h3>
                        <div className="description__cart__addRemoveButton">
                          <Button
                            onClick={decrementCounter}
                            disabled={cartValue !== 1 ? false : true}
                          >
                            -
                          </Button>
                          <input
                            type="number"
                            className="description__cartValue"
                            value={cartValue}
                            readOnly
                          />
                          <Button
                            onClick={incrementCounter}
                            disabled={
                              cartValue !== product.totalStock ? false : true
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <br />
                      <Button className="addToCart" onClick={addToCart}>
                        Add to Cart
                      </Button>
                    </>
                  )}
                  {/* <div className="description__cart__button">
                  <h3>Quantity</h3>
                  <div className="description__cart__addRemoveButton">
                    <Button
                      onClick={decrementCounter}
                      disabled={cartValue !== 1 ? false : true}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      className="description__cartValue"
                      value={cartValue}
                      readOnly
                    />
                    <Button
                      onClick={incrementCounter}
                      disabled={cartValue !== product.totalStock ? false : true}
                    >
                      +
                    </Button>
                  </div>
                </div> 
                <br />
                <Button className="addToCart" onClick={addToCart}>
                  Add to Cart
                </Button>*/}
                </>
              )}
            </>
          )
        ) : (
          <div className="product__outOfStock">Out Of Stock</div>
        )}

        <div className="product__description">
          <h2>Specification</h2>
          <Divider light className="divider" />
          <div className="content-css">
            <ShowMoreText
              /* Default options */
              lines={2}
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
