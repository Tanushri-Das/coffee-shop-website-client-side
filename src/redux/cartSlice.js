import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    modifyQuantity: (state, action) => {
      const { itemId, quantityDelta } = action.payload;
      const itemIndex = state.cart.findIndex((item) => item._id === itemId);

      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity += quantityDelta;
      }
    },
  },
});

export const { addToCart, modifyQuantity } = cartSlice.actions;
export default cartSlice.reducer;
