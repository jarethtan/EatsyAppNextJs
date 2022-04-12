import { useDispatch } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity } from "../../redux/cart";
import ProductModel from "../../models/productModelClass";
import classes from "./ProductCartList.module.css";

const ProductCartList: React.FC<{ cart: ProductModel[] }> = (props) => {
  const dispatch = useDispatch();

  const totalPrice = props.cart.reduce((accumulator: number, product: ProductModel) => accumulator + product.quantity * product.productPrice, 0);

  return (
    <>
      {props.cart === undefined ? (
        <p>Loading Cart...</p>
      ) : (
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.imageTitle}>Image</div>
            <div>Dish</div>
            <div className={classes.priceTitle}>Price</div>
            <div className={classes.requestTitle}>Request</div>
            <div>Actions</div>
            <div>Total</div>
          </div>
          {props.cart.map((product: ProductModel) => (
            <div className={classes.body} key={product._id}>
              <a href={`/products/${product._id}`} className={classes.imageLink}>
                <img src={product.productImage[0]} className={classes.image} />
              </a>
              <p>
                <a href={`/products/${product._id}`}>{product.productName}</a>
              </p>
              <p className={classes.priceInfo}>${product.productPrice}</p>
              <p className={classes.requestInfo}>{product.productNote}</p>
              <div className={classes.buttons}>
                <button onClick={() => dispatch(incrementQuantity(product))}>+</button>
                <button onClick={() => dispatch(decrementQuantity(product))}>-</button>
                <button onClick={() => dispatch(removeFromCart(product))}>x</button>
              </div>
              <p>
                ${product.productPrice} x {product.quantity}
              </p>
            </div>
          ))}
          <h2 className={classes.finalPrice}>Grand Total: $ {totalPrice}</h2>
        </div>
      )}
    </>
  );
};

export default ProductCartList;
