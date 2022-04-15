import React, { Fragment } from "react";
import classes from "../NavBar.module.css";
import Link from "next/link";
import { Box, Typography, Menu, Tooltip, MenuItem, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const NavMainLinks: React.FC<{
  links: string[];
  pages: string[];
  handleCloseLoginMenu: any;
  handleOpenLoginMenu: any;
  handleCloseNavMenu: any;
  anchorElLogin: any;
}> = ({ links, pages, handleCloseLoginMenu, handleOpenLoginMenu, handleCloseNavMenu, anchorElLogin }) => {
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
          <Tooltip title="Login Options">
            <Button onClick={handleOpenLoginMenu} className={classes.button}>
              <Typography className={classes.word}>LOGIN</Typography>
            </Button>
          </Tooltip>
          <Menu
            sx={{ mt: "3rem", ml: "1.5rem", display: "inline-block" }}
            id="login-appbar"
            anchorEl={anchorElLogin}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElLogin)}
            onClose={handleCloseLoginMenu}
          >
            <MenuItem onClick={handleCloseLoginMenu}>
              <Link href="/personnel/userRegister">
                <a className={classes.link}>Register</a>
              </Link>
            </MenuItem>
            {asPath === "/cartPage" ? <br /> : ""}
            <MenuItem onClick={handleCloseLoginMenu}>
              <Link href="/personnel/userLogin">
                <a className={classes.link}>User Login</a>
              </Link>
            </MenuItem>
            {asPath === "/cartPage" ? <br /> : ""}
            <MenuItem onClick={handleCloseLoginMenu}>
              <Link href="/personnel/adminLogin">
                <a className={classes.link}>Admin Login</a>
              </Link>
            </MenuItem>
          </Menu>
        </Fragment>
      ) : (
        ""
      )}
    </Box>
  );
};

export default NavMainLinks;
