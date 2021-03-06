import React, { useState } from "react";
import "./Cart.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Rating from "@material-ui/lab/Rating";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Avatar from "@material-ui/core/Avatar";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import numeral from "numeral";
import Typography from "@material-ui/core/Typography";
import EmptyCart from "../../assets/images/empty_cart_image.jpg";
// import CancelIcon from "@material-ui/icons/Cancel";
import {
  EMPTY_BASKET,
  ADD_TO_BASKET,
  SET_SIZE,
  SET_COLOR,
  REMOVE_FROM_CART,
  INCREMENT_BASKET_COUNT,
  DECREMENT_BASKET_COUNT,
  getBasketTotal,
  selectBasket,
} from "../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Link, useHistory } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    minWidth: 120,
    marginLeft: 30,
  },
  inline: {
    display: "inline",
    marginTop: 10,
    paddingTop: 10,
  },
  list: {
    paddingLeft: 40,
  },
}));
function Cart() {
  const classes = useStyles();
  const [size, setSize] = React.useState("");
  const [colors, setColors] = React.useState("");
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  // const total = useSelector(amount);
  const total = useSelector(getBasketTotal);
  console.log("the total is ", total);
  console.log(basket);
  const [cartValue, setCartValue] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (id, event) => {
    console.log(event, id);
    setSize(event.target.value);
    console.log("Size=", size);
    dispatch(
      SET_SIZE({
        id: id,
        size: size,
      })
    );
  };

  const handleColorChange = (id, event) => {
    console.log(event, id);
    setColors(event.target.value);
    console.log("COlors=", colors);
    dispatch(
      SET_COLOR({
        id: id,
        color: colors,
      })
    );
  };
  const decrementCounter = (id) => {
    if (cartValue === 1) {
      //redux
      return cartValue;
    } else {
      dispatch(
        DECREMENT_BASKET_COUNT({
          id: id,
        })
      );
    }
  };
  const handleCheckout = () => {
    if (user) {
      history.push("/checkout");
    } else {
      alert("You are not logged in pls do login.....");
      history.push("/login");
    }
  };

  const incrementCounter = (id) => {
    //redux
    // setCartValue(cartValue + 1);

    dispatch(
      INCREMENT_BASKET_COUNT({
        id: id,
      })
    );
  };
  const deleteItem = (id) => {
    dispatch(
      REMOVE_FROM_CART({
        id: id,
      })
    );
  };

  if (basket.length === 0) {
    return (
      <div
        style={{
          paddingTop: "170px",
          minHeight: "350px",
          textAlign: "center",
          fontSize: "45px",
          paddingLeft: "20px",
          paddingRight: "20px",
          fontWeight: "999",
          backgroundColor: "rgb(246,246,246)",
        }}
      >
        <img
          src={EmptyCart}
          alt=""
          style={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <h1
          className="cart__empty"
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "55px",
            fontWeight: "999",
          }}
        >
          Your Cart is Empty
        </h1>
      </div>
    );
  }
  return (
    <div className="cart">
      <div className="cart__left">
        {basket.map((product) => (
          <List className={classes.root}>
            <ListItem alignItems="flex-start" key={product.id}>
              <ListItemAvatar>
                <div className="product__image">
                  <img
                    src={product.img}
                    alt={product.name}
                    width={100}
                    height={150}
                    className="product__image"
                  />
                </div>
              </ListItemAvatar>
              <ListItemText
                className={classes.list}
                primary={product.name}
                secondary={
                  <React.Fragment>
                    <Rating
                      name="read-only"
                      value={product.rating}
                      readOnly
                      precision={0.1}
                      style={{ marginTop: "10px" }}
                    />
                    <div className="product__price">
                      <div className="productPrice">
                        <span className="price">
                          Our Price: ₹{" "}
                          {numeral(
                            product.originalPrice -
                              product.originalPrice * (product.discount / 100)
                          ).format("0,0.00")}
                        </span>
                      </div>
                      <div>
                        Original Price:{"  "}
                        <strike className="mrp">
                          ₹ {numeral(product.originalPrice).format("0,0")}
                        </strike>
                      </div>
                      <div className="product__priceSave">
                        You Save :{" "}
                        <span className="price">
                          ₹{" "}
                          {numeral(
                            product.originalPrice * (product.discount / 100)
                          ).format("0,0.00")}{" "}
                          ({product.discount}%)
                        </span>
                      </div>
                    </div>
                    <div style={{ marginTop: "10px" }} />
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Brand :
                    </Typography>
                    {product.seller}
                    <br />
                    {product.category === "shirts" && (
                      <>
                        {product.category === "shirts" && (
                          <>
                            <br />
                            <div className="cart__size">
                              <Typography
                                variant="h5"
                                component="h4"
                                className="cart__typographySize"
                              >
                                Size
                              </Typography>
                              <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">
                                  Size
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={product.size}
                                  onChange={(e) => handleChange(product.id, e)}
                                >
                                  {product.dataSize.map((size) => (
                                    <MenuItem value={size.size}>
                                      {size.size}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                            <div className="cart__size">
                              <Typography
                                variant="h5"
                                component="h4"
                                className="cart__typographySize"
                              >
                                Colors
                              </Typography>
                              <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">
                                  Colors
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={product.color}
                                  onChange={(e) =>
                                    handleColorChange(product.id, e)
                                  }
                                >
                                  {product.dataColor.map((color) => (
                                    <MenuItem value={color}>{color}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>

                            {/* Quantity */}
                            {product.dataSize.map((productSize) => (
                              <>
                                {productSize.size === product.size && (
                                  <div className="cart__button">
                                    <Typography
                                      variant="h5"
                                      component="h4"
                                      className="cart__typographySize"
                                    >
                                      Quantity
                                    </Typography>
                                    <div className="cart__addRemoveButton">
                                      <Button
                                        onClick={() =>
                                          decrementCounter(product.id)
                                        }
                                        disabled={
                                          product.cartValue !== 1 ? false : true
                                        }
                                      >
                                        -
                                      </Button>
                                      <input
                                        type="number"
                                        className="cartValue"
                                        onChange={(e) =>
                                          setCartValue(e.target.value)
                                        }
                                        value={product.cartValue}
                                        readOnly
                                      />
                                      {/* <TextField id="standard-basic" /> */}
                                      <Button
                                        onClick={() =>
                                          incrementCounter(product.id)
                                        }
                                        disabled={
                                          product.cartValue !==
                                          productSize.totalStock
                                            ? false
                                            : true
                                        }
                                      >
                                        +
                                      </Button>
                                    </div>
                                    <DeleteForeverIcon
                                      className="cancelIcon"
                                      onClick={() => deleteItem(product.id)}
                                    />
                                  </div>
                                )}
                              </>
                            ))}
                            {/* Quantity */}
                          </>
                        )}
                      </>
                    )}

                    {product.category !== "shirts" && (
                      <>
                        <div className="cart__button">
                          <Typography
                            variant="h5"
                            component="h4"
                            className="cart__typographySize"
                          >
                            Quantity
                          </Typography>
                          <div className="cart__addRemoveButton">
                            <Button
                              onClick={() => decrementCounter(product.id)}
                              disabled={product.cartValue !== 1 ? false : true}
                            >
                              -
                            </Button>
                            <input
                              type="number"
                              className="cartValue"
                              onChange={(e) => setCartValue(e.target.value)}
                              value={product.cartValue}
                              readOnly
                            />
                            {/* <TextField id="standard-basic" /> */}
                            <Button
                              onClick={() => incrementCounter(product.id)}
                              disabled={
                                product.cartValue !== product.totalStock
                                  ? false
                                  : true
                              }
                            >
                              +
                            </Button>
                          </div>
                          <DeleteForeverIcon
                            className="cancelIcon"
                            onClick={() => deleteItem(product.id)}
                          />
                        </div>
                      </>
                    )}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))}
      </div>
      <Button onClick={() => handleCheckout()} className="cart__checkoutButton">
        <ShoppingCartIcon className="cart__checkoutCartIcon" />
        Go For Checkout
      </Button>
    </div>
  );
}

export default Cart;
