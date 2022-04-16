import React, { Fragment } from "react";
import classes from "../NavBar.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { alertService } from "../../../lib/services/alert";
import { signOut } from "next-auth/react";

const NavMainLinks = () => {
  const session: any = useSession();
  const { asPath } = useRouter();

  return (
    <div className={classes.mainLinkDiv}>
      <Button href="/" className={classes.mainLinkButton}>
        Home
      </Button>
      {session.data?.role === "admin" ? (
        <Button href="/products/addProduct" className={classes.mainLinkButton}>
          Add Product
        </Button>
      ) : (
        ""
      )}
      {asPath !== "/" && asPath !== "/personnel/userLogin" ? (
        <Fragment>
          <Button href="/products" className={classes.mainLinkButton}>
            Menu
          </Button>
          <Button href="/aboutUs" className={classes.mainLinkButton}>
            About
          </Button>
        </Fragment>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <Button href="/personnel/userLogin" className={classes.mainLinkButton}>
          Login
        </Button>
      ) : (
        <Button
          onClick={() => {
            signOut({ callbackUrl: `/` });
            alertService.success(`Thank you for visiting Eatsy! See you again soon!`, { keepAfterRouteChange: true });
          }}
          className={classes.mainLinkButton}
        >
          <span>Logout</span>
        </Button>
      )}
    </div>
  );
};

export default NavMainLinks;
