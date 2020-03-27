import React from "react";
import Head from "next/head";
import tw from "twin.macro";
import { useRouter } from "next/router";
import { config } from "@fortawesome/fontawesome-svg-core";
import Konami from "react-konami-code";

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
        <meta
          name="keywords"
          content="Wikiwars,Wikipedia,Events,Paris,France"
        />
        <meta
          name="description"
          content="Des événements décalés, fun et compétitifs sur... Wikipédia!"
        />
        <meta name="author" content="Wikiwars" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Wikiwars" />
        <meta
          name="twitter:description"
          content="Des événements décalés, fun et compétitifs sur... Wikipédia!"
        />
        <meta name="twitter:site" content="@wikiwarsgg" />
        <meta name="og:title" content="Wikiwars" />
        <meta
          name="og:description"
          content="Des événements décalés, fun et compétitifs sur... Wikipédia!"
        />
        <meta name="og:url" content="https://wikiwars.gg" />
        <meta name="og:site_name" content="Wikiwars" />
        <meta name="og:locale" content="fr_FR" />
        <meta name="fb:app_id" content="365853070100963" />
        <meta name="og:type" content="website" />
        <script src="https://cdn.jsdelivr.net/npm/socket.io-client@2/dist/socket.io.js" />
      </Head>
      {shouldUseLayout(pathname) && <Header />}
      <Content>
        <Component {...pageProps} />
      </Content>
      {shouldUseLayout(pathname) && <Footer />}
      <Konami action={() => alert("Nice Job!")} />
    </Wrapper>
  );
};

export default App;
