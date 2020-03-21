import { createServer } from "http";

import ioServer from "socket.io";
import RTCMultiConnectionServer from "rtcmulticonnection-server";

const PORT = "9001";

let httpApp = createServer();
const config = {};

RTCMultiConnectionServer.beforeHttpListen(httpApp, config);

httpApp = httpApp.listen(parseInt(process.env.PORT || PORT), "0.0.0.0", () => {
  RTCMultiConnectionServer.afterHttpListen(httpApp, config);
});

ioServer(httpApp).on("connection", socket => {
  RTCMultiConnectionServer.addSocket(socket);
});
