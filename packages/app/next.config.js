require("dotenv").config();

module.exports = {
  env: {
    signallingServer: process.env.signallingServer,
    broadcastServer: process.env.broadcastServer
  }
};
