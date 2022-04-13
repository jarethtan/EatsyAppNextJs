import { Fragment } from "react";
import Link from "next/link";
import classes from "./OrderCompleteContent.module.css";

const orderCompleteContent = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <h1>
          We will get right to preparing your food! <br />
          <br /> Thank you for ordering with Eatsy!
        </h1>
        <img src="/eatsyIcons/EatsyNavIcon.jpeg" alt="" className={classes.iconImage} />
        <br />
        <p className={classes.road}>
          ------------------------------------------------------------
          <br />
          ------------------------------------------------------------
        </p>
        <p className={classes.info}>
          Click {""}
          <Link href="/">
            <a className={classes.productLink}>here</a>
          </Link>
          {""} to continue browsing our food menu.
        </p>
      </div>
    </Fragment>
  );
};

export default orderCompleteContent;
