import React, { useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import screenshare from "../../helpers/screenshare";
import getStream from "../../helpers/stream";

const Wrapper = tw.div`
  flex
  flex-col
  justify-center
  items-center
`;

const Card = tw.div`
  my-32
  p-4
  rounded
  border
  border-white
  hover:bg-white
  hover:text-wikiwars-blue
  text-3xl
  uppercase
  cursor-pointer
`;

const Row = tw.div`
  flex
  flex-col
  md:flex-row
  justify-center
`;

const Col = tw.div`
  w-1
  md:w-1/4
  m-12
`;

const Title = tw.h2`
  text-3xl
`;

const randomPlayerId = uuidv4();

const Share = () => {
  const [copied, setCopied] = useState(false);
  const {
    query: { id }
  } = useRouter();

  const playerId = id || randomPlayerId;

  return (
    <Wrapper>
      <Card
        onClick={() => getStream("screen", screenshare(playerId))}
        tw="mb-4"
      >
        <p>Share your Screen</p>
      </Card>
      <Card
        onClick={() => getStream("webcam", screenshare(`${playerId}-cam`))}
        tw="mt-4 text-xl"
      >
        <p>Share your Webcam</p>
      </Card>
      <Row>
        <Col>
          <Title>What's this ?</Title>
          <p>You have been invited yo play Wikiwars!</p>
          <p>
            By clicking on the button above, you will share your screen and/or
            your webcam with the game masters using peer-2-peer technology (your
            video won't hit our servers).
          </p>
        </Col>
        <Col>
          <Title>How to...</Title>
          <p>
            For a better experience, we recommend using Google Chrome and
            sharing only one Tab (the one you use for Wikipedia!). When using
            Firefox or Safari, simply share your browser window.
          </p>
        </Col>
        <Col>
          <Title>One more thing!</Title>
          <p>
            Before you start :
            <ul tw="text-left ml-20 list-disc">
              <li>Zoom in your page (125-150% is great)</li>
              <li>Use headphones if you can</li>
            </ul>
          </p>
        </Col>
      </Row>

      <p tw="mt-4">
        Your player id is :&nbsp;
        <CopyToClipboard
          tw="p-2 cursor-pointer hover:bg-white hover:text-wikiwars-blue"
          text={playerId}
          onCopy={() => setCopied(true)}
        >
          <span>
            {playerId}
            <FontAwesomeIcon tw="ml-2" icon={faCopy} />
          </span>
        </CopyToClipboard>
      </p>
    </Wrapper>
  );
};

export default Share;
