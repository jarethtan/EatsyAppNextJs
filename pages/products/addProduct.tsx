import React, { Fragment } from "react";
import AddEditProductForm from "../../components/Products/AddEditProductForm";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

const AddProduct = () => {
  const session = useSession();
  return (
    <Fragment>
      {session.data?.role === "admin" ? (
        <AddEditProductForm foundProductForEdit={null} />
      ) : (
        <h2>Access denied. Only adminstrator is able to visit this page.</h2>
      )}
    </Fragment>
  );
};

export async function getServerSideProps(context: any) {
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
  return {
    props: {},
  };
}

export default AddProduct;
