import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: [],
  reducers: {
    updateMenuItem: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { updateMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
