import classes from "../../NavBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import NavFormInputs from "../NavBarSearch/NavFormInputs";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Modal, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { addSearchFields } from "../../../../redux/search";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchFormSchema } from "../../../../yupSchema/searchForm";

const NavBarSearch = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      fieldSelect: "",
      fieldParameter: "",
      greaterOrLessThanPrice: "equal",
    },
    resolver: yupResolver(searchFormSchema),
  });

  const onSubmitSearch = (data: any) => {
    dispatch(addSearchFields(data)); // add search data to redux storage.
    router.push("/products");
    setOpen(false);
    methods.reset();
  };

  return (
    <Fragment>
      <Button className={classes.searchButton} onClick={handleOpen}>
        <SearchIcon className={classes.searchIcon} />
      </Button>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <Box className={classes.modalContainer}>
          <button
            onClick={() => {
              setOpen(false);
              methods.reset();
            }}
            className={classes.modalCLoseButton}
          >
            <CloseIcon className={classes.modalCLoseIcon} />
          </button>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitSearch)}>
              <h1 className={classes.searchTitle}>Search Form</h1>
              <NavFormInputs />
            </form>
          </FormProvider>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default NavBarSearch;
