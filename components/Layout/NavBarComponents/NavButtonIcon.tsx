import React, { Fragment } from "react";
import { Typography, Button } from "@mui/material";
import classes from "../NavBar.module.css";

const NavButtonIcon = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", md: "flex" } }}>
        <Button href="/">
          <img src="/eatsyIcons/EatsyNavIcon.jpeg" alt="" className={classes.eatsyIcon} />
        </Button>
      </Typography>
      <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "flex", md: "none" } }}>
        <Button href="/">
          <img src="/eatsyIcons/EatsyNavIcon.jpeg" alt="" className={classes.eatsyIcon} />
        </Button>
      </Typography>
    </Fragment>
  );
};

export default NavButtonIcon;
