const assetPrefix = process.env.BUILDING_FOR_NOW === "true" ? "/player" : "";

module.exports = {
  assetPrefix,
  env: {
    signallingServer: "https://localhost:9002/",
    broadcastServer: "https://localhost:9001/"
  }
};
