import React from "react";
import Countdown, { zeroPad } from "react-countdown";

const Completed = () => <span>GAME OVER!</span>;

// Renderer callback with condition
const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <Completed />;
  } else {
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  }
};

export default React.forwardRef(() => (
  <Countdown date={Date.now() + 1000 * 60 * 5} renderer={renderer} />
));
