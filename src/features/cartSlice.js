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
      console.log(state.basket);
    },
    REMOVE_FROM_CART: (state, action) => {
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id:${action.id} ) as its not in basket`
        );
      }
      state.basket = newBasket;
    },
    INCREMENT_BASKET_COUNT: (state, action) => {
      let tempCart = [...state.basket];
      const selectedProduct = state.basket.find(
        (item) => action.payload.id === item.id
      );

      const index = tempCart.indexOf(selectedProduct);
      const product = tempCart[index];

      product.cartValue = product.cartValue + 1;
      state.basket = [...tempCart];

      // let existed_item = state.basket.find(
      //   (item) => action.payload.id === item.id
      // );
      // if (existed_item) {
      //   state.basket = [...state.basket, action.payload];
      // }
    },
    DECREMENT_BASKET_COUNT: (state, action) => {
      let tempCart = [...state.basket];
      const selectedProduct = state.basket.find(
        (item) => action.payload.id === item.id
      );

      const index = tempCart.indexOf(selectedProduct);
      const product = tempCart[index];

      product.cartValue = product.cartValue - 1;
      state.basket = [...tempCart];
    },
    SET_SIZE: (state, action) => {
      let tempCart = [...state.basket];
      const selectedProduct = state.basket.find(
        (item) => action.payload.id === item.id
      );

      const index = tempCart.indexOf(selectedProduct);
      const product = tempCart[index];

      product.size = action.payload.size;
      state.basket = [...tempCart];
    },
    SET_COLOR: (state, action) => {
      let tempCart = [...state.basket];
      const selectedProduct = state.basket.find(
        (item) => action.payload.id === item.id
      );

      const index = tempCart.indexOf(selectedProduct);
      const product = tempCart[index];

      product.color = action.payload.color;
      state.basket = [...tempCart];
    },
  },
});

export const {
  EMPTY_BASKET,
  ADD_TO_BASKET,
  REMOVE_FROM_CART,
  INCREMENT_BASKET_COUNT,
  DECREMENT_BASKET_COUNT,
  SET_SIZE,
  SET_COLOR,
} = cartSlice.actions;

export const selectBasket = (state) => state.cart.basket;
//to calculate the total amount of the basket
// export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

export default cartSlice.reducer;
