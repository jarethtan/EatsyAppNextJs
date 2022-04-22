import React from "react";
import AboutUsSection from "../components/AboutUs/AboutUs";
import Head from "next/head";

const AboutUs = () => {
  return (
    <div>
      <Head>
        <title>About Eatsy</title>
        <meta name="description" content="About Eatsy Page" />
      </Head>
      <AboutUsSection />
    </div>
  );
};

export default AboutUs;
