import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};


const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const fetchCartCount = createAsyncThunk(
  "cart/fetchCartCount",
  async (_, { dispatch }) => {
    try {
      const response = await fetch("https://build-with-innovation-server-side.vercel.app/orders");
      const data = await response.json();
      dispatch(updateCartCount(data.length));
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromLocalStorage(),
    cartCount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const updatedCartItems = [
        ...state.cartItems,
        { ...action.payload, quantity: 1 },
      ];
      saveCartToLocalStorage(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        cartCount: updatedCartItems.length,
      };
    },
    updateCartCount: (state, action) => {
      return {
        ...state,
        cartCount: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartCount.fulfilled, (state, action) => {
    });
  },
});

export const { addToCart, updateCartCount } = cartSlice.actions;
export default cartSlice.reducer;
