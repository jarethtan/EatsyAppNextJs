import { getSession } from "next-auth/react";

export const loadCartFromLocal = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return [];
    }
    const loadedCart = JSON.parse(serializedState);
    return loadedCart;
  } catch (e) {
    return undefined;
  }
};

export const saveCartToLocal = (state: any) => {
  // any cart update from user will be updated in localstorage.IF the user is not logged in, once he checks out, he will be prompt to registered or log in to push the cart into the user account in mongodb.
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
    return console.log("Redux state is updated in localstorage");
  } catch (e) {
    console.log("Redux is unable to persist state for localStorage", e);
  }
};

export const loadCartFromDB = async (id: any, abortController: any) => {
  try {
    const getCartResponse = await fetch(`/api/cartStorage/${id}`, {
      // absolute URL was used in this fetch request is because this function is used in the frontend client side. Such as getstaticprops or getserverprops.
      signal: abortController.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const getCartStatus = await getCartResponse.json();
    return getCartStatus;
  } catch (e: any) {
    console.log("Fail to receive Cart information from MongoDB", e.message);
  }
};

export const saveCartToDB = async (state: any) => {
  // IF the user is logged in, once he click checkout, cart info from local storage will transfer to cart info in user database. IF the user is not logged in,  once he checks out, he will be prompt to registered or log in to push the cart into the user account in mongodb.
  const session = await getSession();
  if (session) {
    try {
      const cartStorageResponse = await fetch(`/api/cartStorage/${session.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.cart),
      });
      const cartStorageStatus = await cartStorageResponse.json();
      return console.log(cartStorageStatus.message);
    } catch (e) {
      console.log("Fail to transfer Cart information to MongoDB", e);
    }
  }
};

export const editCartNameDB = async (id: any, totalPrice: string) => {
  try {
    const editCartNameResponse = await fetch(`/api/cartStorage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(totalPrice),
    });
    const editCartNameStatus = await editCartNameResponse.json();
    return console.log(editCartNameStatus.message);
  } catch (e) {
    console.log("Fail to transfer Cart information to MongoDB", e);
  }
};
