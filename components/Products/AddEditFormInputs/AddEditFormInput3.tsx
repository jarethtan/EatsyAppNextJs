import { Fragment } from "react";
import ImageInput from "../../../ui/ImageInput";

const AddEditFormInput3: React.FC<{ handlePreviewImage: any; imgLen: number }> = ({ handlePreviewImage, imgLen }) => {
  return (
    <Fragment>
      {imgLen === 3 ? <label htmlFor="productImage">Upload limit Reached.</label> : <label htmlFor="productImage">Max of {3 - imgLen} image(s)</label>}
      <br />
      <ImageInput handlePreviewImage={handlePreviewImage} disable={imgLen === 3 ? true : false} name="productImage" />
      <br />
    </Fragment>
  );
};

export default AddEditFormInput3;
