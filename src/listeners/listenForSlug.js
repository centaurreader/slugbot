var postMessage = require("../api/postMessage.js"),
    userService = require("../services/usersService.js");

function isMessage(type) {
  return type === "message";
}
function containsSlug(text) {
  if (text === undefined) {
    return;
  }
  return new RegExp(/slug/g).test(text.toLowerCase());
}
function isBot(username) {
  return username === "slugbot";
}

function slackEventMeetsCriteria(slackEvent) {
  if (!isMessage(slackEvent.type)) {
    return false;
  }
  if (!containsSlug(slackEvent.text)) {
    return false;
  }
  if (isBot(slackEvent.username)) {
    return false;
  }
  return true;
}

function listenForSlug(slackEvent) {
  if (slackEventMeetsCriteria(slackEvent)) {
    userService.getUsernameById(slackEvent.user, function (username) {
      console.log("\r\n");
      console.log(new Date() + "\r\n---------------------------");
      console.log(username + " got slugged.");
      console.log("\r\n");
    });
    postMessage(
        "yr a slug.",
        slackEvent.channel
    );
  }
}
module.exports = listenForSlug;