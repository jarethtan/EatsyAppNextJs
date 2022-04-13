import React from "react";
import classes from "../NavBar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const NavIconButton: React.FC<{
  links: string[];
  pages: string[];
  handleCloseLoginMenu: any;
  handleCloseNavMenu: any;
  handleOpenNavMenu: any;
  anchorElNav: any;
}> = ({ links, pages, handleCloseLoginMenu, handleCloseNavMenu, handleOpenNavMenu, anchorElNav }) => {
  const session: any = useSession();
  const { asPath } = useRouter();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon sx={{ color: "brown" }} />
      </IconButton>
      <Menu // this menu is for the list of nav button when collpasing the the navbar
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {links.map((link, index) => (
          <div key={link}>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link href={link}>
                <a className={classes.link}>{pages[index]}</a>
              </Link>
            </MenuItem>
          </div>
        ))}
        {session.data?.role === "admin" ? (
          <MenuItem onClick={handleCloseNavMenu}>
            <Link href="/products/addProduct">
              <a className={classes.link}>Add Product</a>
            </Link>
            {asPath === "/cartPage" ? <br /> : ""}
          </MenuItem>
        ) : (
          ""
        )}
        {session.status === "unauthenticated" ? (
          <div>
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
          </div>
        ) : (
          ""
        )}
      </Menu>
    </Box>
  );
};

export default NavIconButton;
