import React from "react";
import { useRouter } from "next/router";

import screenshare from "../helpers/screenshare";

const getScreenStream = callback => {
  var displayMediaStreamConstraints = {
    video: true // currently you need to set {true} on Chrome
  };

  if (navigator.mediaDevices.getDisplayMedia) {
    navigator.mediaDevices
      .getDisplayMedia(displayMediaStreamConstraints)
      .then(callback)
      .catch(callback);
  } else {
    navigator
      .getDisplayMedia(displayMediaStreamConstraints)
      .then(callback)
      .catch(callback);
  }
};

const Home = () => {
  const { query } = useRouter();

  return (
    <div className="container">
      <main>
        <a onClick={() => getScreenStream(screenshare(query.player))}>
          <h3>Share your screen &rarr;</h3>
          <p>To start a wikiwars session.</p>
        </a>
      </main>
    </div>
  );
};

export default Home;
