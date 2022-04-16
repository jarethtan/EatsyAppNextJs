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
}> = ({ links, pages }) => {
  const session: any = useSession();
  const { asPath } = useRouter();

  return (
    <div className={classes.mainLinkDiv}>
      {links.map((link, Index) => (
        <Button key={Index} href={link} className={classes.mainLinkButton}>
          <span className={classes.mainLinkButton}>{pages[Index]}</span>
        </Button>
      ))}
      {session.data?.role === "admin" ? (
        <Button href="/products/addProduct" className={classes.mainLinkButton}>
          <span className={classes.mainLinkButton}>Add Product</span>
        </Button>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <button className={classes.mainLinkButton}>
          <Button href="/personnel/userLogin" className={classes.mainLinkButton}>
            <span className={classes.mainLinkButton}>Login</span>
          </Button>
        </button>
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
