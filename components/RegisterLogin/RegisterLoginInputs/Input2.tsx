import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Input from "../../../ui/Input";

const Input2 = () => {
  const { asPath } = useRouter();
  return (
    <Fragment>
      <Input names="userName" type="text" label="User Name" pageType="register" multiLines={false} disable={false} />
      <Input names="password" type="password" label="Password" pageType="register" multiLines={false} disable={false} />
      {asPath === "/personnel/userRegister" ? (
        <>
          <Input names="confirmPassword" type="password" label="Confirm Password" pageType="register" multiLines={false} disable={false} />
        </>
      ) : (
        ""
      )}
      <Input names="role" type="text" label="Role" pageType="register" multiLines={false} disable={true} />
    </Fragment>
  );
};

export default Input2;
