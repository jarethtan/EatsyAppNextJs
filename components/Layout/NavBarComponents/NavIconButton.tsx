import React from "react";
import classes from "../NavBar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Modal from "../../../ui/Modal";
import { Box, IconButton } from "@mui/material";
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
        disableRipple
        size="large"
        aria-label="Collapsed Nav Bar Menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
        className={classes.iconButton}
      >
        <MenuIcon sx={{ color: "brown" }} />
      </IconButton>
      <Modal // this menu is for the list of nav button when collpasing the the navbar
        show={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        modalFunction="navCollapseMenu"
      >
        <div className={classes.modalIconContainer}>
          {links.map((link, index) => (
            <div key={link}>
              <Link href={link}>
                <a className={classes.link} onClick={handleCloseNavMenu}>
                  {pages[index]}
                </a>
              </Link>
            </div>
          ))}
          {session.data?.role === "admin" ? (
            <Link href="/products/addProduct">
              <a className={classes.link} onClick={handleCloseNavMenu}>
                Add Product
              </a>
            </Link>
          ) : (
            ""
          )}
          {session.status === "unauthenticated" ? (
            <Link href="/personnel/userLogin">
              <a className={classes.link} onClick={handleCloseNavMenu}>
                Login
              </a>
            </Link>
          ) : (
            <Link href="#">
              <a
                className={classes.link}
                onClick={() => {
                  signOut({ callbackUrl: `/` });
                  alertService.success(`Thank you for visiting Eatsy! See you again soon!`, { keepAfterRouteChange: true });
                }}
              >
                Logout
              </a>
            </Link>
          )}
        </div>
      </Modal>
    </Box>
  );
};

export default NavIconButton;
