import classes from "./CarouselForm.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { MenuItem, FormControl, InputLabel, Checkbox, ListItemText, Select, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { carouselUploadSchema } from "../../yupSchema/carouselForm";
import { useSession } from "next-auth/react";
import { alertService } from "../../lib/services/alert";
import ProductModel from "../../models/productModelClass";

const CarouselForm: React.FC<{ allProducts: ProductModel[] }> = (props) => {
  const [productCheckbox, setProductCheckbox] = useState([]);
  const session = useSession();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedProducts: "",
    },
    resolver: yupResolver(carouselUploadSchema),
  });

  const onHandleProductCheckBox = (event: any) => {
    setProductCheckbox(typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value);
  };

  const onSubmitSelectedProducts = async (data: any) => {
    if (session.data?.role !== "admin") {
      console.log("Only adminstrators are allowed to selected carousel to display in EATSY food.");
      return;
    }
    if (data.selectedProducts.length > 4) {
      alertService.error(`Only allowed to upload a maximum of FOUR items into carousel display.`, { autoClose: false, keepAfterRouteChange: true });
      router.push("/carouselPage");
      return;
    }
    const selectedProductObject = [];
    for (let name of data.selectedProducts) {
      const foundProduct = props.allProducts.find((product) => product.productName === name);
      selectedProductObject.push(foundProduct);
    }
    const storeCarouselResponse = await fetch(`/api/carousel/${session.data?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedProductObject),
    });
    const storeCarouselStatus = await storeCarouselResponse.json();
    if (storeCarouselResponse.status == 201) {
      console.log("Selected carousels stored in adminstrator's database in MongoDB");
      await router.push("/");
      alertService.success(storeCarouselStatus.message, { keepAfterRouteChange: true });
    } else {
      console.log("Fail to store carousels in adminstrator's database in MongoDB");
      alertService.error(`${storeCarouselStatus.message}: ${storeCarouselStatus.body}`, { autoClose: false, keepAfterRouteChange: false });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitSelectedProducts)} noValidate>
      <div className={classes.formInfo}>Select the dishes to display on the carousel in the homepage. Maximum of Four dishes can be selected.</div>
      <br />
      <FormControl variant="outlined" className={classes.formSelect}>
        <InputLabel id="productCheckboxLabel">Product Carousel</InputLabel>
        <Select
          {...register("selectedProducts")}
          labelId="productCheckboxLabel"
          label="Product Carousel"
          multiple
          value={productCheckbox}
          renderValue={(name) => name.join(" / ")}
          onChange={onHandleProductCheckBox}
        >
          {props.allProducts.map((product: ProductModel, i: number) => (
            <MenuItem key={i} value={product.productName}>
              <Checkbox checked={productCheckbox.indexOf(product.productName as never) > -1} />
              <ListItemText primary={product.productName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <span style={{ marginLeft: "3rem", color: "rgb(255, 66, 66)", background: "white", fontSize: "0.8rem" }}>
        {errors.selectedProducts ? errors.selectedProducts?.message : ""}
      </span>
      <br />
      <Button type="submit" variant="contained" color="primary" className={classes.carouSelectSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default CarouselForm;
