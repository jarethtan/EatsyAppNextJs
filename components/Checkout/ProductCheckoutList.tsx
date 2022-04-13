import { Fragment } from "react";
import ProductModel from "../../models/productModelClass";
import classes from "./ProductCheckoutList.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

const ProductCheckoutList: React.FC<{ cart: ProductModel[] }> = (props) => {
  return (
    <Fragment>
      {props.cart === undefined ? (
        <p>Loading Cart...</p>
      ) : (
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.imageTitle}>Image</div>
            <div>Dish</div>
            <div className={classes.priceTitle}>Price</div>
            <div className={classes.requestTitle}>Request</div>
            <div>Total</div>
          </div>
          {props.cart.map((product: ProductModel) => (
            <div className={classes.body} key={product._id}>
              <div className={classes.imageDiv}>
                <img src={product.productImage[0]} height="80" width="80" alt="" className={classes.image} />
              </div>
              <p>{product.productName}</p>
              <p className={classes.priceInfo}>$ {product.productPrice}</p>
              <p className={classes.requestInfo}>{product.productNote}</p>
              <p>
                ${product.productPrice} x {product.quantity}
              </p>
            </div>
          ))}
          <Button disableRipple className={classes.backCartButton} href="/cartPage" startIcon={<ArrowBackIcon />}>
            back to Cart
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default ProductCheckoutList;
