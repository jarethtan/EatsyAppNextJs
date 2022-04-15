import React, { useEffect } from "react";
import store from "../redux/store";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import Footer from "../components/Layout/Footer";
import NavBar from "../components/Layout/NavBar";
import createEmotionCache from "../utility/emotion";
import { StylesProvider } from "@material-ui/core/styles";
import { Fragment } from "react";
import { Alert } from "../ui/Alert";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } }) {
  return (
    <Fragment>
      <Head>
        <meta name="description" content="Eatsy Food App" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"></link>
        <link rel="shortcut icon" href="/favicon/EatsyIcon.ico"></link>
      </Head>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <SessionProvider session={pageProps.session}>
            <div className="wrapperMain">
              <div className="wrapperContent">
                <StylesProvider injectFirst>
                  <NavBar />
                  <Alert />
                  <NextNProgress color="rgb(16, 80, 16)" />
                  <CssBaseline />
                  <Component {...pageProps} />
                </StylesProvider>
              </div>
              <Footer />
            </div>
          </SessionProvider>
        </CacheProvider>
      </Provider>
    </Fragment>
  );
}

export default MyApp;
