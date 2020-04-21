import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();
obs.on("error", (err) => {
  console.error("socket error:", err);
});
obs.connect();

const Card = tw.div`
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
  const [score1, setscore1] = useState("");
  const [player2, setplayer2] = useState("");
  const [score2, setscore2] = useState("");
  const [depart, setdepart] = useState("");
  const [arrivee, setarrivee] = useState("");
  const [game, setGame] = useState("");

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

    const {
      sourceSettings: { text: sourceScore1 },
    } = await obs.send("GetSourceSettings", {
      sourceName: "SCORE 1",
    });
    setscore1(sourceScore1);
    const {
      sourceSettings: { text: sourceScore2 },
    } = await obs.send("GetSourceSettings", {
      sourceName: "SCORE 2",
    });
    setscore2(sourceScore2);

    const {
      sourceSettings: { text: sourceDepart },
    } = await obs.send("GetSourceSettings", {
      sourceName: "DEPART",
    });
    setdepart(sourceDepart);
    const {
      sourceSettings: { text: sourceArrivee },
    } = await obs.send("GetSourceSettings", {
      sourceName: "ARRIVEE",
    });
    setarrivee(sourceArrivee);
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

      await obs.send("SetSourceSettings", {
        sourceName: "SCORE 1",
        sourceSettings: { text: score1 },
      });
      await obs.send("SetSourceSettings", {
        sourceName: "SCORE 2",
        sourceSettings: { text: score2 },
      });

      await obs.send("SetSourceSettings", {
        sourceName: "DEPART",
        sourceSettings: { text: depart },
      });
      await obs.send("SetSourceSettings", {
        sourceName: "ARRIVEE",
        sourceSettings: { text: arrivee },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const resetTimer = async () => {
    await obs.send("SetBrowserSourceProperties", {
      source: "Browser TIMER",
      width: 251,
    });
    setTimeout(
      async () =>
        await obs.send("SetBrowserSourceProperties", {
          source: "Browser TIMER",
          width: 250,
        }),
      100
    );
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
        <div tw="w-1/6 px-2">
          <div tw="mb-4">
            <label tw="block text-sm font-bold mb-2" htmlFor="player1">
              Score 1
            </label>
            <input
              tw="shadow appearance-none border rounded w-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="score1"
              type="number"
              placeholder="0"
              value={score1}
              onChange={(e) => setscore1(e.target.value)}
            />
          </div>
          <div tw="mb-4">
            <label tw="block text-sm font-bold mb-2" htmlFor="score2">
              Score 2
            </label>
            <input
              tw="shadow appearance-none border rounded w-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="score2"
              type="number"
              placeholder="0"
              value={score2}
              onChange={(e) => setscore2(e.target.value)}
            />
          </div>
        </div>
        <div tw="w-1/6 px-2">
          <div tw="mb-4">
            <label tw="block text-sm font-bold mb-2" htmlFor="player1">
              Mot de départ
            </label>
            <input
              tw="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="depart"
              type="text"
              placeholder=""
              value={depart}
              onChange={(e) => setdepart(e.target.value)}
            />
          </div>
          <div tw="mb-4">
            <label tw="block text-sm font-bold mb-2" htmlFor="score2">
              Mot d'arrivée
            </label>
            <input
              tw="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="arrivee"
              type="text"
              placeholder=""
              value={arrivee}
              onChange={(e) => setarrivee(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div tw="w-full max-w-xs mx-auto">
        <Card onClick={setSources}>SET</Card>
      </div>
      <div tw="w-full max-w-xs mx-auto">
        <Card onClick={resetTimer}>RESET TIMER</Card>
      </div>
    </>
  );
};

export default Deck;
