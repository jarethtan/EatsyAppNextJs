import React, { Fragment, useState } from "react";
import classes from "./ProductDetails.module.css";
import ProductModel from "../../models/productModelClass";
import { useRouter } from "next/router";
import { alertService } from "../../lib/services/alert";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart";
import { useSession } from "next-auth/react";
import { Button, Switch, FormControlLabel, FormGroup } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { icons } from "../../public/CountryIcons";
import { TextArea } from "semantic-ui-react";

const ProductDetails: React.FC<{ foundProduct: ProductModel }> = (props) => {
  const [request, setRequest] = useState(false);
  const [requestContent, setRequestContent] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSession();

  const onHandleRequest = () => {
    setRequest(!request);
  };

  props.foundProduct.productNote = requestContent;

  const productWithNotes = props.foundProduct;

  const onDeleteProduct = async () => {
    if (session.data?.role === "admin") {
      const deleteProductResponse = await fetch(`api/products/${props.foundProduct._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.foundProduct),
      });
      const deleteProductStatus = await deleteProductResponse.json();
      if (deleteProductStatus.message !== "Product deleted in Mongo and Cloudinary DB") {
        alertService.error(`${deleteProductStatus.message}: ${deleteProductStatus.body}`, { autoClose: false, keepAfterRouteChange: false });
        return;
      } else {
        await router.push("/products");
        alertService.success(deleteProductStatus.message, { keepAfterRouteChange: true });
      }
    } else {
      await router.push(`/`);
      alertService.error("As a user, you are not allowed to delete a product. These rights are only reserved for the adminstrator", {
        autoClose: false,
        keepAfterRouteChange: true,
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.cardArea}>
          <Carousel className={classes.carousel}>
            {props.foundProduct.productImage.map((imageUrl, i) => (
              <div key={i}>
                <img src={imageUrl} alt="Product Image" className={classes.image} />
              </div>
            ))}
          </Carousel>
          <div className={classes.content}>
            <div className={props.foundProduct.productName.length > 17 ? classes.div1 : classes.div4}>
              <span className={classes.word}>Food:</span>
              {props.foundProduct.productName}
            </div>
            <div className={props.foundProduct.productName.length > 17 ? classes.div2 : classes.div5}>
              <span className={classes.word}>Price:</span>${props.foundProduct.productPrice} {props.foundProduct.productPrice < 8 ? "/ Piece" : ""}
            </div>
            <div className={props.foundProduct.productName.length > 17 ? classes.div3 : classes.div6}>
              <span className={classes.word}>Region:</span>
              <img
                src={icons.find((element) => element.includes(props.foundProduct.productCategory.replace(/ /g, "")))}
                alt=""
                width={60}
                height={35}
                className={classes.countryIcon}
              />
            </div>
            <div className={classes.description}>{props.foundProduct.productDescription}</div>
            <FormGroup sx={{ my: 1 }}>
              <FormControlLabel control={<Switch onChange={onHandleRequest} />} label="Add Special Request" />
              {request ? <TextArea rows={6} onChange={(event) => setRequestContent(event.target.value)} /> : ""}
            </FormGroup>
            <br />
            <br />
            {session.data?.role === "admin" ? (
              <Fragment>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    dispatch(addToCart(productWithNotes));
                    setRequestContent("");
                  }}
                  className={classes.cartButton1}
                >
                  Cart
                </Button>
                <Button href={"/products/" + props.foundProduct._id + "/editProduct"} className={classes.editButton1}>
                  Edit
                </Button>
                <Button onClick={onDeleteProduct} className={classes.deleteButton1}>
                  Delete
                </Button>
                <Button href={"/products"} className={classes.backButton1}>
                  Back
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    dispatch(addToCart(productWithNotes));
                    setRequestContent("");
                  }}
                  className={classes.cartButton2}
                >
                  Cart
                </Button>
                <Button href={"/products"} className={classes.backButton2}>
                  Go Back
                </Button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
