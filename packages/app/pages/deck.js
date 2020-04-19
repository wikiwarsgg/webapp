import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();
obs.on("error", (err) => {
  console.error("socket error:", err);
});
obs.connect();

const Button = tw.div`
  my-4
  p-2
  rounded
  border
  border-white
  hover:bg-white
  hover:text-wikiwars-blue
  uppercase
  cursor-pointer
`;

const Deck = () => {
  useEffect(() => {
    const init = async () => {
      try {
        await getSources();
      } catch (e) {
        console.error(e);
      }
    };
    init();
  }, []);
  const [player1, setplayer1] = useState("");
  const [player2, setplayer2] = useState("");

  const getSources = async () => {
    const {
      sourceSettings: { text: sourcePlayer1 },
    } = await obs.send("GetSourceSettings", {
      sourceName: "PLAYER 1",
    });
    setplayer1(sourcePlayer1);
    const {
      sourceSettings: { text: sourcePlayer2 },
    } = await obs.send("GetSourceSettings", {
      sourceName: "PLAYER 2",
    });
    setplayer2(sourcePlayer2);
  };

  const setSources = async () => {
    try {
      await obs.send("SetSourceSettings", {
        sourceName: "PLAYER 1",
        sourceSettings: { text: player1 },
      });
      await obs.send("SetSourceSettings", {
        sourceName: "PLAYER 2",
        sourceSettings: { text: player2 },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div tw="w-5/6 mx-auto flex flex-row">
        <div tw="w-1/6 px-2">
          <div tw="mb-4">
            <label tw="block text-sm font-bold mb-2" htmlFor="player1">
              Player 1
            </label>
            <input
              tw="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="player1"
              type="text"
              placeholder=""
              value={player1}
              onChange={(e) => setplayer1(e.target.value)}
            />
          </div>
          <div tw="mb-4">
            <label tw="block text-sm font-bold mb-2" htmlFor="player2">
              Player 2
            </label>
            <input
              tw="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="player2"
              type="text"
              placeholder=""
              value={player2}
              onChange={(e) => setplayer2(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div tw="w-full max-w-xs mx-auto">
        <div>
          <Button onClick={setSources}>SET</Button>
        </div>
      </div>
    </>
  );
};

export default Deck;
