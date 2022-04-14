import React, { useState, useEffect } from "react";
import CartIcon from "../../Cart/CartIcon";
import classes from "../NavBar.module.css";
import Link from "next/link";
import ProductModel from "../../../models/productModelClass";
import { useSelector } from "react-redux";

const NavCartButton = () => {
  const cart = useSelector((state: any) => state.cart);
  const cartItemNumber = cart.reduce((accumulator: number, product: ProductModel) => accumulator + product.quantity, 0);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const btnClasses = `${btnIsHighlighted ? classes.bump : ""}`;

  // useEffect(() => {
  //   if (cart.length === 0) return;
  //   setBtnIsHighlighted(true);

  //   const timer = setTimeout(() => {
  //     setBtnIsHighlighted(false);
  //   }, 300);

  //   return () => clearTimeout(timer);
  // }, [cart]);

  return (
    <Link href="/cartPage">
      <button className={classes.buttons}>
        <span className={classes.icons}>
          <CartIcon bump={btnClasses} />
        </span>
        <span suppressHydrationWarning className={classes.badges}>
          {cartItemNumber}
        </span>
      </button>
    </Link>
  );
};

export default NavCartButton;
