import React from "react";
import classes from "../NavBar.module.css";
import { profileAlert } from "../../../lib/helpers/alertHelpers/profileAlert";
import { Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const ProfileNavButton: React.FC<{
  userImage: any;
}> = ({ userImage }) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      {userImage ? (
        <Button href="/profile" onClick={profileAlert}>
          <img src={userImage} alt="User Image" className={classes.profileAvatar1} />
        </Button>
      ) : (
        <Button href="/profile" onClick={profileAlert}>
          <PersonIcon sx={{ width: "2.6rem", height: "2.6rem" }} className={classes.profileAvatar2} />
        </Button>
      )}
    </Box>
  );
};

export default ProfileNavButton;
