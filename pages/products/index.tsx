import React from "react";
import { GetServerSideProps } from "next";
import GetAllProducts from "../../components/Products/GetAllProducts";
import IconBox from "../../components/IconBox/IconBox";
import Error from "next/error";
import ProductModel from "../../models/productModelClass";
import Head from "next/head";
import getAllProduct from "../../lib/helpers/productHelpers/getAllProduct";

const ShowAllProducts: React.FC<{ allProducts: ProductModel[]; status: number; message: string }> = (props) => {
  if (props.status > 300) {
    return <Error statusCode={props.status} title={props.message} />;
  }
  return (
    <div>
      <Head>
        <title>All Product Page</title>
        <meta name="description" content="Showing whole menu for Eatsy Food App" />
      </Head>
      <h1 className="pageHeader">Eatsy Menu</h1>
      <IconBox />
      <GetAllProducts allProducts={props.allProducts} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { body: allProducts, message, status } = await getAllProduct();
  return {
    props: { allProducts, status, message },
  };
}; // need to grab from database all the products and put logic in here to render all product before page loads up.

export default ShowAllProducts;
