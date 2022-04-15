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
          <Button onClick={handleCloseNavMenu} key={link} className={classes.mainLinkButton}>
            <Link href={link}>{pages[index]}</Link>
          </Button>
        )
      )}
      {session.data?.role === "admin" ? (
        <Button onClick={handleCloseNavMenu} className={classes.mainLinkButton}>
          <Link href="/products/addProduct">Add Product</Link>
        </Button>
      ) : (
        ""
      )}
      {asPath !== "/" ? (
        <Button onClick={handleCloseNavMenu} className={classes.mainLinkButton}>
          <Link href="/products">Menu</Link>
        </Button>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <Fragment>
          <Button href="/personnel/userLogin" className={classes.mainLinkButton}>
            LOGIN
          </Button>
        </Fragment>
      ) : (
        <Button className={classes.mainLinkButton}>
          <Typography
            className={classes.word}
            textAlign="center"
            onClick={() => {
              signOut({ callbackUrl: `/` });
              alertService.success(`Thank you for visiting Eatsy! See you again soon!`, { keepAfterRouteChange: true });
            }}
          >
            Logout
          </Typography>
        </Button>
      )}
    </div>
  );
};

export default NavMainLinks;
