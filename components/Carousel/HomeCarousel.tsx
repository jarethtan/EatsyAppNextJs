import React from "react";
import Carousel from "react-material-ui-carousel";
import classes from "./HomeCarousel.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import ProductModel from "../../models/productModelClass";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart";
import { useSession } from "next-auth/react";

const HomeCarousel: React.FC<{ selectedCarousel: ProductModel[] }> = (props) => {
  const dispatch = useDispatch();
  const session = useSession();

  return (
    <>
      <Carousel
        className={classes.carousel}
        navButtonsAlwaysVisible
        navButtonsProps={{
          className: classes.carouNav,
          style: {
            backgroundColor: "rgb(255, 219, 88)",
            color: "brown",
            width: "3rem",
            height: "3rem",
            borderRadius: 0,
          },
        }}
        autoPlay={false}
      >
        <div>
          <img src="/eatsyIcons/EatsyCarouImage.jpeg" alt="eatsyCarouImage" className={classes.eatsyIcon} />
          <img src="/carousel/pieChart.png" alt="Carousel Image" className={classes.imagePrimary} />
          <span className={classes.titlePrimary2}>&quot;Fresh Ingredents&quot;</span>
          <span className={classes.titlePrimary3}>&quot;Affordable Prices&quot;</span>
          <span className={classes.titlePrimary4}>&quot;Quality Dishes&quot;</span>
          <Button href="/products" className={classes.titlePrimaryButton}>
            See our menu
          </Button>
        </div>
        {props.selectedCarousel.length > 0 && props.selectedCarousel[0] !== undefined ? (
          <div>
            <img src={props.selectedCarousel[0].productImage[0]} alt="Carousel Image" className={classes.imageSecondary} />
            <>
              <span className={classes.titleSecondary1}>This Month&apos;s Special</span>
              <span className={classes.titleSecondary2}>{props.selectedCarousel[0].productName}</span>
              <span className={classes.titleSecondary3}>${props.selectedCarousel[0].productPrice}</span>
              <Button
                onClick={() => dispatch(addToCart(props.selectedCarousel[0]))}
                href="/products"
                variant="contained"
                color="primary"
                className={classes.titleSecondaryButton}
              >
                Order Now!
              </Button>
            </>
          </div>
        ) : (
          ""
        )}
        {props.selectedCarousel.length > 0 && props.selectedCarousel[1] !== undefined ? (
          <div>
            <img src={props.selectedCarousel[1].productImage[0]} alt="Carousel Image" className={classes.imageSecondary} />
            <>
              <span className={classes.titleSecondary1}>This Month&apos;s Special</span>
              <span className={classes.titleSecondary2}>{props.selectedCarousel[1].productName}</span>
              <span className={classes.titleSecondary3}>${props.selectedCarousel[1].productPrice}</span>
              <Button
                onClick={() => dispatch(addToCart(props.selectedCarousel[1]))}
                href="/products"
                variant="contained"
                color="primary"
                className={classes.titleSecondaryButton}
              >
                Order Now!
              </Button>
            </>
          </div>
        ) : (
          ""
        )}
        {props.selectedCarousel.length > 0 && props.selectedCarousel[2] !== undefined ? (
          <div>
            <img src={props.selectedCarousel[2].productImage[0]} alt="Carousel Image" className={classes.imageSecondary} />
            <>
              <span className={classes.titleSecondary1}>This Month&apos;s Special</span>
              <span className={classes.titleSecondary2}>{props.selectedCarousel[2].productName}</span>
              <span className={classes.titleSecondary3}>${props.selectedCarousel[2].productPrice}</span>
              <Button
                onClick={() => dispatch(addToCart(props.selectedCarousel[2]))}
                href="/products"
                variant="contained"
                color="primary"
                className={classes.titleSecondaryButton}
              >
                Order Now!
              </Button>
            </>
          </div>
        ) : (
          ""
        )}
        {props.selectedCarousel.length > 0 && props.selectedCarousel[3] !== undefined ? (
          <div>
            <img src={props.selectedCarousel[3].productImage[0]} alt="Carousel Image" className={classes.imageSecondary} />
            <>
              <span className={classes.titleSecondary1}>This Month&apos;s Special</span>
              <span className={classes.titleSecondary2}>{props.selectedCarousel[3].productName}</span>
              <span className={classes.titleSecondary3}>${props.selectedCarousel[3].productPrice}</span>
              <Button
                onClick={() => dispatch(addToCart(props.selectedCarousel[3]))}
                href="/products"
                variant="contained"
                color="primary"
                className={classes.titleSecondaryButton}
              >
                Order Now!
              </Button>
            </>
          </div>
        ) : (
          ""
        )}
      </Carousel>
      {session.data?.role === "admin" ? (
        <button className={classes.selectCarouselSpan}>
          <Button href="/carouselPage" color="success" className={classes.selectCarouselButton}>
            Select Carousel To Display
          </Button>
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default HomeCarousel;
