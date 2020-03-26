import React, { useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import screenshare from "../helpers/screenshare";

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

const randomPlayerId = uuidv4();

const Player = () => {
  const [copied, setCopied] = useState(false);
  const {
    query: { player }
  } = useRouter();

  const playerId = player || randomPlayerId;

  return (
    <Wrapper>
      <Card onClick={() => getScreenStream(screenshare(playerId))}>
        <p>Share your screen</p>
      </Card>
      <Row>
        <Col>
          <Title>What's this ?</Title>
          <p>You have been invited yo play Wikiwars!</p>
          <p>
            By clicking on the button above, you will share your screen with the
            game masters using peer-2-peer technology (your video won't hit our
            servers, promise!).
          </p>
        </Col>
        <Col>
          <Title>How To ?</Title>
          <p>
            For a better experience, we recommend using Google Chrome and
            sharing only one Tab (the one you use for Wikipedia!). When using
            Firefox or Safari, simply share your browser window.
          </p>
        </Col>
        <Col>
          <Title>Say Hello!</Title>
          <p>
            This app is in early development stage. We'd love to hear your
            feedback -- and we are happy to help if you encounter an issue !
          </p>
        </Col>
      </Row>

      <p tw="mt-4">
        Your player id is :
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

export default Player;
