import classes from "../components/Products/AddEditProductForm.module.css";
import classCss from "../components/RegisterLogin/RegisterLoginInputs/Input1.module.css";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react";

const ImageInput: React.FC<{ handlePreviewImage: any; disable: boolean; name: string }> = ({ handlePreviewImage, disable, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // the methods such as control and formState are received by props spread the method const in register.tsx and login.tsx in FormProvider
  return (
    <Fragment>
      {name === "productImage" ? <br /> : ""}
      <input
        {...register(name === "productImage" ? "productImage" : "userImage")}
        type="file"
        multiple
        onChange={handlePreviewImage}
        name={name}
        id={name}
        disabled={disable}
        className={name === "productImage" ? classes.imageInput : classCss.imageInput}
      />
      <br />
      <br />
      {errors.productImage ? <span style={{ color: "rgb(296, 31, 31)" }}>{errors.productImage?.message}</span> : ""}
      {errors.userImage ? <span style={{ color: "rgb(296, 31, 31)" }}>{errors.userImage?.message}</span> : ""}
    </Fragment>
  );
};

export default ImageInput;
