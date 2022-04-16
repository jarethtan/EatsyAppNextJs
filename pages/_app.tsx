import React from "react";
import store from "../redux/store";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import Footer from "../components/Layout/Footer";
import NavBar from "../components/Layout/NavBar";
import { Fragment } from "react";
import { Alert } from "../ui/Alert";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta name="description" content="Eatsy Food App" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"></link>
        <link rel="shortcut icon" href="/favicon/EatsyIcon.ico"></link>
      </Head>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <div className="wrapperMain">
            <div className="wrapperContent">
              <NavBar />
              <Alert />
              <NextNProgress color="rgb(16, 80, 16)" />
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </SessionProvider>
      </Provider>
    </Fragment>
  );
}

export default MyApp;
