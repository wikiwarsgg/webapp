const assetPrefix = process.env.BUILDING_FOR_NOW === "true" ? "/player" : "";

module.exports = {
  assetPrefix,
  env: {
    signallingServer: process.env.signallingServer,
    broadcastServer: broadcastServer.env.broadcastServer
  }
};
