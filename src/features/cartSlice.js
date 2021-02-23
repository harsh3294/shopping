import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // value: 0,
    basket: [],
  },
  reducers: {
    EMPTY_BASKET: (state) => {
      state.basket = [];
    },

    ADD_TO_BASKET: (state, action) => {
      //   action.payload.id === item.id
      let existed_item = state.basket.find(
        (item) => action.payload.id === item.id
      );
      if (existed_item) {
        console.log("exists");
      } else {
        state.basket = [...state.basket, action.payload];
      }
    },
    REMOVE_FROM_CART: (state, action) => {
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action._id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id:${action.id} ) as its not in basket`
        );
      }
      state.basket = [...state.basket, newBasket];
    },
  },
});

export const {
  EMPTY_BASKET,
  ADD_TO_BASKET,
  REMOVE_FROM_CART,
} = cartSlice.actions;

export const selectBasket = (state) => state.cart.basket;
//to calculate the total amount of the basket
// export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

export default cartSlice.reducer;
