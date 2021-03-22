import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import addressFormReducer from "../features/addressForm";
export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
    addressForm: addressFormReducer,
  },
});
