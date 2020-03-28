import React, { useEffect } from "react";
import { useRouter } from "next/router";

import createConnection from "../../helpers/connection";

const Video = () => {
  const {
    query: { player }
  } = useRouter();

  if (!player) {
    return <div>Please set player in the URL.</div>;
  }

  const conn = createConnection(player);

  useEffect(() => {
    conn.videosContainer = document.getElementById("player1");
  });

  return (
    <div>
      <div id="player1"></div>
    </div>
  );
};

export default Video;
