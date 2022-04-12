import classes from "../AddEditProductForm.module.css";
import Input from "../../../ui/Input";
import { Fragment, useState } from "react";
import { MenuItem, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material/Select";
import { iconsArray } from "../../../public/CountryIcons";

const AddEditFormInput1 = () => {
  const [cat, setCat] = useState("");
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleChangeCat = (event: SelectChangeEvent) => {
    setCat(event.target.value);
  };
  return (
    <Fragment>
      <Input names="productName" type="text" label="Product Name" pageType="product" multiLines={false} disable={false} />
      <Input names="productDescription" type="text" label="Product Description" pageType="product" multiLines={true} disable={false} />
      <Input names="productPrice" type="number" label="Product Price" pageType="product" multiLines={false} disable={false} />
      <br />
      <br />
      <FormControl variant="outlined" className={classes.catSelector}>
        <InputLabel id="productCategoryLabel">Product Category</InputLabel>
        <Select {...register("productCategory")} labelId="productCategoryLabel" label="Product Category" value={cat} onChange={handleChangeCat}>
          {iconsArray.map((country, i) => (
            <MenuItem key={i} value={country[2]}>
              {country[2]}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText style={{ color: "rgb(209, 63, 63)", background: "white" }}>
          {errors.productCategory ? errors.productCategory?.message : ""}
        </FormHelperText>
      </FormControl>
      <br />
      <br />
    </Fragment>
  );
};

export default AddEditFormInput1;
