import React from "react";
import classes from "../NavBar.module.css";
import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { alertService } from "../../../lib/services/alert";
import { signOut } from "next-auth/react";

const NavMainLinks: React.FC<{
  links: string[];
  pages: string[];
  handleCloseNavMenu: any;
}> = ({ links, pages, handleCloseNavMenu }) => {
  const session: any = useSession();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {links.map(
        (
          link,
          index // this is the start of navbuttons when the navbar is uncollpased.
        ) => (
          <Button onClick={handleCloseNavMenu} key={link} href={link} className={classes.mainLinkButton}>
            {pages[index]}
          </Button>
        )
      )}
      {session.data?.role === "admin" ? (
        <Button onClick={handleCloseNavMenu} className={classes.mainLinkButton} href="/products/addProduct">
          Add Product
        </Button>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <Button href="/personnel/userLogin" className={classes.mainLinkButton}>
          LOGIN
        </Button>
      ) : (
        <Button
          className={classes.mainLinkButton}
          onClick={() => {
            signOut({ callbackUrl: `/` });
            alertService.success(`Thank you for visiting Eatsy! See you again soon!`, { keepAfterRouteChange: true });
          }}
        >
          Logout
        </Button>
      )}
    </Box>
  );
};

export default NavMainLinks;
