import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();
obs.on("error", (err) => {
  console.error("socket error:", err);
});

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

const getSources = async () => {
  const {
    sourceSettings: { text: player1 },
  } = await obs.send("GetSourceSettings", {
    sourceName: "PLAYER 1",
  });
  const {
    sourceSettings: { text: player2 },
  } = await obs.send("GetSourceSettings", {
    sourceName: "PLAYER 2",
  });
  const {
    sourceSettings: { text: score1 },
  } = await obs.send("GetSourceSettings", {
    sourceName: "SCORE 1",
  });
  const {
    sourceSettings: { text: score2 },
  } = await obs.send("GetSourceSettings", {
    sourceName: "SCORE 2",
  });
  const {
    sourceSettings: { text: depart },
  } = await obs.send("GetSourceSettings", {
    sourceName: "DEPART",
  });
  const {
    sourceSettings: { text: arrivee },
  } = await obs.send("GetSourceSettings", {
    sourceName: "ARRIVEE",
  });

  return {
    player1,
    player2,
    score1,
    score2,
    depart,
    arrivee,
  };
};

const setSources = async (sources) => {
  console.log(sources);
  try {
    const res = await obs.send("SetSourceSettings", {
      sourceName: "PLAYER 1",
      sourceSettings: { text: sources.player1 },
    });
    console.log(res);
    await obs.send("SetSourceSettings", {
      sourceName: "PLAYER 2",
      sourceSettings: { text: sources.player2 },
    });

    await obs.send("SetSourceSettings", {
      sourceName: "SCORE 1",
      sourceSettings: { text: sources.score1 },
    });
    await obs.send("SetSourceSettings", {
      sourceName: "SCORE 2",
      sourceSettings: { text: sources.score2 },
    });

    await obs.send("SetSourceSettings", {
      sourceName: "DEPART",
      sourceSettings: { text: sources.depart },
    });
    await obs.send("SetSourceSettings", {
      sourceName: "ARRIVEE",
      sourceSettings: { text: sources.arrivee },
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

const Deck = () => {
  const [isConnected, setConnection] = useState(false);
  const [items, setItems] = useState({
    player1: "",
    player2: "",
    score1: "",
    score2: "",
    depart: "",
    arrivee: "",
  });
  const initConnection = async () => {
    await obs.connect();
    setConnection(true);
  };

  useEffect(() => {
    if (isConnected) {
      const init = async () => {
        try {
          const sources = await getSources();
          setItems(sources);
        } catch (e) {
          console.error(e);
        }
      };
      init();
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div tw="w-5/6 mx-auto flex flex-row justify-center">
        <Button onClick={initConnection}>CONNECT</Button>
      </div>
    );
  }

  return (
    <>
      <div tw="w-5/6 mx-auto flex flex-row justify-center">
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
              value={items.player1}
              onChange={(e) => setItems({ ...items, player1: e.target.value })}
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
              value={items.player2}
              onChange={(e) => setItems({ ...items, player2: e.target.value })}
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
              value={items.score1}
              onChange={(e) => setItems({ ...items, score1: e.target.value })}
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
              value={items.score2}
              onChange={(e) => setItems({ ...items, score2: e.target.value })}
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
              value={items.depart}
              onChange={(e) => setItems({ ...items, depart: e.target.value })}
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
              value={items.arrivee}
              onChange={(e) => setItems({ ...items, arrivee: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div tw="w-full max-w-xs mx-auto">
        <Button onClick={() => setSources(items)}>SET</Button>
      </div>
      <div tw="w-full max-w-xs mx-auto">
        <Button onClick={resetTimer}>RESET TIMER</Button>
      </div>
    </>
  );
};

export default Deck;
