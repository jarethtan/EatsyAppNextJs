import ProductCartList from "../components/Cart/ProductCartList";
import classes from "../components/Cart/ProductCartList.module.css";
import Head from "next/head";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { clearCartState, addToCart } from "../redux/cart";
import { saveCartToDB, loadCartFromLocal, loadCartFromDB } from "../cartStorageOption";
import { useRouter } from "next/router";
import { alertService } from "../lib/services/alert";
import { Button } from "@mui/material";

const CartPage = () => {
  const cartItems = useSelector((state: any) => state.cart); // initial render of page will use redux state to load (which uses local storage). If local storage is empty or redux states is cleared, useEffect will come into play to load items from user mongo database. most likely the user checksout but decided to go back to cart page to make changes.
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const id = session.data?.id;
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const abortCont = new AbortController();
    try {
      if (localStorage.cart === undefined && session.status === "authenticated" && !!Number(id) === false && session.data.role !== "admin") {
        // id must NOT be a number to confirm to confirm we are logged in with credential. if logged with google or github, the id will be a number. in an event the user checkout and click the back button or return to the cart, the cart will be reload by this useEffect. localstorage will be undefined since we remove the cart key when we checkout.
        const cartFulfilled = async () => {
          setIsLoading(true);
          const userInfo = await loadCartFromDB(id, abortCont);
          if (userInfo === undefined) {
            return console.log("Fetch request was interrupted.");
          }
          if (userInfo.body === undefined) {
            await router.push("/");
            alertService.info("User data not found in database or fetch request was aborted halfway. You have been redirected to the homepage", {
              autoClose: false,
              keepAfterRouteChange: true,
            });
            return;
          } else {
            const cart = userInfo.body.cart;
            if (cart === undefined) {
              await router.push("/");
              alertService.info("Your cart is empty. You have been redirected to the homepage", { autoClose: false, keepAfterRouteChange: true });
              return;
            } else {
              for (let i = 0; i < cart.length; i++) {
                // two loops required to go through the number of products (types) and the quantity of each product.
                for (let s = 0; s < cart[i].quantity; s++) {
                  dispatch(addToCart(cart[i]));
                }
              }
              setIsLoading(false);
            }
          }
        };
        cartFulfilled();
      }
    } catch (e: any) {
      if (e.name === "AbortError") {
        console.log("Fetch request aborted");
      } else {
        console.log(`Fetch request has an error or it was interrupted. Error message: ${e.message}`);
      }
    }
    return () => abortCont.abort();
  }, []);

  const onCheckout = async () => {
    if (session.status === "authenticated" && session.data.role !== "admin" && !!Number(id) === false) {
      // when id is not a number, it shows that it is a login from credential provider. If it is a number, it will be from google or github provider.
      setIsLoading(true);
      const localCart = loadCartFromLocal();
      await saveCartToDB(localCart); // transfer localstorage info to user mongo database. Await so this action execute first before retrieving user data in the next line.
      dispatch(clearCartState(localCart)); // clear redux state.
      localStorage.removeItem("cart"); // clear localstorage state.
      await router.push(`/checkout`);
      setIsLoading(false);
    } else if (session.status === "authenticated" && !!Number(id) === true) {
      // is id is a number, this mean the login is from google or github. auto generated id in mongodb has alphabets in there as well.
      await router.push(`/checkout`);
    } else if (session.status === "unauthenticated") {
      alertService.info("You have to be logged in before checking out.", { autoClose: false, keepAfterRouteChange: true });
      await router.push(`/personnel/userLogin`);
    } else {
      alertService.info("Administrators are not allowed to checkout.", { autoClose: false, keepAfterRouteChange: true });
      router.push(`/`);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Order Cart</title>
        <meta name="description" content="Order Cart Page for Eatsy Food App" />
      </Head>
      {isLoading ? (
        <div className={classes.container}>
          <h1 className="pageHeader">Please wait...</h1>
          <LoadingSpinner />
        </div>
      ) : (
        <div suppressHydrationWarning className={classes.container}>
          <h1 className="pageHeader">Order Cart</h1>
          {cartItems.length === 0 ? (
            <h1>Cart is Empty</h1>
          ) : (
            <Fragment>
              <ProductCartList cart={cartItems} /> <br />
              <Button className={classes.checkoutButton} onClick={onCheckout}>
                CHECKOUT
              </Button>
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default CartPage;
