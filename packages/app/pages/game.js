import React, { useEffect } from "react";
import { useRouter } from "next/router";

import createConnection from "../helpers/connection";

const Game = () => {
  const { query } = useRouter();
  var c1 = createConnection(query.p1);
  var c2 = createConnection(query.p2);

  useEffect(() => {
    c1.videosContainer = document.getElementById("player1");
    c2.videosContainer = document.getElementById("player2");
  });

  return (
    <div>
      <style jsx global>
        {`
          #game {
            display: flex;
            flex-direction: row;
          }
          video {
            width: 100% !important;
            height: auto !important;
          }
        `}
      </style>

      <div id="game">
        <div id="player1" />
        <div id="player2" />
      </div>
    </div>
  );
};
export default Game;
