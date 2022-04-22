import React from "react";
import getOneUser from "../lib/helpers/userHelpers/getOneUser";
import Head from "next/head";
import Error from "next/error";
import UserProfile from "../components/Profile/UserProfile";
import { getSession } from "next-auth/react";

const Profile: React.FC<{ userProfile: object; status: number; message: string }> = (props) => {
  if (props.status > 300) {
    return <Error statusCode={props.status} title={props.message} />;
  }
  return (
    <div>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="User Profile Page" />
      </Head>
      <UserProfile userProfile={props.userProfile} />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session: any = await getSession(context);
  if (session === null || session.role === "admin" || !!Number(session.id) === true) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const { body: userProfile, status, message } = await getOneUser(session?.id);

  return {
    props: { userProfile, status, message },
  };
}

export default Profile;
