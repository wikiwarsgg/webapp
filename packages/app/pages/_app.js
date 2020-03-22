import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js" />
      </Head>

      <Component {...pageProps} />
    </div>
  );
};

export default App;
