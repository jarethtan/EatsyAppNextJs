import React from "react";
import classes from "../NavBar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
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
              <a href={link} className={classes.link}>
                {pages[index]}
              </a>
            </MenuItem>
          </div>
        ))}
        {session.data?.role === "admin" ? (
          <MenuItem onClick={handleCloseNavMenu}>
            <a className={classes.link} href="/products/addProduct">
              Add Product
            </a>
            {asPath === "/cartPage" ? <br /> : ""}
          </MenuItem>
        ) : (
          ""
        )}
        {session.status === "unauthenticated" ? (
          <div>
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
          </div>
        ) : (
          ""
        )}
      </Menu>
    </Box>
  );
};

export default NavIconButton;
