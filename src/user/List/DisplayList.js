import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Rating from "@material-ui/lab/Rating";
import "./DisplayProduct.css";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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

export default function DisplayList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <div className="product__image">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/71QLvGIAq5L._SL1500_.jpg"
              alt=""
              width={100}
              height={150}
              className="product__image"
            />
          </div>
        </ListItemAvatar>
        <ListItemText
          className={classes.list}
          primary="Brunch this weekend?Brunch this weekend?Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Rating
                name="read-only"
                value={4}
                readOnly
                style={{ marginTop: "10px" }}
              />
              <div className="product__price">
                <div className="productPrice">
                  <span className="price"> ₹ 13,999.00</span>
                </div>
                <strike className="mrp">₹ 15,999.00</strike>
                <div className="product__priceSave">
                  You Save : <span className="price"> ₹ 2,000</span>
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
              {" Samsung "}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <div className="product__image">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/71QLvGIAq5L._SL1500_.jpg"
              alt=""
              width={100}
              height={150}
              className="product__image"
            />
          </div>
        </ListItemAvatar>
        <ListItemText
          className={classes.list}
          primary="Brunch this weekend?Brunch this weekend?Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Rating
                name="read-only"
                value={4}
                readOnly
                style={{ marginTop: "10px" }}
              />
              <div className="product__price">
                <div className="productPrice">
                  <span className="price"> ₹ 13,999.00</span>
                </div>
                <strike className="mrp">₹ 15,999.00</strike>
                <div className="product__priceSave">
                  You Save : <span className="price"> ₹ 2,000</span>
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
              {" Samsung "}
            </React.Fragment>
          }
        />
      </ListItem>

      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <div className="product__image">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/71QLvGIAq5L._SL1500_.jpg"
              alt=""
              width={100}
              height={150}
              className="product__image"
            />
          </div>
        </ListItemAvatar>
        <ListItemText
          className={classes.list}
          primary="Brunch this weekend?Brunch this weekend?Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Rating
                name="read-only"
                value={4}
                readOnly
                style={{ marginTop: "10px" }}
              />
              <div className="product__price">
                <div className="productPrice">
                  <span className="price"> ₹ 13,999.00</span>
                </div>
                <strike className="mrp">₹ 15,999.00</strike>
                <div className="product__priceSave">
                  You Save : <span className="price"> ₹ 2,000</span>
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
              {" Samsung "}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
