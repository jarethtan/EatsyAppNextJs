import classes from "./NavBar.module.css";
import NavButtonCart from "./NavBarComponents/NavButtonCart";
import NavIconButton from "./NavBarComponents/NavIconButton";
import NavProfileButton from "./NavBarComponents/NavProfileButton";
import NavMainLinks from "./NavBarComponents/NavMainLinks";
import NavButtonIcon from "./NavBarComponents/NavButtonIcon";
import NavBarSearch from "./NavBarComponents/NavBarSearch/NavBarSearch";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Container } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { loadCartFromDB } from "../../cartStorageOption";
import { RegisterInputModel } from "../../models/formInputTypes";
import { StylesProvider } from "@material-ui/core/styles";

const links = ["/", "/aboutUs"];
const pages = ["Home", "About"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [userImage, setUserImage] = useState<null | RegisterInputModel>(null);
  const session: any = useSession();
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      if (session.status === "authenticated" && session.data.role === "user" && !!Number(session.data.id) === false) {
        const abortCont = new AbortController();
        const getUser = async () => {
          const foundUser = await loadCartFromDB(session.data.id, abortCont);
          setUserImage(foundUser.body.userImage);
        };
        getUser();
      } else if (session.status === "authenticated" && !!Number(session.data.id) === true) setUserImage(session.data.user.image);
      else return;
    } catch (e: any) {
      if (e.name === "AbortError") console.log("Fetch request aborted");
      else console.log(`Fetch request has an error or it was interrupted. Error message: ${e.message}`);
    }
  }, [session]); // useEffect will run whenever there is a change in session status. during loading, it will return. only when status i NOT loading then it will run through the code. !!Number(id) === true is when the user logs in with google or github. The Id will be a number which will also skip the logic to load user information from mongoDB with useEffect since there isnt a database to extract userImage in mongodb for people who logs in with google or github. The id for mongodb user is not a true number. it is a mix of alphanumeric. session role must be user and NOT an admin.

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget); // logic for expanding and condensing the navbar once the screen goes bigger or smaller.
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="sticky" className={classes.navBarBg}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavButtonIcon />
          <NavIconButton handleCloseNavMenu={handleCloseNavMenu} handleOpenNavMenu={handleOpenNavMenu} anchorElNav={anchorElNav} links={links} pages={pages} />
          <NavMainLinks handleCloseNavMenu={handleCloseNavMenu} links={links} pages={pages} />
          <NavBarSearch />
          {asPath !== "/checkout" ? (
            <Link href="/cartPage">
              <a className={classes.cartButton}>
                <NavButtonCart />
              </a>
            </Link>
          ) : (
            ""
          )}
          <NavProfileButton userImage={userImage} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
