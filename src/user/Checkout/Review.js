import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { getBasketTotal, selectBasket } from "../../features/cartSlice";
import numeral from "numeral";
import { getAddressForm } from "../../features/addressForm";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();
  const basket = useSelector(selectBasket);
  const total = useSelector(getBasketTotal);
  const addressDetail = useSelector(getAddressForm);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {basket.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">
              ₹{" "}
              {numeral(
                (product.originalPrice -
                  product.originalPrice * (product.discount / 100)) *
                  product.cartValue
              ).format("0,0.00")}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ₹{numeral(total).format("0,0.00")}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom style={{ textTransform: "capitalize" }}>
            {addressDetail.firstName} {addressDetail.lastName}
          </Typography>
          <Typography gutterBottom>
            {addressDetail.address1} , {addressDetail.city} -{" "}
            {addressDetail.zip} ,{addressDetail.state} , {addressDetail.country}
          </Typography>
          <Typography gutterBottom>
            Contact Number : {addressDetail.contactNumber}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
