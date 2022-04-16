import React, { Fragment } from "react";
import classes from "../NavBar.module.css";
import { Button, Link } from "@mui/material";
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
          <Link href={link} className={classes.mainLinkButton}>
            {pages[index]}
          </Link>
        )
      )}
      {session.data?.role === "admin" ? (
        <Link href="/products/addProduct" className={classes.mainLinkButton}>
          Add Product
        </Link>
      ) : (
        ""
      )}
      {asPath !== "/" ? (
        <Link href="/products" className={classes.mainLinkButton}>
          Menu
        </Link>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <Link href="/personnel/userLogin" className={classes.mainLinkButton}>
          Login
        </Link>
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
