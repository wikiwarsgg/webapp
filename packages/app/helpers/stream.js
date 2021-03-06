const CONSTRAINTS = {
  webcam: { audio: false, video: true },
  screen: { audio: false, video: true }
};

export default (type, callback) => {
  if (type === "screen") {
    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getDisplayMedia(CONSTRAINTS[type])
        .then(callback)
        .catch(callback);
    } else {
      navigator
        .getDisplayMedia(CONSTRAINTS[type])
        .then(callback)
        .catch(callback);
    }
  } else if (type === "webcam") {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(CONSTRAINTS[type])
        .then(callback)
        .catch(callback);
    } else {
      navigator
        .getUserMedia(CONSTRAINTS[type])
        .then(callback)
        .catch(callback);
    }
  }
};
