import React, { Fragment } from "react";
import classes from "../NavBar.module.css";
import Link from "next/link";
import { Button, Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { alertService } from "../../../lib/services/alert";
import { signOut } from "next-auth/react";

const NavMainLinks = () => {
  const session: any = useSession();
  const { asPath } = useRouter();

  return (
    <div className={classes.mainLinkDiv}>
      <Grid container>
        <Grid item>
          <a href="/">
            <button className={classes.mainLinkButton}>
              <span>Home</span>
            </button>
          </a>
        </Grid>
        <Grid item>
          <a href="/aboutUs">
            <button className={classes.mainLinkButton}>
              <span>About</span>
            </button>
          </a>
        </Grid>
        {session.data?.role === "admin" ? (
          <Grid item>
            <a href="/products/addProduct">
              <button className={classes.mainLinkButton}>
                <span>Add Product</span>
              </button>
            </a>
          </Grid>
        ) : (
          ""
        )}
        {asPath !== "/" ? (
          <Grid item>
            <a href="/products">
              <button className={classes.mainLinkButton}>
                <span>Menu</span>
              </button>
            </a>
          </Grid>
        ) : (
          ""
        )}
        {session.status === "unauthenticated" ? (
          <Grid item>
            <a href="/personnel/userLogin">
              <button className={classes.mainLinkButton}>
                <span>Login</span>
              </button>
            </a>
          </Grid>
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
      </Grid>
    </div>
  );
};

export default NavMainLinks;
