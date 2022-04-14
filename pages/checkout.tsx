import classes from "../components/Checkout/ProductCheckoutList.module.css";
import ProductCheckoutList from "../components/Checkout/ProductCheckoutList";
import LoadingSpinner from "../ui/LoadingSpinner";
import ProductModel from "../models/productModelClass";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import getOneCart from "../lib/helpers/cartHelpers/getOneCart";
import Head from "next/head";
import { useEffect, useState, Fragment } from "react";
import { Grid } from "@mui/material";
import { getSession } from "next-auth/react";
import { loadCartFromLocal } from "../cartStorageOption";
import { alertService } from "../lib/services/alert";
import { GetServerSideProps } from "next";
import { RegisterInputModel } from "../models/formInputTypes";

const CheckoutItems: React.FC<{ user: RegisterInputModel }> = (props) => {
  const [userCart, setUserCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const otherLoginRoute = props.user === undefined;
  const cart: any = otherLoginRoute ? userCart : props.user.cart;

  useEffect(() => {
    if (localStorage.cart !== undefined) {
      // to check if user signed in with github or google. If sign in with credentials, items will not be stored in local storage as the cart will be transferred to mongodb upon checking out from cart page. this logic here is to extract the cart from local storage before the cart is not stored in mongodb. If it is stored in mongodb, we will use getserverprops to extract the cart as shown in the page below.
      setIsLoading(true);
      try {
        setUserCart([]);
        const localCart = loadCartFromLocal();
        setUserCart(localCart.cart);
        setIsLoading(false);
      } catch (e: any) {
        alertService.error(`An error have occured when loading the cart from local storage. Error message: ${e.message}`, {
          autoClose: false,
          keepAfterRouteChange: true,
        });
      }
    }
  }, []);

  const totalCartPrice = cart.reduce((accumulator: number, product: ProductModel) => accumulator + product.quantity * product.productPrice, 0);

  return (
    <Fragment>
      <Head>
        <title>User Checkout Page</title>
        <meta name="description" content="Checkout Page for Eatsy Food App" />
      </Head>
      {isLoading ? (
        <div className={classes.container}>
          <h1 className="pageHeader">Checkout in progress...</h1>
          <LoadingSpinner />
        </div>
      ) : (
        <div suppressHydrationWarning className={classes.container}>
          <h1 className="pageHeader">Checkout Page</h1>
          <Grid container>
            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
              <ProductCheckoutList cart={cart} />
            </Grid>
            <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
              <CheckoutForm totalCartPrice={totalCartPrice} user={props.user} userCart={userCart} />
            </Grid>
          </Grid>
        </div>
      )}
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  if (!!Number(session?.id) === false) {
    const { body: foundUser } = await getOneCart(session?.id); // get cart from db to display during checkout.
    const user = JSON.parse(JSON.stringify(foundUser));

    return {
      props: { user },
    }; // this IF logic is here to ensure when we login using google or github, we will skip getServersideprops render as there is no database to search in mongodb. we will let getserverside run without any props being passed then we will use useEffect from above to render the page again using the localstorage data. since login in through google or github we will be using localstorage all the way to payment unlike with credential login (where we will transfer the localstorage data to mongodb when the user checks out and the information via databse during payment. This is to enable us to track the items being bought for users who use credentials to login (mongodb database.)).
  } else return { props: {} };
};

export default CheckoutItems;
