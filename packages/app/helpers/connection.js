import RTCMultiConnection from "rtcmulticonnection";
import screenshare from "./screenshare";

const createConnection = screenId => {
  const connection = new RTCMultiConnection(screenId);
  connection.socketURL =
    "https://wikiwars-app-server-production.herokuapp.com/";
  connection.autoCloseEntireSession = true;

  // this must match the extension page
  connection.socketMessageEvent = "desktopCapture";

  connection.enableLogs = true;
  connection.session = {
    audio: true,
    video: true,
    data: true,
    oneway: true
  };

  // www.rtcmulticonnection.org/docs/sdpConstraints/
  connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
  };

  connection.optionalArgument = {
    optional: [],
    mandatory: {}
  };

  connection.onstatechange = function(state) {
    if (state.name === "room-not-available") {
      console.log(
        "Screen share session is closed or paused. You will join automatically when share session is resumed."
      );
    }
  };

  connection.onstreamid = event => {
    console.log("Remote peer is about to send his screen.");
  };

  connection.onSocketDisconnect = event => {
    // alert('Connection to the server is closed.');
    if (connection.getAllParticipants().length > 0) return;
    location.reload();
  };

  connection.onSocketError = event => {
    alert("Unable to connect to the server. Please try again.");

    setTimeout(function() {
      location.reload();
    }, 1000);
  };

  function checkPresence() {
    console.log("Checking room: " + screenId);

    connection.checkPresence(screenId, function(isRoomExist, roomid, extra) {
      if (isRoomExist === false) {
        console.log("Room does not exist: " + screenId);

        setTimeout(function() {
          console.log("Checking room: " + screenId);
          setTimeout(checkPresence, 1000);
        }, 4000);
        return;
      }

      console.log("Joining room: " + screenId);

      connection.join(screenId);
    });
  }

  if (screenId) {
    checkPresence();
  }

  var dontDuplicate = {};
  connection.onPeerStateChanged = event => {
    if (!connection.getRemoteStreams(screenId).length) {
      if (event.signalingState === "have-remote-offer") {
        console.log("Received WebRTC offer from: " + screenId);
      } else if (
        event.iceGatheringState === "complete" &&
        event.iceConnectionState === "connected"
      ) {
        console.log(
          "WebRTC handshake is completed. Waiting for remote video from: " +
            screenId
        );
      }
    }

    if (
      event.iceConnectionState === "connected" &&
      event.signalingState === "stable"
    ) {
      if (dontDuplicate[event.userid]) return;
      dontDuplicate[event.userid] = true;
    }
  };
  return connection;
};

export default createConnection;
