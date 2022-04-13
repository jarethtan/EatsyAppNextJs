import { Fragment } from "react";
import classes from "../AddEditProductForm.module.css";
import ProductModel from "../../../models/productModelClass";
import ImageDelete from "../../../ui/ImageDelete";

const AddEditFormInput2: React.FC<{ foundProduct: ProductModel; imgLen: number }> = ({ foundProduct, imgLen }) => {
  return (
    <Fragment>
      <br />
      {imgLen > 1 ? (
        <label htmlFor="deleteImage">Select up to {imgLen - 1} Image(s) to delete</label>
      ) : (
        <label htmlFor="deleteImage">Deletion not allowed. Product must have at least one image.</label>
      )}
      <br />
      {foundProduct.productImage.map((uploadedImageUrl: string) => (
        <div key={uploadedImageUrl} className={classes.imageInputDiv}>
          <ImageDelete disable={imgLen > 1 ? false : true} uploadedImageUrl={uploadedImageUrl} />
          <label htmlFor={uploadedImageUrl} className={classes.imageCheckboxLabel}>
            <img src={uploadedImageUrl} alt="" width={150} height={120} className={classes.imageInputElement} />
          </label>
        </div>
      ))}
    </Fragment>
  );
};

export default AddEditFormInput2;
