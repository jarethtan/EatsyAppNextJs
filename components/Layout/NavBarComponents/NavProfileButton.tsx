import React from "react";
import classes from "../NavBar.module.css";
import Link from "next/link";
import { profileAlert } from "../../../lib/helpers/alertHelpers/profileAlert";
import { Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const ProfileNavButton: React.FC<{
  userImage: any;
}> = ({ userImage }) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      {userImage ? (
        <Link href="/profile">
          <a onClick={profileAlert}>
            <img src={userImage} alt="User Image" className={classes.profileAvatar} />
          </a>
        </Link>
      ) : (
        <Link href="/profile">
          <a onClick={profileAlert}>
            <PersonIcon fontSize="large" className={classes.profileAvatar} />
          </a>
        </Link>
      )}
    </Box>
  );
};

export default ProfileNavButton;
