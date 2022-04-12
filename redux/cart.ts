import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductModel from "../models/productModelClass";
import { alertService } from "../lib/services/alert";
import { getSession } from "next-auth/react";

export const getCartInfo: any = createAsyncThunk("GET_CART", async () => {
  const session = await getSession();
  if (session) {
    const getCartResponse = await fetch(`http://localhost:3000/api/cartStorage/${session.id}`);
    const cartInfo = await getCartResponse.json();
    if (getCartResponse.status < 200 || getCartResponse.status >= 300) {
      return console.log("Fetching cart info failed.");
    }
    return cartInfo.body;
  } else return undefined;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state: any, action: any) => {
      const existingProduct: any = state.find((product: ProductModel) => product._id === action.payload._id); // payload is an object array
      if (existingProduct) {
        if (action.payload.productNote) {
          existingProduct.productNote = action.payload.productNote;
        }
        existingProduct.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
        alertService.success(`${action.payload.productName} is successfully added into cart`, { keepAfterRouteChange: true });
      }
    },
    incrementQuantity: (state, action) => {
      const foundProduct: any = state.find((product: ProductModel) => product._id === action.payload._id);
      foundProduct.quantity++;
    },
    decrementQuantity: (state, action) => {
      const foundProduct: any = state.find((product: ProductModel) => product._id === action.payload._id);
      if (foundProduct.quantity == 1) {
        const index = state.findIndex((product: ProductModel) => product._id === action.payload._id);
        state.splice(index, 1);
        alertService.warn(`${action.payload.productName} is removed from cart`, { keepAfterRouteChange: true });
      } else {
        foundProduct.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((product: ProductModel) => product._id === action.payload._id);
      state.splice(index, 1);
    },
    clearCartState: (state, action) => {
      for (let i = 0; i < action.payload.cart.length; i++) {
        const index = state.findIndex((product: ProductModel) => product._id === action.payload.cart[i]._id);
        state.splice(index, 1);
      }
    },
  },
  extraReducers: {
    [getCartInfo.pending]: (state) => {
      console.log("Loading cart info");
    },
    [getCartInfo.fulfilled]: (state, { payload }) => {
      state = payload;
    },
    [getCartInfo.rejected]: (state) => {
      console.log("Request reject. Fail to load cart info");
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCartState } = cartSlice.actions;
