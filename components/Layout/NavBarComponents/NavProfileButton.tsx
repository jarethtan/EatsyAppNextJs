import React from "react";
import classes from "../NavBar.module.css";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import { profileAlert } from "../../../lib/helpers/alertHelpers/profileAlert";
import { Button } from "@mui/material";

const ProfileNavButton: React.FC<{ userImage: any }> = ({ userImage }) => {
  const { asPath } = useRouter();
  return (
    <div style={{ flexGrow: 0, marginLeft: "auto", cursor: asPath == "/checkout" ? "not-allowed" : "pointer" }}>
      {userImage ? (
        <Button href="/profile" disableRipple onClick={profileAlert} disabled={asPath == "/checkout" ? true : false}>
          <img src={userImage} alt="User Image" className={classes.profileAvatar1} />
        </Button>
      ) : (
        <Button href="/profile" disableRipple onClick={profileAlert} disabled={asPath == "/checkout" ? true : false}>
          <PersonIcon sx={{ width: "2.6rem", height: "2.6rem" }} className={classes.profileAvatar2} />
        </Button>
      )}
    </div>
  );
};

export default ProfileNavButton;
