import Input from "../../../ui/Input";
import ImageInput from "../../../ui/ImageInput";
import { Fragment, useState } from "react";
import { fileToDataURL } from "../../../lib/middlewares/fileToDataUrl";

const Input1: React.FC<{ receiveImageUrl: any }> = ({ receiveImageUrl }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const handlePreviewImage = async (event: any) => {
    if (event.target.name === "userImage") {
      const oneImageUrl: string = await fileToDataURL(event.target.files[0]);
      setImageUrl(oneImageUrl);
      receiveImageUrl(oneImageUrl);
    }
  };

  return (
    <Fragment>
      <Input names="firstName" type="text" label="First Name" pageType="register" multiLines={false} disable={false} autoFocus={false} />
      <Input names="lastName" type="text" label="Last Name" pageType="register" multiLines={false} disable={false} autoFocus={false} />
      <Input names="email" type="email" label="Email" pageType="register" multiLines={false} disable={false} autoFocus={false} />
      <br />
      {imageUrl ? (
        <Fragment key={imageUrl}>
          <br />
          <img src={imageUrl} width={100} height={100} alt="" style={{ border: "2px solid green", borderRadius: "8px" }} />
        </Fragment>
      ) : (
        ""
      )}
      <br />
      <ImageInput handlePreviewImage={handlePreviewImage} disable={false} name="userImage" />
      <Input names="deliveryAddress" type="text" label="Delivery Address" pageType="register" multiLines={false} disable={false} autoFocus={false} />
      <Input names="postalCode" type="text" label="Postal Code" pageType="register" multiLines={false} disable={false} autoFocus={false} />
      <Input names="contactNumber" type="text" label="Contact Number" pageType="register" multiLines={false} disable={false} autoFocus={false} />
    </Fragment>
  );
};

export default Input1;
