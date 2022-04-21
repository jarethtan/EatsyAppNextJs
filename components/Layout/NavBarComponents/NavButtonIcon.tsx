import React from "react";
import classes from "../NavBar.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const NavButtonIcon = () => {
  const { asPath } = useRouter();
  return (
    <div style={{ flexGrow: 0 }}>
      <div className={classes.eatsyContainer1} style={{ cursor: asPath == "/checkout" ? "not-allowed" : "pointer" }}>
        <Button href="/" disabled={asPath == "/checkout" ? true : false}>
          <img src="/eatsyIcons/EatsyNavIcon.jpeg" alt="" className={classes.eatsyIcon} />
        </Button>
      </div>
      <div className={classes.eatsyContainer2} style={{ cursor: asPath == "/checkout" ? "not-allowed" : "pointer" }}>
        <Button href="/" disabled={asPath == "/checkout" ? true : false}>
          <img src="/eatsyIcons/EatsyNavIcon.jpeg" alt="" className={classes.eatsyIcon} />
        </Button>
      </div>
    </div>
  );
};

export default NavButtonIcon;
