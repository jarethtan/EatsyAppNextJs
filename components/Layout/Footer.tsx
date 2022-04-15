import classes from "./Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Link from "next/link";
import { profileAlert } from "../../lib/helpers/alertHelpers/profileAlert";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { alertService } from "../../lib/services/alert";
import { signOut } from "next-auth/react";

const Footer = () => {
  const session: any = useSession();
  return (
    <footer>
      <div>
        <div className={classes.container}>
          <Grid container>
            {/* <Grid item xs={6} sm={1} /> */}
            <Grid item xs={6} sm={2.5} order={{ xs: 2, sm: 1 }}>
              <div className={classes.header}>WebApp</div>
              <div>
                <Link href="/">
                  <a className={classes.link}>Home</a>
                </Link>
                <Link href="/products">
                  <a className={classes.link}>Menu</a>
                </Link>
              </div>
            </Grid>
            <Grid item xs={6} sm={2.5} order={{ xs: 3, sm: 2 }}>
              <div className={classes.header}>Access</div>
              <div>
                {session.status === "unauthenticated" ? (
                  <Link href="/personnel/userLogin">
                    <a className={classes.link}>Login</a>
                  </Link>
                ) : (
                  <Link href="">
                    <a
                      className={classes.link}
                      onClick={() => {
                        signOut({ callbackUrl: `/` });
                        alertService.success(`Thank you for visiting Eatsy! See you again soon!`, { keepAfterRouteChange: true });
                      }}
                    >
                      Logout
                    </a>
                  </Link>
                )}
                <Link href="/personnel/userRegister">
                  <a className={classes.link}>Register</a>
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={2} order={{ xs: 1, sm: 3 }}>
              <img src="/eatsyIcons/EatsyNavIcon.jpeg" alt="" className={classes.eatsyIcon} />
            </Grid>
            <Grid item xs={6} sm={2.5} order={{ xs: 4, sm: 4 }}>
              <div className={classes.header}>About</div>
              <div>
                <Link href="/profile">
                  <a className={classes.link} onClick={profileAlert}>
                    Profile
                  </a>
                </Link>
                <Link href="/aboutUs">
                  <a className={classes.link}>About Us</a>
                </Link>
              </div>
            </Grid>
            <Grid item xs={6} sm={2.5} order={{ xs: 5, sm: 5 }}>
              <div className={classes.header}>Follow Us</div>
              <div>
                <Link href="/">
                  <FacebookIcon className={classes.icon} />
                </Link>
                <Link href="/">
                  <InstagramIcon className={classes.instaIcon} />
                </Link>
                <Link href="/">
                  <TwitterIcon className={classes.icon} />
                </Link>
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
