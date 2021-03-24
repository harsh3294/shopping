import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { ADD_FORM_DETAIL, getAddressForm } from "../../features/addressForm";
export default function AddressForm() {
  const [addressForm, setAddressForm] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    contactNumber: "",
    country: "",
  });
  const addressdetail = useSelector(getAddressForm);
  const dispatch = useDispatch();
  useEffect(() => {
    setAddressForm({
      firstName: addressdetail.firstName,
      lastName: addressdetail.lastName,
      address1: addressdetail.address1,
      address2: addressdetail.address2,
      city: addressdetail.city,
      state: addressdetail.state,
      zip: addressdetail.zip,
      country: addressdetail.country,
      contactNumber: addressdetail.contactNumber,
    });
  }, []);
  useEffect(() => {
    dispatch(
      ADD_FORM_DETAIL({
        firstName: addressForm.firstName,
        lastName: addressForm.lastName,
        address1: addressForm.address1,
        address2: addressForm.address2,
        city: addressForm.city,
        state: addressForm.state,
        zip: addressForm.zip,
        country: addressForm.country,
        contactNumber: addressForm.contactNumber,
      })
    );
  }, [addressForm]);
  const handleChange = (event) => {
    setAddressForm({ ...addressForm, [event.target.name]: event.target.value });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            onChange={handleChange}
            value={addressForm.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={handleChange}
            value={addressForm.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={handleChange}
            value={addressForm.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            onChange={handleChange}
            value={addressForm.address2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            type="number"
            fullWidth
            required
            autoComplete="shipping contactNumber"
            onChange={handleChange}
            value={addressForm.contactNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={handleChange}
            value={addressForm.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            required
            onChange={handleChange}
            value={addressForm.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            onChange={handleChange}
            autoComplete="shipping postal-code"
            value={addressForm.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            onChange={handleChange}
            value={addressForm.country}
            autoComplete="shipping country"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
