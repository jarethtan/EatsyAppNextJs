import classes from "../AddEditProductForm.module.css";
import Input from "../../../ui/Input";
import { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material/Select";
import { iconsArray } from "../../../public/CountryIcons";

const AddEditFormInput1 = () => {
  const [cat, setCat] = useState("");
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleChangeCat: any = (event: SelectChangeEvent) => {
    setCat(event.target.value);
  };
  return (
    <Fragment>
      <Input names="productName" type="text" label="Product Name" pageType="product" multiLines={false} disable={false} autoFocus={true} />
      <Input names="productDescription" type="text" label="Product Description" pageType="product" multiLines={true} disable={false} autoFocus={false} />
      <Input names="productPrice" type="number" label="Product Price" pageType="product" multiLines={false} disable={false} autoFocus={false} />
      <br />
      <br />
      <div className={classes.catSelector}>
        <select
          {...register("productCategory")}
          id="productCategory"
          value={cat}
          onChange={handleChangeCat}
          className={classes.categorySelect}
          style={cat === "" ? { color: "rgb(145, 145, 145)" } : { color: "black" }}
        >
          <option value="" hidden>
            Product Category
          </option>
          {iconsArray.map((country, i) => (
            <option key={i} value={country[2]}>
              {country[2]}
            </option>
          ))}
        </select>
        <span style={{ color: "rgb(255, 66, 66)", background: "white", fontSize: "0.8rem" }}>
          {errors.productCategory ? errors.productCategory?.message : ""}
        </span>
      </div>
      <br />
      <br />
    </Fragment>
  );
};

export default AddEditFormInput1;
