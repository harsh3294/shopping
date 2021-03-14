import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import numeral from "numeral";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    borderRadius: 15,
    minWidth: 250,
    minHeight: 370,
    outline: "none",
    border: "1px solid rgba(0,0,0,9)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontFamily: "Quicksand, sans-serif",
    fontSize: 14,
    fontWeight: 750,
    marginTop: 10,
    color: "black",
    textAlign: "center",
  },
  pos: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: 600,
    color: "black",
    fontFamily: "Times New Roman",
    background: "transparent",
  },
});
function truncate(string, n) {
  return string?.length > n ? string.substr(0, n - 1) + "..." : string;
}

export default function OutlinedCard({
  id,
  name,
  rating,
  price,
  img,
  discount,
  route,
}) {
  const classes = useStyles();
  const history = useHistory();
  console.log(route);
  const product = () => {
    history.push(`/product-detail/${route}/${id}`);
  };
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <img
          src={img}
          // height="250px"
          // width="220px"
          className="card__img"
        />

        <div className="product__detail">
          <Typography
            onClick={product}
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {truncate(name, 45)}
          </Typography>
          <div className="detail">
            <Typography variant="h5" component="h2">
              <Rating
                name="read-only"
                value={rating}
                precision={0.1}
                readOnly
              />
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              ₹ {numeral(price - price * (discount / 100)).format("0,0.00")}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
