import React, { Fragment } from "react";
import classes from "../NavBar.module.css";
import Link from "next/link";
import { Box, Typography, Menu, Tooltip, MenuItem, Button } from "@mui/material";
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
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {links.map(
        (
          link,
          index // this is the start of navbuttons when the navbar is uncollpased.
        ) => (
          <Button onClick={handleCloseNavMenu} key={link} className={classes.button}>
            <Link href={link}>
              <Typography className={classes.word}>{pages[index]}</Typography>
            </Link>
          </Button>
        )
      )}
      {session.data?.role === "admin" ? (
        <Button onClick={handleCloseNavMenu} className={classes.button}>
          <Link href="/products/addProduct">
            <Typography className={classes.word}>Add Product</Typography>
          </Link>
        </Button>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <Fragment>
          <Button href="/personnel/userLogin" className={classes.button}>
            <Typography className={classes.word}>LOGIN</Typography>
          </Button>
        </Fragment>
      ) : (
        <Button className={classes.button}>
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
    </Box>
  );
};

export default NavMainLinks;
