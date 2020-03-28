import React, { useEffect } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";

import Timer from "../../components/Timer";
import createConnection from "../../helpers/connection";

const Wrapper = tw.div`
  flex
  flex-col
  p-4
`;

const Row = tw.div`
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

const Cast = () => {
  const {
    query: { p1, p2, p1name, p2name }
  } = useRouter();

  if (!p1 || !p2) {
    return <div>Please set p1 and p2 in the URL.</div>;
  }

  var c1 = createConnection(p1);
  var c2 = createConnection(p2);

  useEffect(() => {
    c1.videosContainer = document.getElementById("player1");
    c2.videosContainer = document.getElementById("player2");
  });

  return (
    <Wrapper>
      <div>
        <Timer />
      </div>
      <Row>
        <Col>
          <Title>{p1name || "Player 1"}</Title>
          <div id="player1"></div>
        </Col>
        <Col>
          <Title>{p2name || "Player 2"}</Title>
          <div id="player2"></div>
        </Col>
      </Row>
    </Wrapper>
  );
};
export default Cast;
