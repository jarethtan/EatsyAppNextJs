import React from "react";
import classes from "../NavBar.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { alertService } from "../../../lib/services/alert";
import { profileAlert } from "../../../lib/helpers/alertHelpers/profileAlert";
import { signOut } from "next-auth/react";
import { Box, Typography, Menu, Tooltip, MenuItem, Avatar, IconButton, Button } from "@mui/material";

const ProfileNavButton: React.FC<{
  userImage: any;
  anchorElUser: any;
  handleOpenUserMenu: any;
  handleCloseUserMenu: any;
}> = ({ userImage, anchorElUser, handleOpenUserMenu, handleCloseUserMenu }) => {
  const session: any = useSession();
  const { asPath } = useRouter();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        {userImage ? (
          <IconButton onClick={handleOpenUserMenu}>
            <img src={userImage} alt="User Image" className={classes.profileAvatar} />
          </IconButton>
        ) : (
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar className={classes.profileAvatar} alt="User Image" />
          </IconButton>
        )}
      </Tooltip>
      <Menu
        sx={{ mt: "3rem", ml: "0.8rem" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Link href="/profile">
            <a className={classes.link} onClick={profileAlert}>
              Profile
            </a>
          </Link>
        </MenuItem>
        {asPath === "/cartPage" ? <br /> : ""}
        {session.status === "authenticated" ? (
          <MenuItem onClick={handleCloseUserMenu}>
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
        ) : (
          ""
        )}
      </Menu>
    </Box>
  );
};

export default ProfileNavButton;
