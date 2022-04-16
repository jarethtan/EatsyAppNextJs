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
            <img src={userImage} alt="User Image" className={classes.profileAvatar1} />
          </a>
        </Link>
      ) : (
        <Link href="/profile">
          <a onClick={profileAlert}>
            <PersonIcon sx={{ width: "2.6rem", height: "2.6rem" }} className={classes.profileAvatar2} />
          </a>
        </Link>
      )}
    </Box>
  );
};

export default ProfileNavButton;
