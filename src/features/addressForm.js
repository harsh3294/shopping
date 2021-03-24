import { createSlice } from "@reduxjs/toolkit";
export const addressForm = createSlice({
  name: "addressForm",
  initialState: {
    // value: 0,
    addressFormDetail: {},
    orderId: "",
  },
  reducers: {
    ADD_FORM_DETAIL: (state, action) => {
      state.addressFormDetail = action.payload;
    },
    ORDER_ID: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const { ADD_FORM_DETAIL, ORDER_ID } = addressForm.actions;

export const getAddressForm = (state) => state.addressForm.addressFormDetail;
export const getOrderId = (state) => state.addressForm.orderId;

export default addressForm.reducer;
