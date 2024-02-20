// import { createSlice } from "@reduxjs/toolkit";

// const searchSlice = createSlice({
//   name: "search",
//   initialState: {
//     searchTerm: "",
//     priceFilter: { min: 0, max: 0 },
//   },
//   reducers: {
//     setSearchTerm: (state, action) => {
//       state.searchTerm = action.payload;
//     },
//   },
// });

// export const { setSearchTerm, setPriceFilter } = searchSlice.actions;
// export const selectSearch = (state) => state.search;

// export default searchSlice.reducer;











import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    priceFilter: { min: 0, max: 0 },
    category: "All", // Default to "All" category
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setSearchTerm, setPriceFilter, setCategory } =
  searchSlice.actions;
export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
