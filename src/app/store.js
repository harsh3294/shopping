import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
  },
});
