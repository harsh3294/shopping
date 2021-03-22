import { createSlice } from "@reduxjs/toolkit";
export const addressForm = createSlice({
  name: "addressForm",
  initialState: {
    // value: 0,
    addressFormDetail: {},
  },
  reducers: {
    ADD_FORM_DETAIL: (state, action) => {
      state.addressFormDetail = action.payload;
    },
  },
});

export const { ADD_FORM_DETAIL } = addressForm.actions;

export const getAddressForm = (state) => state.addressForm.addressFormDetail;

export default addressForm.reducer;
