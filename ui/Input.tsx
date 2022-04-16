import classes from "../components/Products/AddEditProductForm.module.css";
import { Fragment } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

const Input: React.FC<{
  names: any;
  type: string;
  label: string;
  disable: boolean;
  multiLines: boolean;
  pageType: string;
  autoFocus: boolean;
}> = ({ names, type, label, disable, multiLines, pageType, autoFocus }) => {
  const { control } = useFormContext();
  return (
    <Fragment>
      <br />
      <br />
      <Controller
        name={names}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            autoFocus={autoFocus}
            type={type}
            label={label}
            variant="outlined"
            disabled={disable}
            autoComplete="off"
            multiline={multiLines}
            rows={3}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error?.message : ""}
            style={pageType === "checkout" ? { backgroundColor: "white", width: "100%" } : { backgroundColor: "white" }}
            className={pageType === "product" ? classes.inputField : ""}
          />
        )}
      />
    </Fragment>
  );
};

export default Input;
