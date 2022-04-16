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
          <Link href="" key={index}>
            <a className={classes.mainLinkButton} href={link}>
              {pages[index]}
            </a>
          </Link>
        )
      )}
      {session.data?.role === "admin" ? (
        <Link href="">
          <a className={classes.mainLinkButton} href="/products/addProduct">
            Add Product
          </a>
        </Link>
      ) : (
        ""
      )}
      {asPath !== "/" ? (
        <Link href="">
          <a className={classes.mainLinkButton} href="/products">
            Menu
          </a>
        </Link>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <Link href="">
          <a className={classes.mainLinkButton} href="/personnel/userLogin">
            Login
          </a>
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
