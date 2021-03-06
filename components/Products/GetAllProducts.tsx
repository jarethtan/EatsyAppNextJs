import React, { useEffect, useState } from "react";
import classes from "./GetAllProducts.module.css";
import ProductModel from "../../models/productModelClass";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart";
import { clearSearchState } from "../../redux/search";
import { Grid } from "@mui/material";
import { icons } from "../../public/CountryIcons";
import { useSelector } from "react-redux";

const GetAllProducts: React.FC<{ allProducts: ProductModel[] }> = (props) => {
  const [searchResult, setSearchResult] = useState<ProductModel[] | null>(null);
  useEffect(() => {
    const btnScrollUp: any = document.querySelector("#btnScrollUp");

    btnScrollUp.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
    window.addEventListener("scroll", (e) => {
      btnScrollUp.style.display = window.scrollY > 100 ? "block" : "none";
    });
  }, []); // useEffect for btnScrollUp. At the top of the page, it will hide itself.

  const dispatch = useDispatch();
  const searchData = useSelector((state: any) => state.search);

  if (searchData.length !== 0) {
    // search data is the state pulled from redux. It contains the field of search results. dont get confuse with searchArray is the product array extracted from searchData.
    if (searchData[0].fieldSelect !== "productPrice") {
      const searchArray = props.allProducts.filter((product: any) =>
        product[searchData[0].fieldSelect].toLowerCase().includes(searchData[0].fieldParameter.toLowerCase())
      );
      dispatch(clearSearchState(searchData[0]));
      if (searchArray.length > 0) setSearchResult(searchArray);
      else setSearchResult([]);
    } else {
      if (searchData[0].greaterOrLessThanPrice === "greaterThan") {
        const searchArray = props.allProducts.filter((product: any) => product[searchData[0].fieldSelect] > searchData[0].fieldParameter);
        dispatch(clearSearchState(searchData[0]));
        if (searchArray.length > 0) setSearchResult(searchArray);
        else setSearchResult([]);
      } else if (searchData[0].greaterOrLessThanPrice === "lesserThan") {
        const searchArray = props.allProducts.filter((product: any) => product[searchData[0].fieldSelect] < searchData[0].fieldParameter);
        dispatch(clearSearchState(searchData[0]));
        if (searchArray.length > 0) setSearchResult(searchArray);
        else setSearchResult([]);
      } else {
        const searchArray = props.allProducts.filter((product: any) => product[searchData[0].fieldSelect] == searchData[0].fieldParameter);
        dispatch(clearSearchState(searchData[0]));
        if (searchArray.length > 0) setSearchResult(searchArray);
        else setSearchResult([]);
      }
    }
  } // this whole block of code is the  search logic to filter the menu base on search parameters.

  const Products: ProductModel[] = searchResult !== null ? searchResult : props.allProducts;

  return (
    <div className={classes.container}>
      {searchResult !== null && searchResult.length === 0 ? (
        <h3 className={classes.searchMessage}>We are sorry. There are no matching results generated for your search request.</h3>
      ) : (
        ""
      )}
      <button id="btnScrollUp">
        <ArrowUpwardIcon fontSize="large" />
      </button>
      {searchResult !== null ? (
        <button onClick={() => setSearchResult(null)} className={classes.clearSearchBtn}>
          Clear Search
        </button>
      ) : (
        ""
      )}
      <div className={classes.flexContainer}>
        {Products.sort((a, b) => a.productName.localeCompare(b.productName)).map((product) => (
          <div key={product._id}>
            <div className={classes.card}>
              <div className={classes.cardArea}>
                <img src={product.productImage[0]} alt={product.productName} className={classes.productImage} />
                <div className={classes.cardContent}>
                  <div className={classes.productName}>{product.productName}</div>
                  <div className={classes.countryIconButton}>
                    <img src={icons.find((element) => element.includes(product.productCategory.replace(/ /g, "")))} alt="" className={classes.countryImage} />
                  </div>
                  <span className={classes.description}>
                    {product.productDescription}
                    <br />
                    <br />
                    <br />
                  </span>
                  <span className={classes.price}>${product.productPrice}</span>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      dispatch(addToCart(product));
                    }}
                    className={classes.cartButton}
                  >
                    Add to Cart
                  </button>
                  <Link href={"/products/" + product._id}>
                    <a className={classes.detailsButton}>Details</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllProducts;
