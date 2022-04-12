import classes from "../components/Products/AddEditProductForm.module.css";
import { useFormContext, Controller } from "react-hook-form";
import { Fragment } from "react";
import { Input } from "@mui/material";

const ImageDelete: React.FC<{ uploadedImageUrl: any; disable: boolean }> = ({ uploadedImageUrl, disable }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Fragment>
      <br />
      <input
        {...register("deleteImage")}
        type="checkbox"
        multiple
        name="deleteImage"
        id={uploadedImageUrl}
        value={uploadedImageUrl}
        disabled={disable}
        className={classes.imageInputCheckbox}
      />
    </Fragment>
  );
};

export default ImageDelete;
