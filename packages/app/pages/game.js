import React, { useEffect } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";

import createConnection from "../helpers/connection";

const Wrapper = tw.div`
  flex
  flex-row
  p-4
`;

const Col = tw.div`
  m-4
`;

const Game = () => {
  const { query } = useRouter();
  var c1 = createConnection(query.p1);
  var c2 = createConnection(query.p2);

  useEffect(() => {
    c1.videosContainer = document.getElementById("player1");
    c2.videosContainer = document.getElementById("player2");
  });

  return (
    <Wrapper>
      <Col>
        <p>Player 1</p>
        <div id="player1"></div>
      </Col>
      <Col>
        <p>Player 2</p>
        <div id="player2"></div>
      </Col>
    </Wrapper>
  );
};
export default Game;
