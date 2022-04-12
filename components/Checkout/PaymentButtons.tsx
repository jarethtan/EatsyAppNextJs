import React, { Fragment } from "react";
import { Tooltip, Button, ButtonGroup } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import classes from "./PaymentButtons.module.css";

const PaymentButtons = () => {
  return (
    <Fragment>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Tooltip title="ApplePay">
          <Button className={classes.appleButton} type="submit">
            <AppleIcon fontSize="large" />
          </Button>
        </Tooltip>
        <Tooltip title="Credit Card">
          <Button className={classes.creditCardButton} type="submit">
            <CreditCardIcon fontSize="large" />
          </Button>
        </Tooltip>
        <Tooltip title="Cryptocurrency">
          <Button className={classes.cryptoButton} type="submit">
            <CurrencyBitcoinIcon fontSize="large" />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Fragment>
  );
};

export default PaymentButtons;
