import React, { Fragment } from "react";
import RegisterForm from "../../components/RegisterLogin/RegisterForm";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

const UserRegister = () => {
  return (
    <Fragment>
      <RegisterForm />
    </Fragment>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    // prevent user from going back to login page to login again  by redirecting them back to home page if there is a session. will only be done if user manually key in login in URL.
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
};

export default UserRegister;
