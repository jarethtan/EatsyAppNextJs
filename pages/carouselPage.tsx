import React from "react";
import ProductModel from "../models/productModelClass";
import { GetStaticProps } from "next";
import CarouselForm from "../components/Carousel/CarouselForm";
import getAllProduct from "../lib/helpers/productHelpers/getAllProduct";

const carouselPage: React.FC<{ allProducts: ProductModel[] }> = (props) => {
  return <CarouselForm allProducts={props.allProducts} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const { body: allProducts } = await getAllProduct();
  return {
    props: { allProducts },
  };
}; // need to grab from database all the products and put logic in here to render all product before page loads up.

export default carouselPage;
