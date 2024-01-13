import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import cartReducer from "./cartSlice";
import menuReducer from './menuSlice'

const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    menu: menuReducer,
  },
});

export default store;
