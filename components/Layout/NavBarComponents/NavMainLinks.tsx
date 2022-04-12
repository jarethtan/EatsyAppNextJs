import React, { Fragment } from "react";
import classes from "../NavBar.module.css";
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
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, color: "white" }}>
      {links.map(
        (
          link,
          index // this is the start of navbuttons when the navbar is uncollpased.
        ) => (
          <Button onClick={handleCloseNavMenu} key={link} className={classes.button}>
            <a href={link}>
              <Typography className={classes.word}>{pages[index]}</Typography>
            </a>
          </Button>
        )
      )}
      {session.data?.role === "admin" ? (
        <Button onClick={handleCloseNavMenu} className={classes.button}>
          <a href="/products/addProduct">
            <Typography className={classes.word} color="white">
              Add Product
            </Typography>
          </a>
        </Button>
      ) : (
        ""
      )}
      {session.status === "unauthenticated" ? (
        <Fragment>
          <Tooltip title="Login Options">
            <Button onClick={handleOpenLoginMenu} className={classes.button}>
              <Typography className={classes.word} color="white">
                LOGIN
              </Typography>
            </Button>
          </Tooltip>
          <Menu
            sx={{ mt: "3rem", ml: "1.5rem" }}
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
              <a className={classes.link} href="/personnel/userRegister">
                Register
              </a>
            </MenuItem>
            {asPath === "/cartPage" ? <br /> : ""}
            <MenuItem onClick={handleCloseLoginMenu}>
              <a className={classes.link} href="/personnel/userLogin">
                User Login
              </a>
            </MenuItem>
            {asPath === "/cartPage" ? <br /> : ""}
            <MenuItem onClick={handleCloseLoginMenu}>
              <a className={classes.link} href="/personnel/adminLogin">
                Admin Login
              </a>
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
