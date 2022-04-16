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
          <Button href="/" className={classes.mainLinkButton}>
            <span>Home</span>
          </Button>
        </Grid>
        <Grid item>
          <Button href="/aboutUs" className={classes.mainLinkButton}>
            <span>About</span>
          </Button>
        </Grid>
        {session.data?.role === "admin" ? (
          <Grid item>
            <Button href="/products/addProduct" className={classes.mainLinkButton}>
              <span>Add Product</span>
            </Button>
          </Grid>
        ) : (
          ""
        )}
        {asPath !== "/" ? (
          <Grid item>
            <Button className={classes.mainLinkButton}>
              <span>Menu</span>
            </Button>
          </Grid>
        ) : (
          ""
        )}
        {session.status === "unauthenticated" ? (
          <Grid item>
            <Button href="/personnel/userLogin" className={classes.mainLinkButton}>
              <span>Login</span>
            </Button>
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
