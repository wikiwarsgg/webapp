import React from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";

import screenshare from "../helpers/screenshare";

const Wrapper = tw.div`
  flex
  flex-col
  justify-center
  items-center
`;

const Card = tw.div`
  mt-32
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

const Home = () => {
  const {
    query: { player }
  } = useRouter();

  return (
    <Wrapper>
      <Card onClick={() => getScreenStream(screenshare(player))}>
        <p>Share your screen</p>
      </Card>
    </Wrapper>
  );
};

export default Home;
