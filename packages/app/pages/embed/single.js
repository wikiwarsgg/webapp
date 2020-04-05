import React, { useEffect } from "react";
import { useRouter } from "next/router";

import createConnection from "../../helpers/connection";

const Video = () => {
  const {
    query: { id }
  } = useRouter();

  if (!id) {
    return <div>Please set id in the URL.</div>;
  }

  const conn = createConnection(id);

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
