import classes from "./RegisterForm.module.css";
import Head from "next/head";
import Input1 from "./RegisterLoginInputs/Input1";
import Input2 from "./RegisterLoginInputs/Input2";
import Swal from "sweetalert2";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form"; // use formprovider to split the different type of input field into two different components.
import { RegisterInputModel } from "../../models/formInputTypes";
import { inputRegisterSchema } from "../../yupSchema/userForm";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { signedIn } from "../../lib/middlewares/signedIn";
import { useRouter } from "next/router";
import { alertService } from "../../lib/services/alert";
import { useDispatch } from "react-redux";
import { saveCartToDB, loadCartFromLocal } from "../../cartStorageOption";
import { clearCartState } from "../../redux/cart";

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const dispatch = useDispatch();
  const methods = useForm<RegisterInputModel>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      userImage: "",
      userName: "",
      password: "",
      role: "user",
      confirmPassword: "",
      deliveryAddress: "",
      postalCode: "",
      contactNumber: "",
    },
    resolver: yupResolver(inputRegisterSchema),
  });

  const receiveImageUrl = (imageUrl: string) => {
    // retrieve the imageUrl from Input1 component.
    setImageUrl(imageUrl);
  };

  const onSubmitForm: SubmitHandler<RegisterInputModel> = async (data: RegisterInputModel) => {
    setIsLoading(true);
    data.userImage = imageUrl; // convert imagefile to url.
    setImageUrl("");
    const registerResponse = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const registerStatus = await registerResponse.json();
    if (registerStatus.message !== "User created.") {
      setIsLoading(false);
      alertService.error(`${registerStatus.message} ${registerStatus.body}`, { autoClose: false, keepAfterRouteChange: false });
      return;
    } else {
      alertService.success(`Hi ${data.userName}, Thank you for registering and Welcome to Eatsy Food App.`, { keepAfterRouteChange: true });
      const loginResponse: any = await signedIn(data); // auto login step after register by extracting data inserted by user to find username/password credentials in database.
      if (loginResponse.error) {
        alertService.error(loginResponse.error, { autoClose: false, keepAfterRouteChange: false });
        setIsLoading(false);
        return;
      } else {
        if (localStorage.cart === undefined || JSON.parse(localStorage.cart).cart.length === 0) {
          // localstorage.cart will be undefined once we go into checkout. it will clear the cart key in localstorage. so we can use localstorage.cart = undefined. if we never checkout and just log out, localstorage will still have the cart key. in this case when we log in, we need to chat that the length of the array in the cart key is 0. if it is zero we will still just login normal. if the length is more than  0, we will redirect and prompt user if he want to check out with the item or continue shopping
          await router.push("/");
        } else {
          Swal.fire({
            // prompt user to checkout or continuing browsing IF there are items in the cart.
            title: `Welcome ${data.userName}. There are item(s) in your cart. Do you want to return to cart to checkout your item(s)?`,
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
              await router.push("/products");
              setIsLoading(false);
            } else {
            }
          });
        }
      }
    }
  };
  return (
    <Fragment>
      <Head>
        <title>Register Page</title>
        <meta name="description" content="Register Page for Eatsy Food App" />
      </Head>
      <div className={classes.container}>
        <h1 className="pageHeader">REGISTRATION</h1>
        {isLoading ? <h3 className={classes.regLoading}>Please Wait. Registering User...</h3> : ""}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitForm)}>
              <Input2 />
              <Input1 receiveImageUrl={receiveImageUrl} />
              <br />
              <br />
              <input type="submit" className={classes.submitButton} />
            </form>
          </FormProvider>
        )}
      </div>
    </Fragment>
  );
};

export default Register;
