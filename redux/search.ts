import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    addSearchFields: (state: any, action: any) => {
      state.push(action.payload);
      console.log("search field added to redux state");
    },
    clearSearchState: (state, action) => {
      const index = state.findIndex((search) => search === action.payload);
      state.splice(index, 1);
    },
  },
});

export const searchReducer = searchSlice.reducer;

export const { addSearchFields, clearSearchState } = searchSlice.actions;
