import classes from "../../NavBar.module.css";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

const NavFormInputs = () => {
  const [searchFields, setSearchFields] = useState("");
  const [greaterLesser, setGreaterLesser] = useState("");

  const router = useRouter();
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const onhandleField: any = (event: SelectChangeEvent) => {
    setSearchFields(event.target.value);
  };

  const onhandleGtLt: any = (event: SelectChangeEvent) => {
    setGreaterLesser(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.selectForm}>
        <select
          {...register("fieldSelect")}
          id="fieldSelect"
          value={searchFields}
          onChange={onhandleField}
          className={classes.searchSelect}
          style={searchFields === "" ? { color: "rgb(105, 105, 105)" } : { color: "black" }}
        >
          <option value="" hidden>
            Search Field
          </option>
          , <option value="productName">Product Name</option>, <option value="productDescription">Product Description</option>,
          <option value="productCategory">Product Category</option>,<option value="productPrice">Product Price</option>
        </select>
        <span style={{ color: "rgb(209, 63, 63)", background: "white", fontSize: "0.8rem" }}>{errors.fieldSelect ? errors.fieldSelect?.message : ""}</span>
      </div>
      <br />
      <br />
      {searchFields == "productPrice" ? (
        <Fragment>
          <div className={classes.selectForm}>
            <select
              {...register("greaterOrLessThanPrice")}
              id="GreaterOrLessThanPrice"
              value={greaterLesser}
              onChange={onhandleGtLt}
              className={classes.searchSelect}
            >
              <option value="greaterThan">Greater Than</option>, <option value="lesserThan">Lesser Than</option>,<option value="equal">Equal</option>
            </select>
            <span style={{ color: "rgb(209, 63, 63)", background: "white", fontSize: "0.8rem" }}>
              {errors.greaterOrLessThanPrice ? errors.greaterOrLessThanPrice?.message : ""}
            </span>
          </div>
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
          <Fragment>
            <input
              {...field}
              type={searchFields == "productPrice" ? "number" : "text"}
              id="Field Parameter"
              className={classes.searchParameter}
              placeholder="Search Parameter"
              autoComplete="off"
            />
            <span style={{ color: "rgb(209, 63, 63)", background: "white", width: "50%", margin: "auto", display: "block", fontSize: "0.8rem" }}>
              {!!errors.fieldParameter ? errors.fieldParameter?.message : ""}
            </span>
          </Fragment>
        )}
      />
      <br />
      <br />

      <button type="submit" className={classes.searchSubmitButton}>
        Search
      </button>
    </Fragment>
  );
};

export default NavFormInputs;
