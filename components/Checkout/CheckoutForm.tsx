import React, { Fragment, useEffect, useState } from "react";
import classes from "./CheckoutForm.module.css";
import LoadingSpinner from "../../ui/LoadingSpinner";
import PaymentButtons from "./PaymentButtons";
import DeliveryPickupTimeInput from "./CheckoutInput";
import Input from "../../ui/Input";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToggleButton, Tooltip } from "@mui/material";
import { editCartNameDB } from "../../cartStorageOption";
import { clearCartState } from "../../redux/cart";
import { alertService } from "../../lib/services/alert";
import { CheckoutInputModel, RegisterInputModel } from "../../models/formInputTypes";
import { deliveryFormSchema, pickUpFormSchema } from "../../yupSchema/userForm";
import { format } from "date-fns";

const CheckoutForm: React.FC<{ totalCartPrice: string; user: RegisterInputModel; userCart: object[] }> = ({ totalCartPrice, user, userCart }) => {
  const [deliveryMethod, setDeliveryMethod] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const otherLoginRoute = user === undefined;
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    deliveryMethod;
  }, [deliveryMethod]);

  const methods = useForm<CheckoutInputModel>({
    defaultValues: {
      deliveryAddress: otherLoginRoute ? "" : user.deliveryAddress,
      postalCode: otherLoginRoute ? "" : user.postalCode,
      contactNumber: otherLoginRoute ? "" : user.contactNumber,
      contactNumPickUp: "",
      selectDate: Date.now(),
      selectTime: "",
    },
    resolver: deliveryMethod ? yupResolver(deliveryFormSchema) : yupResolver(pickUpFormSchema),
  });

  const onDeliveryMethod = () => {
    setDeliveryMethod(!deliveryMethod);
  };

  const onPayment = async (data: any) => {
    // payment method, use userCart state information to proceed with payment method. "data" consist of delivery information to be used during payment as well. Logic is not create as project will stop here.
    data.selectTime = format(new Date(data.selectTime), "hh:mm a");
    let result: any = {}; // filter input base on what delivery method was selected.
    if (deliveryMethod) {
      for (const [key, value] of Object.entries(data))
        if (key.includes("select") || key.includes("delivery") || key.includes("postal") || key.includes("contactNumber")) result[key] = value;
    } else {
      for (const [key, value] of Object.entries(data)) if (key.includes("select") || key.includes("PickUp")) result[key] = value;
    }
    try {
      if (localStorage.cart === undefined || JSON.parse(localStorage.cart).cart.length === 0) {
        setIsLoading(true);
        await editCartNameDB(session.data?.id, totalCartPrice); // once payment is successful, the "cart" field name in the user mongodb database will be changed to "paidcart" to indicate that this cart was purchase by the user for future data gathering.
        setIsLoading(false);
        alertService.success("Thank you for your patience. Your order has been completed.", { keepAfterRouteChange: true });
        await router.push(`/orderComplete`);
      } else {
        setIsLoading(true);
        dispatch(clearCartState({ cart: userCart })); // clear redux state.
        localStorage.removeItem("cart"); // clear localstorage state.
        setIsLoading(false);
        alertService.success("Thank you for your patience. Your order has been completed.", { keepAfterRouteChange: true });
        await router.push(`/orderComplete`);
      }
    } catch (e: any) {
      alertService.error(`An error have occured during payment. Error message: ${e.message}`, { autoClose: false, keepAfterRouteChange: true });
    }
  };
  return (
    <div>
      {isLoading ? (
        <div className={classes.container}>
          <h1 className="pageHeader">Checkout in progress...</h1>
          <LoadingSpinner />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onPayment)}>
            <h3 className={classes.userInfoForm}>User Information</h3>
            <Tooltip title={deliveryMethod ? "Click for pick-up option" : "Click for delivery option"}>
              <ToggleButton value={deliveryMethod} disableFocusRipple className={classes.deliveryOptionButton} onChange={onDeliveryMethod}>
                {deliveryMethod ? "Delivery Option" : "Pick-up Option"}
              </ToggleButton>
            </Tooltip>
            {deliveryMethod ? (
              <Fragment>
                {otherLoginRoute ? <h4>Enter your delivery address</h4> : <h4>Confirm delivery address</h4>}
                <Input names="deliveryAddress" type="text" label="Delivery Address" pageType="checkout" multiLines={false} disable={false} autoFocus={false} />
                <Input names="postalCode" type="text" label="Postal Code" pageType="checkout" multiLines={false} disable={false} autoFocus={false} />
                <Input names="contactNumber" type="text" label="Contact Number" pageType="checkout" multiLines={false} disable={false} autoFocus={false} />
              </Fragment>
            ) : (
              ""
            )}
            <DeliveryPickupTimeInput deliveryMethod={deliveryMethod} />
            {user !== undefined || userCart !== undefined ? (
              <Fragment>
                <h2 className={classes.finalPrice}>Grand Total: ${totalCartPrice}</h2>
                <br />
                <p className={classes.paymentNote}>Payment Method:</p>
                <PaymentButtons />
              </Fragment>
            ) : (
              ""
            )}
            <br />
            <br />
            <br />
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default CheckoutForm;
