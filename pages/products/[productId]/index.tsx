import React, { Fragment } from "react";
import ProductDetails from "../../../components/Products/ProductDetails";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import ProductModel from "../../../models/productModelClass";
import Error from "next/error";
import getAllProduct from "../../../lib/helpers/productHelpers/getAllProduct";
import getOneProduct from "../../../lib/helpers/productHelpers/getOneProduct";

const Product: React.FC<{ foundProduct: ProductModel; status: number; message: string }> = (props) => {
  console.log(props.message);
  if (props.status > 300) {
    return <Error statusCode={props.status} title={props.message} />; // generate error page. Error page is used instead of alert because if product is not generated, it will be directed to an error page. In the edit/create/delete page, we will use alert to notify the user cause we dont want to redirect in an error case so the user is able to change any input if necessary.
  }
  return (
    <Fragment>
      <Head>
        <title>{props.foundProduct.productName}</title>
        <meta name="description" content="Product details in React E-Shop" />
      </Head>
      <ProductDetails foundProduct={props.foundProduct} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  try {
    const { body } = await getAllProduct();
    const allProducts = body;
    return {
      fallback: false,
      paths: allProducts.map((product: any) => ({
        // will return an array of objects with params to make the page rendering dynamic
        params: { productId: product._id.toString() }, // it will come in ObjectId(id) format. we need to string to convert it to a string
      })),
    };
  } catch (e) {
    console.log("Error occured when retrieving all product details to create unqie category array", e);
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { productId } = context.params!; // ! is non null assertion to tell typescript that there indeed is a value
  const response = await getOneProduct(productId as string);
  const { message, body: foundProduct, status } = response;
  return {
    props: { foundProduct, message, status },
  };
};

export default Product;
