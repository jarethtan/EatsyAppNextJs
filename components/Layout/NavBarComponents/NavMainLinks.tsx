import React, { Fragment } from "react";
import classes from "../NavBar.module.css";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { alertService } from "../../../lib/services/alert";
import { signOut } from "next-auth/react";

const NavMainLinks: React.FC<{
  links: string[];
  pages: string[];
  handleCloseNavMenu: any;
}> = ({ links, pages, handleCloseNavMenu }) => {
  const session: any = useSession();
  const { asPath } = useRouter();

  return (
    <div className={classes.mainLinkDiv}>
      {links.map(
        (
          link,
          index // this is the start of navbuttons when the navbar is uncollpased.
        ) => (
          <Button href={link} onClick={handleCloseNavMenu} key={link} className={classes.mainLinkButton}>
            <Link href="">{pages[index]}</Link>
          </Button>
        )
      )}
      {session.data?.role === "admin" ? (
        <Button href="/products/addProduct" onClick={handleCloseNavMenu} className={classes.mainLinkButton}>
          <Link href="">Add Product</Link>
        </Button>
      ) : (
        ""
      )}
      {asPath !== "/" ? (
        <Button href="/products" onClick={handleCloseNavMenu} className={classes.mainLinkButton}>
          <Link href="">Menu</Link>
        </Button>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <Button href="/personnel/userLogin" className={classes.mainLinkButton}>
          <Link href="">Login</Link>
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
