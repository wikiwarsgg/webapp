require("dotenv").config();

const { SOCKETIO_SERVER } = process.env;

module.exports = {
  env: {
    SOCKETIO_SERVER
  }
};
