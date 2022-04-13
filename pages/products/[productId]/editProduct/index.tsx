import AddEditProductForm from "../../../../components/Products/AddEditProductForm";
import React, { Fragment } from "react";
import { GetServerSideProps } from "next";
import ProductModel from "../../../../models/productModelClass";
import Error from "next/error";
import { useSession, getSession } from "next-auth/react";
import getOneProduct from "../../../../lib/helpers/productHelpers/getOneProduct";

const EditProduct: React.FC<{ status: number; message: string; foundProductForEdit: ProductModel }> = (props) => {
  const session = useSession();
  if (props.status > 300) {
    return <Error statusCode={props.status} title={props.message} />; // generate error page. Error page is used instead of alert because if product is not generated, it will be directed to an error page. In the edit/create/delete page, we will use alert to notify the user cause we dont want to redirect in an error case so the user is able to change any input if necessary.
  }
  return (
    <Fragment>
      {session.data?.role === "admin" ? (
        <AddEditProductForm foundProductForEdit={props.foundProductForEdit} />
      ) : (
        <h2>Access denied. Only adminstrator is able to visit this page.</h2>
      )}
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { req } = context;
  const session = await getSession({ req });
  if (session?.role !== "admin") {
    // prevent user from going to addproduct page if session.role is NOT admin. can only be done if user manually key in login in URL.
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const { productId } = context.params!; // ! is non null assertion to tell typescript that there indeed is a value
  const response = await getOneProduct(productId as string);
  const { message, body: foundProductForEdit, status } = response;
  return {
    props: { foundProductForEdit, message, status },
  };
};

export default EditProduct;
