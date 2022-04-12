import classes from "./Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { profileAlert } from "../../lib/helpers/alertHelpers/profileAlert";
import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <div>
        <div className={classes.container}>
          <Grid container>
            {/* <Grid item xs={6} sm={1} /> */}
            <Grid item xs={6} sm={2.5} order={{ xs: 2, sm: 1 }}>
              <div className={classes.header}>WebApp</div>
              <div>
                <a className={classes.link} href="/">
                  Home
                </a>
                <a className={classes.link} href="/products">
                  Menu
                </a>
              </div>
            </Grid>
            <Grid item xs={6} sm={2.5} order={{ xs: 3, sm: 2 }}>
              <div className={classes.header}>Access</div>
              <div>
                <a className={classes.link} href="/personnel/userLogin">
                  Login
                </a>
                <a className={classes.link} href="/personnel/userRegister">
                  Register
                </a>
              </div>
            </Grid>
            <Grid item xs={12} sm={2} order={{ xs: 1, sm: 3 }}>
              <img src="/eatsyIcons/EatsyNavIcon.jpeg" className={classes.eatsyIcon} />
            </Grid>
            <Grid item xs={6} sm={2.5} order={{ xs: 4, sm: 4 }}>
              <div className={classes.header}>About</div>
              <div>
                <a className={classes.link} href="/profile" onClick={profileAlert}>
                  Profile
                </a>
                <a className={classes.link} href="/aboutUs">
                  About Us
                </a>
              </div>
            </Grid>
            <Grid item xs={6} sm={2.5} order={{ xs: 5, sm: 5 }}>
              <div className={classes.header}>Follow Us</div>
              <div>
                <a href="/">
                  <FacebookIcon className={classes.icon} fontSize="large" />
                </a>
                <a href="/">
                  <InstagramIcon className={classes.instaIcon} fontSize="large" />
                </a>
                <a href="/">
                  <TwitterIcon className={classes.icon} fontSize="large" />
                </a>
              </div>
            </Grid>
            {/* <Grid item xs={6} sm={1} /> */}
          </Grid>
          <div className={classes.bottom}>Eatsy Food App &reg; 2022</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
