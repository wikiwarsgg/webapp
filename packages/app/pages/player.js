import React from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import { v4 as uuidv4 } from "uuid";

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
  w-1/3
  text-3xl
  uppercase
  cursor-pointer
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

const Player = () => {
  const {
    query: { player }
  } = useRouter();

  const playerId = player || uuidv4();

  return (
    <Wrapper>
      <Card onClick={() => getScreenStream(screenshare(playerId))}>
        <p>Share your screen</p>
      </Card>
      <p>Your player id is : {playerId}</p>
    </Wrapper>
  );
};

export default Player;
