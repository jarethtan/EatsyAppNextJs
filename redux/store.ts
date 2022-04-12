import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart";
import { searchReducer } from "./search";
import { loadCartFromLocal, saveCartToLocal } from "../cartStorageOption";
import { throttle } from "lodash";

const persistedState = loadCartFromLocal();

const store = configureStore({
  reducer: { cart: cartReducer, search: searchReducer },
  preloadedState: persistedState,
});

store.subscribe(
  // subcribe to store. if there is any changes in the store, it will triggle saveCartState function to store latest cart state into localstorage..
  throttle(() => {
    saveCartToLocal({
      cart: store.getState().cart,
    });
  }, 1000)
);

export default store;
