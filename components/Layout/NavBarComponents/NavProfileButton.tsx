import React from "react";
import classes from "../NavBar.module.css";
import Link from "next/link";
import { profileAlert } from "../../../lib/helpers/alertHelpers/profileAlert";
import { Box, Tooltip, Avatar, Button } from "@mui/material";

const ProfileNavButton: React.FC<{
  userImage: any;
}> = ({ userImage }) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Vist your account details">
        {userImage ? (
          <Link href="/profile">
            <a onClick={profileAlert}>
              <img src={userImage} alt="User Image" className={classes.profileAvatar} />
            </a>
          </Link>
        ) : (
          <Link href="/profile">
            <a onClick={profileAlert}>
              <Avatar className={classes.profileAvatar} alt="User Image" />
            </a>
          </Link>
        )}
      </Tooltip>
    </Box>
  );
};

export default ProfileNavButton;
