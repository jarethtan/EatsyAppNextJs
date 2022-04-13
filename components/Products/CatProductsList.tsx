import React from "react";
import classes from "./GetAllProducts.module.css";
import ProductModel from "../../models/productModelClass";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart";
import { CardContent, CardMedia, Button, Typography, Card, CardActionArea, Grid } from "@mui/material";
import { icons } from "../../public/CountryIcons";

const CatProductsList: React.FC<{ productsInCat: ProductModel[] }> = (props) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Grid container justifyContent="center">
        {props.productsInCat
          .sort((a, b) => a.productName.localeCompare(b.productName))
          .map((product) => (
            <Grid key={product._id} item xs={4} sm={3} md={4} lg={3}>
              <Card className={classes.card}>
                <CardActionArea disableRipple={true} component="div" sx={{ cursor: "auto" }}>
                  <CardMedia component="img" image={product.productImage[0]} alt={product.productName} className={classes.productImage} />
                  <CardContent className={classes.cardContent}>
                    <Typography noWrap variant="h5" component="div" className={classes.productName}>
                      {product.productName}
                    </Typography>
                    <div className={classes.countryIconButton}>
                      <img src={icons.find((element) => element.includes(product.productCategory.replace(/ /g, "")))} alt="" className={classes.countryImage} />
                    </div>
                    <Typography noWrap variant="body2" color="text.secondary" className={classes.description}>
                      {product.productDescription}
                      <br />
                      <br />
                      <br />
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className={classes.price}>
                      ${product.productPrice}
                    </Typography>
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        dispatch(addToCart(product));
                      }}
                      className={classes.cartButton}
                    >
                      Add to Cart
                    </Button>
                    <Button href={"/products/" + product._id} className={classes.detailsButton}>
                      Details
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default CatProductsList;
