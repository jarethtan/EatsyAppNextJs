import React from "react";
import classes from "../../NavBar.module.css";
import NavFormInputs from "../NavBarSearch/NavFormInputs";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { addSearchFields } from "../../../../redux/search";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchFormSchema } from "../../../../yupSchema/searchForm";

const NavSearchForm: React.FC<{ onChangeModalAction: any }> = ({ onChangeModalAction }) => {
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
    onChangeModalAction(false);
    methods.reset();
  };

  return (
    <Box className={classes.modalContainer}>
      <button
        onClick={() => {
          onChangeModalAction(false);
          methods.reset();
        }}
        className={classes.modalCloseButton}
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
  );
};

export default NavSearchForm;
