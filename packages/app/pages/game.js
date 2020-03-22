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
  flex-1
  m-4
`;

const Title = tw.h2`
  text-3xl
`;

const Game = () => {
  const {
    query: { p1, p2 }
  } = useRouter();
  var c1 = createConnection(p1);
  var c2 = createConnection(p2);

  useEffect(() => {
    c1.videosContainer = document.getElementById("player1");
    c2.videosContainer = document.getElementById("player2");
  });

  return (
    <Wrapper>
      <Col>
        <Title>Player 1</Title>
        <div id="player1"></div>
      </Col>
      <Col>
        <Title>Player 2</Title>
        <div id="player2"></div>
      </Col>
    </Wrapper>
  );
};
export default Game;
