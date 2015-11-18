var usersService = require("../services/usersService.js"),
    postMessage = require("../api/postMessage.js");

function isMessage(type) {
  return type === "message";
}
function isAsking(text) {
  return new RegExp(/what is/g).test(text.toLowerCase()) || 
          new RegExp(/what's/g).test(text.toLowerCase()) ||
          new RegExp(/what are/g).test(text.toLowerCase());
}
function checkUsername(user, callback) {
  usersService.getUsernameById(user, function (username) {
    if (username.toLowerCase() === "synthdust") {
      callback(true);
    }
  });
}

function meetsCriteria(slackEvent, callback) {
  checkUsername(slackEvent.user, function (isSynthdust) {
      if (!isMessage(slackEvent.type)) {
      return;
    }
    if (!isAsking(slackEvent.text)) {
      return;
    }
    if (!isSynthdust) {
      return;
    }
    callback();
  });
}

function callSynthdustSlug(slackEvent) {
  meetsCriteria(slackEvent, function () {
    console.log("\r\n");
    console.log(new Date() + "\r\n---------------------------");
    console.log("synthdust shoulda googled.");
    postMessage(
        "Google it, slug.",
        slackEvent.channel
    );
  });
}
module.exports = callSynthdustSlug;