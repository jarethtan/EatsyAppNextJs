import React from "react";
import classes from "../NavBar.module.css";
import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";

const NavButtonIcon = () => {
  const { asPath } = useRouter();
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", md: "flex" }, cursor: asPath == "/checkout" ? "not-allowed" : "pointer" }}>
        <Button href="/" disabled={asPath == "/checkout" ? true : false}>
          <img src="/eatsyIcons/EatsyNavIcon.jpeg" alt="" className={classes.eatsyIcon} />
        </Button>
      </Typography>
      <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "flex", md: "none" }, cursor: asPath == "/checkout" ? "not-allowed" : "pointer" }}>
        <Button href="/" disabled={asPath == "/checkout" ? true : false}>
          <img src="/eatsyIcons/EatsyNavIcon.jpeg" alt="" className={classes.eatsyIcon} />
        </Button>
      </Typography>
    </Box>
  );
};

export default NavButtonIcon;
