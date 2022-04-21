import React, { Fragment } from "react";
import { Tooltip } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import classes from "./PaymentButtons.module.css";

const PaymentButtons = () => {
  return (
    <Fragment>
      <div>
        <button className={classes.appleButton} type="submit">
          <AppleIcon fontSize="large" className={classes.appleIcon} />
        </button>
        <button className={classes.creditCardButton} type="submit">
          <CreditCardIcon fontSize="large" className={classes.creditCardIcon} />
        </button>

        <button className={classes.cryptoButton} type="submit">
          <CurrencyBitcoinIcon fontSize="large" className={classes.cryptoIcon} />
        </button>
      </div>
    </Fragment>
  );
};

export default PaymentButtons;
