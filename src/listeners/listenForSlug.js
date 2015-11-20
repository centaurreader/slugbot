var postMessage = require("../api/postMessage.js"),
    userService = require("../services/usersService.js");

function isMessage(type) {
  return type === "message";
}
function containsSlug(text) {
  if (text === undefined) {
    return false;
  }
  return new RegExp(/(slug)\b/i).test(text);
}
function containsSlugs(text) {
  if (text === undefined) {
    return false;
  }
  return new RegExp(/(slugs)\b/i).test(text); 
}

function slackEventMeetsCriteria(slackEvent) {
  if (!isMessage(slackEvent.type)) {
    return false;
  }
  if (!containsSlug(slackEvent.text) && !containsSlugs(slackEvent.text)) {
    return false;
  }
  if (slackEvent.isBot) {
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