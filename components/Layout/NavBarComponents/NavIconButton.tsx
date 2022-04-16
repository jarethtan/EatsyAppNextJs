import React from "react";
import classes from "../NavBar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { alertService } from "../../../lib/services/alert";
import { signOut } from "next-auth/react";

const NavIconButton: React.FC<{
  links: string[];
  pages: string[];
  handleCloseNavMenu: any;
  handleOpenNavMenu: any;
  anchorElNav: any;
}> = ({ links, pages, handleCloseNavMenu, handleOpenNavMenu, anchorElNav }) => {
  const session: any = useSession();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
        disabled
      >
        <MenuIcon sx={{ color: "brown" }} />
      </IconButton>
      <Menu // this menu is for the list of nav button when collpasing the the navbar
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 30,
          horizontal: 30,
        }}
        keepMounted
        transformOrigin={{
          vertical: -10,
          horizontal: 30,
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
          </MenuItem>
        ) : (
          ""
        )}
        {session.status === "unauthenticated" ? (
          <MenuItem>
            <Link href="/personnel/userLogin">
              <a className={classes.link}>Login</a>
            </Link>
          </MenuItem>
        ) : (
          <MenuItem>
            <Typography
              className={classes.link}
              textAlign="center"
              onClick={() => {
                signOut({ callbackUrl: `/` });
                alertService.success(`Thank you for visiting Eatsy! See you again soon!`, { keepAfterRouteChange: true });
              }}
            >
              Logout
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default NavIconButton;
