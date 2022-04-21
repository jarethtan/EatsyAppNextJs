import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./MovingCarousel.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart";
import { Typography, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarRateIcon from "@mui/icons-material/StarRate";

const MovingCarousel: React.FC<{ accumOrderForEachProduct: [] }> = (props) => {
  const dispatch = useDispatch();
  const sortProductByQuantity = props.accumOrderForEachProduct.sort((a, b) => (a[0] < b[0] ? 1 : -1));

  const sliderSettings = {
    slidesToShow: 5,
    infinite: true,
    autoplay: true,
    speed: 2200,
    autoplaySpeed: 2200,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className={classes.content}>
      <Typography className={classes.title1}>EATSY FOOD</Typography>
      <Typography className={classes.title2}>TOP 8 POPULAR DISHES</Typography>
      <Slider {...sliderSettings}>
        {sortProductByQuantity.slice(0, 8).map((product, i) => (
          <div key={i} className={classes.card}>
            <img alt={product[1]} src={product[2][0]} className={classes.cardImage} />
            <span className={classes.mealPosition}>{i + 1}</span>
            <StarRateIcon className={classes.starIcon} />
            <Typography noWrap className={classes.cardHeader}>
              {product[1]}
            </Typography>
            <br />
            <br />
            <br />
            <Button href={"/products/" + product[4]} className={classes.buttonDetails}>
              <VisibilityIcon className={classes.carouIcon} />
            </Button>
            <Button
              className={classes.buttonCart}
              onClick={(event) =>
                dispatch(
                  addToCart({
                    _id: product[4],
                    productImage: product[2],
                    productName: product[1],
                    productCategory: product[5],
                    productPrice: product[3],
                    productDescription: product[6],
                    productNote: product[7],
                  })
                )
              }
            >
              <AddShoppingCartIcon className={classes.carouIcon} />
            </Button>
            <span className={classes.spanPrice}>${product[3]}</span>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default MovingCarousel;
