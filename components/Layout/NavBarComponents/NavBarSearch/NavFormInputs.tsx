import classes from "../../NavBar.module.css";
import { useState } from "react";
import { Fragment } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

const NavFormInputs = () => {
  const [searchFields, setSearchFields] = useState("");
  const [greaterLesser, setGreaterLesser] = useState("");
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const onhandleField = (event: SelectChangeEvent) => {
    setSearchFields(event.target.value);
  };

  const onhandleGtLt = (event: SelectChangeEvent) => {
    setGreaterLesser(event.target.value);
  };

  return (
    <Fragment>
      <FormControl variant="outlined" className={classes.searchSelect}>
        <InputLabel id="fieldSelectLabel">Search Field</InputLabel>
        <Select {...register("fieldSelect")} labelId="fieldSelectLabel" label="Field Select" value={searchFields} onChange={onhandleField}>
          <MenuItem value="productName">Product Name</MenuItem>, <MenuItem value="productDescription">Product Description</MenuItem>,
          <MenuItem value="productCategory">Product Category</MenuItem>,<MenuItem value="productPrice">Product Price</MenuItem>
        </Select>
        <FormHelperText style={{ color: "rgb(209, 63, 63)", background: "white" }}>{errors.fieldSelect ? errors.fieldSelect?.message : ""}</FormHelperText>
      </FormControl>
      <br />
      <br />
      {searchFields == "productPrice" ? (
        <Fragment>
          <FormControl variant="outlined" className={classes.searchSelect}>
            <InputLabel id="GreaterOrLessThanPriceLabel">Greater/Lesser</InputLabel>
            <Select
              {...register("greaterOrLessThanPrice")}
              labelId="GreaterOrLessThanPriceLabel"
              label="Greater Or Less Than Price"
              value={greaterLesser}
              onChange={onhandleGtLt}
            >
              <MenuItem value="greaterThan">Greater Than</MenuItem>, <MenuItem value="lesserThan">Lesser Than</MenuItem>,
              <MenuItem value="equal">Equal</MenuItem>
            </Select>
            <FormHelperText style={{ color: "rgb(209, 63, 63)", background: "white" }}>
              {errors.greaterOrLessThanPrice ? errors.greaterOrLessThanPrice?.message : ""}
            </FormHelperText>
          </FormControl>
          <br />
          <br />
        </Fragment>
      ) : (
        ""
      )}
      <Controller
        name="fieldParameter"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            type={searchFields == "productPrice" ? "number" : "text"}
            label="Field Parameter"
            variant="outlined"
            error={!!errors.fieldParameter}
            helperText={errors.fieldParameter ? errors.fieldParameter?.message : ""}
            className={classes.searchParameter}
            autoComplete="off"
          />
        )}
      />
      <br />
      <br />
      <br />
      <button type="submit" className={classes.searchSubmitButton}>
        Search
      </button>
    </Fragment>
  );
};

export default NavFormInputs;
