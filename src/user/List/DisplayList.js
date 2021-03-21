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
import numeral from "numeral";
import { useHistory, useParams } from "react-router";

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

export default function DisplayList(data, productcategory) {
  const classes = useStyles();
  const history = useHistory();
  const { category } = useParams();

  const viewProduct = (id) => {
    console.log(id);
    let productid = id;
    history.push("/product-detail/" + category + "/" + productid);
  };
  return (
    <List className={classes.root}>
      {data.data.map((product) => (
        <React.Fragment>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <div className="product__image">
                <img
                  src={product.img}
                  alt=""
                  width={130}
                  height={150}
                  className="product__image"
                />
              </div>
            </ListItemAvatar>

            <ListItemText
              className={classes.list}
              onClick={() => viewProduct(product._id)}
              // onClick={(event) => {
              //   history.replace(`/product-detail/${category}/${product._id}`);
              // }}
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
                  <div className="display__product__price">
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
                      Original Price:{" "}
                      <strike className="mrp">
                        ₹ {numeral(product.originalPrice).format("0,0")}
                      </strike>
                    </div>
                    <div className="product__priceSave">
                      You Save :{" "}
                      <span className="price">
                        {" "}
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
                  </Typography>{" "}
                  {product.seller}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
