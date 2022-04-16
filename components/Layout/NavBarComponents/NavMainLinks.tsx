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
        <Button disableRipple key={Index} href={link} className={classes.mainLinkButton}>
          <span className={classes.mainLinkSpan}>{pages[Index]}</span>
        </Button>
      ))}
      {session.data?.role === "admin" ? (
        <Button disableRipple href="/products/addProduct" className={classes.mainLinkButton}>
          <span className={classes.mainLinkSpan}>Add Product</span>
        </Button>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <Link href="/personnel/userLogin">
          <a className={classes.mainLinkLink}>Login</a>
        </Link>
      ) : (
        <Link href="">
          <a
            onClick={() => {
              signOut({ callbackUrl: `/` });
              alertService.success(`Thank you for visiting Eatsy! See you again soon!`, { keepAfterRouteChange: true });
            }}
            className={classes.mainLinkLink}
          >
            Logout
          </a>
        </Link>
      )}
    </div>
  );
};

export default NavMainLinks;
