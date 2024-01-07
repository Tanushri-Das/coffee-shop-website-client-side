import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    priceFilter: { min: 0, max: 0 },
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm, setPriceFilter } = searchSlice.actions;
export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
