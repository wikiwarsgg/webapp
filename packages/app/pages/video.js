import React from "react";
import { useRouter } from "next/router";

import createConnection from "../helpers/connection";

const Video = () => {
  const { query } = useRouter();
  const connection = createConnection(query.s);

  //connection.onstream = function(e) {
  // video.srcObject = e.stream;
  //};

  // if user left
  //connection.onleave = connection.onstreamended = connection.onSessionClosed = function(
  //  e
  //) {
  //  if (e.userid !== screenId) return;

  //video.srcObject = null;

  //console.log("Screen sharing has been closed.");
  //connection.close();
  //connection.closeSocket();
  //connection.userid = connection.token();

  //location.reload();
  //};

  return <div></div>;
};
export default Video;
