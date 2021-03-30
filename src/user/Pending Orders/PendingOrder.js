import React from "react";
import "./PendingOrder.css";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import numeral from "numeral";
import Status from "./Status";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
    marginTop: 10,
    paddingTop: 10,
  },
  list: {
    paddingLeft: 40,
    cursor: "pointer",
  },
}));
function PendingOrder({ order }) {
  const classes = useStyles();

  return (
    <div className="order">
      <h2>Order</h2>
      <p>{order?.date}</p>
      <p className="order__id">
        Order Id : <small> {order?.orderId} </small>
      </p>
      <br />
      <p>Delivered :</p>
      <div>
        <h5>
          Name : {order?.placedBy[0]?.firstName} {order?.placedBy[0]?.lastName}
        </h5>
        <p>
          Address : {order?.placedBy[0]?.address1} , {order?.placedBy[0]?.city}{" "}
          , {order?.placedBy[0]?.zip} {order?.placedBy[0]?.state} -
          {order?.placedBy[0]?.country}
        </p>
      </div>

      <List className={classes.root}>
        {order.orderList.map((product) => (
          <React.Fragment>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <div className="product__image">
                  <img
                    src={product?.img}
                    alt=""
                    width={130}
                    height={150}
                    className="product__image"
                  />
                </div>
              </ListItemAvatar>

              <ListItemText
                className={classes.list}
                // onClick={(event) => {
                //   history.replace(`/product-detail/${category}/${product._id}`);
                // }}
                primary={product?.name}
                secondary={
                  <React.Fragment>
                    <Rating
                      name="read-only"
                      value={product?.rating}
                      readOnly
                      precision={0.1}
                      style={{ marginTop: "10px" }}
                    />
                    <div className="display__product__price">
                      <div className="productPrice">
                        <span className="price">
                          Product Price: ₹{" "}
                          {numeral(
                            product?.originalPrice -
                              product?.originalPrice * (product?.discount / 100)
                          ).format("0,0.00")}
                        </span>
                      </div>
                      <div className="product__priceSave">
                        Discount : <span className="price"> 5%</span>
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
                    </Typography>{" "}
                    {product?.seller}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Status status={order?.status} />
      <Divider variant="inset" component="li" />
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order?.orderTotal}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default PendingOrder;
