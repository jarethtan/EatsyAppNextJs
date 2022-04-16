import React, { Fragment } from "react";
import classes from "../NavBar.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
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
          <Link href={link} key={index}>
            <Button className={classes.mainLinkButton}>{pages[index]}</Button>
          </Link>
        )
      )}
      {session.data?.role === "admin" ? (
        <Link href="/products/addProduct">
          <Button className={classes.mainLinkButton}>Add Product</Button>
        </Link>
      ) : (
        ""
      )}
      {asPath !== "/" ? (
        <Link href="/products">
          <Button className={classes.mainLinkButton}>Menu</Button>
        </Link>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <Link href="/personnel/userLogin">
          <Button className={classes.mainLinkButton}>Login</Button>
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
