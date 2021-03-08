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
import Avatar from "@material-ui/core/Avatar";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import numeral from "numeral";
import Typography from "@material-ui/core/Typography";
// import CancelIcon from "@material-ui/icons/Cancel";
import {
  EMPTY_BASKET,
  ADD_TO_BASKET,
  REMOVE_FROM_CART,
  INCREMENT_BASKET_COUNT,
  DECREMENT_BASKET_COUNT,
  selectBasket,
} from "../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
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
  const basket = useSelector(selectBasket);
  console.log(basket);
  const [cartValue, setCartValue] = useState();
  const dispatch = useDispatch();

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
                          ₹{" "}
                          {numeral(
                            product.originalPrice -
                              product.originalPrice * (product.discount / 100)
                          ).format("0,0.00")}
                        </span>
                      </div>
                      <strike className="mrp">
                        {" "}
                        ₹ {numeral(product.originalPrice).format("0,0")}
                      </strike>
                      <div className="product__priceSave">
                        You Save :{" "}
                        <span className="price">
                          ₹{" "}
                          {numeral(
                            product.originalPrice * (product.discount / 100)
                          ).format("0,0.00")}
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
                    <div className="cart__button">
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
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))}
      </div>
      <div className="cart__right"></div>
    </div>
  );
}

export default Cart;
