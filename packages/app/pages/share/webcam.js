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

const randomPlayerId = uuidv4();

const Cam = () => {
  const [copied, setCopied] = useState(false);
  const {
    query: { player }
  } = useRouter();

  const playerId = player || randomPlayerId;

  return (
    <Wrapper>
      <Card onClick={() => getStream("webcam", screenshare(playerId))}>
        <p>Share your Webcam</p>
      </Card>
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

export default Cam;
