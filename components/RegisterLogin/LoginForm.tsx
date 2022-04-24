import classes from "./LoginForm.module.css";
import Head from "next/head";
import Input2 from "./RegisterLoginInputs/Input2";
import LoadingSpinner from "../../ui/LoadingSpinner";
import Swal from "sweetalert2";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form"; // use formprovider to split the different type of input field into two different components.
import { LoginInputModel } from "../../models/formInputTypes";
import { loginSchema } from "../../yupSchema/userForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { signedIn, googleGitSignedIn } from "../../lib/middlewares/signedIn";
import { alertService } from "../../lib/services/alert";
import { useDispatch } from "react-redux";
import { saveCartToDB, loadCartFromLocal } from "../../cartStorageOption";
import { clearCartState } from "../../redux/cart";

const LoginForm: React.FC<{ providers: object }> = (props) => {
  const router = useRouter();
  const loginStatus = router.asPath;
  const [isLoading, setIsLoading] = useState(false);
  const loginPersonnel = loginStatus.includes("userLogin") ? "user" : "admin"; // dynamically change the login for user or admin.
  const dispatch = useDispatch();

  const methods = useForm<LoginInputModel>({
    defaultValues: {
      userName: "",
      password: "",
      role: loginPersonnel,
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmitCredSignIn: SubmitHandler<LoginInputModel> = async (data: LoginInputModel) => {
    setIsLoading(true);
    const loginResponse: any = await signedIn(data); // signedIn middleware from middleware folder to sign into credentialprovider.
    if (loginResponse.error) {
      setIsLoading(false);
      alertService.error(loginResponse.error, { autoClose: false, keepAfterRouteChange: false });
      return;
    } else {
      if (localStorage.cart === undefined || JSON.parse(localStorage.cart).cart.length === 0) {
        // localstorage.cart will be undefined once we go into checkout. it will clear the cart key in localstorage. so we can use localstorage.cart = undefined. if we never checkout and just log out, localstorage will still have the cart key. in this case when we log in, we need to chat that the length of the array in the cart key is 0. if it is zero we will still just login normal. if the length is more than  0, we will redirect and prompt user if he want to check out with the item or continue shopping
        router.push("/");
        alertService.success(`Welcome back ${data.userName}!`, { keepAfterRouteChange: true });
      } else {
        Swal.fire({
          // prompt user to checkout or continuing browsing IF there are items in the local storage.
          title: `Welcome Back ${data.userName}. Do you want to return to cart to checkout your item(s)?`,
          showDenyButton: true,
          denyButtonColor: "#002eff",
          denyButtonText: "Continue Browsing",
          showCancelButton: false,
          confirmButtonText: "Go to Cart",
          confirmButtonColor: "#05761a",
        }).then(async (result: any) => {
          if (result.isConfirmed) {
            const localCart = loadCartFromLocal();
            await saveCartToDB(localCart); // transfer localstorage info to user mongo database. Await so this action execute first before retrieving user data in the next line.
            dispatch(clearCartState(localCart)); // clear redux state.
            localStorage.removeItem("cart"); // clear localstorage state.
            setIsLoading(false);
            await router.push(`/cartPage`);
          } else if (result.isDenied) {
            setIsLoading(true);
            await router.push("/products");
            alertService.success(`Welcome back ${data.userName}!`, { keepAfterRouteChange: true });
            setIsLoading(false);
          } else {
          }
        });
      }
    }
  };

  const onSubmitGoogleGitSignIn = async (id: string) => {
    setIsLoading(true);
    await googleGitSignedIn(id);
    setIsLoading(false);
  };

  return (
    <div className={classes.container}>
      <Head>
        <title>{loginPersonnel} Login Page</title>
        <meta name="description" content="User/Admin Login Page for Eatsy Food App" />
      </Head>
      {isLoading ? <h1 className="pageHeader">Logging In...</h1> : <h1 className="pageHeader">{loginStatus.includes("userLogin") ? "USER" : "ADMIN"} LOGIN</h1>}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitCredSignIn)}>
              <Input2 />
              <br />
              <br />
              <button type="submit" className={classes.loginButton}>
                LOGIN
              </button>
              <br />
            </form>
            <div>
              {loginStatus.includes("userLogin")
                ? Object.values(props.providers).map((provider) => {
                    if (provider.name === "credentials") return; // exclude credential login as a login button. it is already shown as an input field above.
                    return (
                      <span key={provider.name}>
                        <button className={classes.googleButton} onClick={() => onSubmitGoogleGitSignIn(provider.id)}>
                          Sign in with {provider.name}
                        </button>
                      </span>
                    );
                  })
                : ""}
            </div>
            <p>
              Not yet registered? Click{" "}
              <Link href="/personnel/userRegister">
                <a className={classes.register}>here</a>
              </Link>{" "}
              to register.
            </p>
            <p>
              {router.asPath === "/personnel/userLogin" ? (
                <Fragment>
                  Are you an Adminstrator? Click{" "}
                  <Link href="/personnel/adminLogin">
                    <a className={classes.register}>here</a>
                  </Link>{" "}
                  to login.
                </Fragment>
              ) : (
                <Fragment>
                  Are you a User? Click{" "}
                  <Link href="/personnel/userLogin">
                    <a className={classes.register}>here</a>
                  </Link>{" "}
                  to login.
                </Fragment>
              )}
            </p>
          </FormProvider>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
