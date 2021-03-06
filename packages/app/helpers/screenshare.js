import RTCMultiConnection from "rtcmulticonnection";
import CodecsHelper from "./codecs";

var IceServersHandler = (function() {
  function getIceServers(connection) {
    // resiprocate: 3344+4433
    // pions: 7575
    var iceServers = [
      {
        urls: ["stun:webrtcweb.com:7788"],
        username: "muazkh",
        credential: "muazkh"
      },
      {
        urls: [
          "turn:webrtcweb.com:7788", // coTURN 7788+8877
          "turn:webrtcweb.com:8877",
          "turn:webrtcweb.com:4455" // restund udp
        ],
        username: "muazkh",
        credential: "muazkh"
      },
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun.l.google.com:19302?transport=udp"
        ]
      }
    ];

    return iceServers;
  }

  return {
    getIceServers: getIceServers
  };
})();

export default roomId => stream => {
  // www.RTCMultiConnection.org/docs/
  const connection = new RTCMultiConnection();
  connection.socketURL = process.env.SOCKETIO_SERVER;
  connection.autoCloseEntireSession = true;

  // this must match the viewer page
  connection.socketMessageEvent = "desktopCapture";

  connection.password = null;
  // if (room_password && room_password.length) {
  //   connection.password = room_password
  // }

  connection.enableLogs = false;
  connection.session = {
    audio: false,
    video: true,
    data: true,
    oneway: true
  };

  connection.candidates = {
    stun: true,
    turn: true
  };

  connection.iceProtocols = {
    tcp: true,
    udp: true
  };

  connection.optionalArgument = {
    optional: [],
    mandatory: {}
  };

  connection.channel = connection.sessionid = connection.userid = roomId;

  connection.autoReDialOnFailure = true;
  connection.getExternalIceServers = false;

  connection.iceServers = IceServersHandler.getIceServers();

  function setBandwidth(sdp, value) {
    sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, "");
    sdp = sdp.replace(
      /a=mid:video\r\n/g,
      "a=mid:video\r\nb=AS:" + value + "\r\n"
    );
    return sdp;
  }

  let bandwidth, codecs;
  connection.processSdp = function(sdp) {
    if (bandwidth) {
      try {
        bandwidth = parseInt(bandwidth);
      } catch (e) {
        bandwidth = null;
      }

      if (
        bandwidth &&
        bandwidth != NaN &&
        bandwidth != "NaN" &&
        typeof bandwidth === "number"
      ) {
        sdp = setBandwidth(sdp, bandwidth);
        sdp = CodecsHelper.setVideoBitrates(sdp, {
          min: bandwidth,
          max: bandwidth
        });
      }
    }

    if (!!codecs && codecs !== "default") {
      sdp = CodecsHelper.preferCodec(sdp, codecs);
    }
    return sdp;
  };

  // www.rtcmulticonnection.org/docs/sdpConstraints/
  connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false
  };

  connection.onstream = connection.onstreamended = function(event) {
    try {
      event.mediaElement.pause();
      delete event.mediaElement;
    } catch (e) {}
  };

  // www.RTCMultiConnection.org/docs/dontCaptureUserMedia/
  connection.dontCaptureUserMedia = true;

  // www.RTCMultiConnection.org/docs/attachStreams/
  connection.attachStreams.push(stream);

  // var text = '-';
  // (function looper () {
  //   if (!connection) {
  //     setBadgeText('')
  //     return
  //   }

  //   if (connection.isInitiator) {
  //     setBadgeText('0')
  //     return
  //   }

  //   text += ' -'
  //   if (text.length > 6) {
  //     text = '-'
  //   }

  //   setBadgeText(text)
  //   setTimeout(looper, 500)
  // })()

  // www.RTCMultiConnection.org/docs/open/
  connection.socketCustomEvent = connection.sessionid;

  function roomOpenCallback(isRoomOpened, roomid, error) {
    if (error) {
      console.error(error);
      return;
    }
    //   resultingURL = 'http://localhost:9002/?s=' + connection.sessionid

    //   if (room_password && room_password.length) {
    //     resultingURL += '&p=' + room_password
    //   }

    //   if (bandwidth) {
    //     resultingURL += '&bandwidth=' + bandwidth
    //   }
    //   if (!!codecs && codecs !== 'default') {
    //     resultingURL += '&codecs=' + codecs
    //   }

    //   var popup_width = 600
    //   var popup_height = 170

    //   chrome.windows.create({
    //     url: "data:text/html,<title>Unique Room URL</title><h1 style='text-align:center'>Copy following private URL:</h1><input type='text' value='" + resultingURL + "' style='text-align:center;width:100%;font-size:1.2em;'><p style='text-align:center'>You can share this private-session URI with fellows using email or social networks.</p>",
    //     type: 'popup',
    //     width: popup_width,
    //     height: popup_height,
    //     top: parseInt((screen.height / 2) - (popup_height / 2)),
    //     left: parseInt((screen.width / 2) - (popup_width / 2)),
    //     focused: true
    //   }, function (win) {
    //     popup_id = win.id
    //   })
    // }

    // connection.socket.on(connection.socketCustomEvent, function (message) {
    //   if (message.receivedYourScreen) {
    //     setBadgeText(connection.isInitiator ? connection.getAllParticipants().length : '')
    //   }
    // })
  }

  connection.onSocketDisconnect = function(event) {
    console.log("Connection closed", event);
    // alert('Connection to the server is closed.');
    // if (connection.getAllParticipants().length > 0) return

    // setDefaults()
    // chrome.runtime.reload();
  };

  connection.onSocketError = function(event) {
    console.log("Unable to connect to the server. Please try again.", event);
    // setDefaults()
    // chrome.runtime.reload();
  };

  connection.onopen = function(event) {
    console.log("Connection open", event);
  };

  connection.onmessage = function(event) {
    if (event.data.newChatMessage) {
      connection.send({
        receivedChatMessage: true,
        checkmark_id: event.data.checkmark_id
      });
    }
  };

  connection.open(connection.sessionid, roomOpenCallback);

  // connection.onleave = connection.onPeerStateChanged = function () {
  //   setBadgeText(connection.isInitiator ? connection.getAllParticipants().length : '')
  // }
};
