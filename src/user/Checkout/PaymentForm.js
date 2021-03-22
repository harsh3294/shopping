import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const promise = loadStripe(
  "pk_test_51IXgpiSBGmQwpVF9BUa0SvOQhqx8VulzBimlJ3tyUDF6LtjAITyNe8HKOR4v6FLVOiBtuvDb52hdKAWWXiLgZPhS00oOVvxCSa"
);

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Elements stripe={promise}>
          <Payment />
        </Elements>
      </Grid>
    </React.Fragment>
  );
}
