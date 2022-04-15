import React from "react";
import classes from "../NavBar.module.css";
import { profileAlert } from "../../../lib/helpers/alertHelpers/profileAlert";
import { Box, Tooltip, Avatar, Button } from "@mui/material";

const ProfileNavButton: React.FC<{
  userImage: any;
}> = ({ userImage }) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Vist your account details">
        {userImage ? (
          <Button href="/profile" onClick={profileAlert}>
            <img src={userImage} alt="User Image" className={classes.profileAvatar} />
          </Button>
        ) : (
          <Button href="/profile" onClick={profileAlert}>
            <Avatar className={classes.profileAvatar} alt="User Image" />
          </Button>
        )}
      </Tooltip>
    </Box>
  );
};

export default ProfileNavButton;
