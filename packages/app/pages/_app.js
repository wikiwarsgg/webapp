import React from "react";
import Head from "next/head";
import tw from "twin.macro";
import { useRouter } from "next/router";
import { config } from "@fortawesome/fontawesome-svg-core";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "tailwindcss/dist/base.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

import "../styles.css";

const Wrapper = tw.div`
  flex
  flex-col
  bg-wikiwars-blue
  mx-auto
  min-h-screen
  text-center
  text-white
`;

const Content = tw.main`
  flex-1
`;

const shouldUseLayout = pathname => {
  const pagesWithoutLayout = ["/cast/single"];
  return !pagesWithoutLayout.includes(pathname);
};

const App = ({ Component, pageProps }) => {
  const { pathname } = useRouter();

  return (
    <Wrapper>
      <Head>
        <title>Play Wikiwars!</title>
        <link rel="icon" href="/favicon.png" />
        <script src="https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js" />
      </Head>
      {shouldUseLayout(pathname) && <Header />}
      <Content>
        <Component {...pageProps} />
      </Content>
      {shouldUseLayout(pathname) && <Footer />}
    </Wrapper>
  );
};

export default App;
