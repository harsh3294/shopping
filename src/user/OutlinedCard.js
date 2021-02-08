import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    minHeight: 300,
    border: "0.3px solid rgba(0,0,0,0.4)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontFamily: "Quicksand, sans-serif",
    fontSize: 14,
    fontWeight: 800,
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

export default function OutlinedCard({ id, name, rating, price, img }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <img
          src={img}
          // height="250px"
          // width="220px"
          className="card__img"
        />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {truncate(name, 50)}
        </Typography>
        <div className="detail">
          <Typography variant="h5" component="h2">
            <Rating name="read-only" value={rating} readOnly />
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {price}
          </Typography>
        </div>

        {/* <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
