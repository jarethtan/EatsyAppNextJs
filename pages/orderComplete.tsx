import React, { Fragment } from "react";
import Head from "next/head";
import OrderCompleteContent from "../components/OrderComplete/OrderCompleteContent";

const OrderComplete = () => {
  return (
    <Fragment>
      <Head>
        <title>Eatsy Food App</title>
        <meta name="description" content="Order Completed Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OrderCompleteContent />
    </Fragment>
  );
};

export default OrderComplete;
