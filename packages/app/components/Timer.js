import React, { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import styled from "@emotion/styled/macro";
import tw from "twin.macro";

const Button = styled.button`
  ${tw`
    p-2
    m-2
    rounded
    border
    border-white
    uppercase`}

  ${(props) =>
    props.color == "success" && tw`border-wikiwars-blue bg-green-500`}
  ${(props) =>
    props.color == "warning" && tw`border-wikiwars-blue bg-orange-500`}
`;

const Controls = tw.span`
  m-2
  cursor-pointer
`;

const Time = tw.span`
align-middle
text-4xl
`;

const Completed = () => <span>GAME OVER!</span>;

const renderer = ({ minutes, seconds, completed, api }) => {
  if (completed) {
    return <Completed />;
  } else {
    return (
      <span>
        <span>
          {api.isPaused() ? (
            <Button color={"success"} onClick={() => api.start()}>
              Start
            </Button>
          ) : (
            <Button color={"warning"} onClick={() => api.pause()}>
              Pause
            </Button>
          )}
        </span>
        <div>
          <Time>
            {zeroPad(minutes)}:{zeroPad(seconds)}
          </Time>
        </div>
      </span>
    );
  }
};

const Timer = () => {
  const [key, setKey] = useState(0);

  return (
    <div>
      <Button onClick={() => setKey(key + 1)}>Reset</Button>
      <Countdown
        key={key}
        date={Date.now() + 1000 * 60 * 5}
        renderer={renderer}
        autoStart={false}
      />
    </div>
  );
};

export default Timer;
