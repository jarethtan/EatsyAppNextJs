import classes from "../../NavBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "../../../../ui/Modal";
import NavSearchForm from "./NavSearchForm";
import { useEffect } from "react";
import { Fragment, useState } from "react";

const NavBarSearch = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const body = document.querySelector("body");
    body!.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const onChangeModalAction = (data: boolean) => {
    setOpen(data);
  };

  return (
    <Fragment>
      <button className={classes.searchButton} onClick={handleOpen}>
        <SearchIcon className={classes.searchIcon} />
      </button>
      <Modal show={open} onClose={handleClose} modalFunction="navSearch">
        <NavSearchForm onChangeModalAction={onChangeModalAction} />
      </Modal>
    </Fragment>
  );
};

export default NavBarSearch;
