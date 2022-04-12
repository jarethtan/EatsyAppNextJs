import { signIn } from "next-auth/react";
import { alertService } from "../../lib/services/alert";
import Swal from "sweetalert2";

export const signedIn = async (newUserData: any) => {
  const response = await signIn("credentials", {
    redirect: false,
    username: newUserData.userName,
    password: newUserData.password,
    role: newUserData.role,
    callbackUrl: `${window.location.origin}`,
  });
  return response;
};

export const googleGitSignedIn = async (id: any) => {
  if (localStorage.cart === undefined || JSON.parse(localStorage.cart).cart.length === 0) {
    // localstorage.cart will be undefined once we go into checkout. it will clear the cart key in localstorage. so we can use localstorage.cart = undefined. if we never checkout and just log out, localstorage will still have the cart key. in this case when we log in, we need to chat that the length of the array in the cart key is 0. if it is zero we will still just login normal. if the length is more than  0, we will redirect and prompt user if he want to check out with the item or continue shopping
    await signIn(id);
    alertService.success(`Welcome back to Eatsy Food App!`, { keepAfterRouteChange: true });
  } else {
    const result = await Swal.fire({
      // prompt user to checkout or continuing browsing IF there are items in the local storage.
      title: `There are item(s) in your cart. Do you want to return to cart to checkout your item(s) after logging in?`,
      showDenyButton: true,
      denyButtonColor: "#002eff",
      denyButtonText: "Continue Browsing",
      showCancelButton: false,
      confirmButtonText: "Go to Cart",
      confirmButtonColor: "#05761a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signIn(id, { callbackUrl: "/cartPage" });
        alertService.success(`Welcome back to Eatsy Food App!`, { keepAfterRouteChange: true });
      } else if (result.isDenied) {
        await signIn(id, { callbackUrl: "/products" });
        alertService.success(`Welcome back to Eatsy Food App!`, { keepAfterRouteChange: true });
      }
    });
  }
};
