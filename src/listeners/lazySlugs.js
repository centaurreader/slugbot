var postMessage = require("../api/postMessage");

var lastMessage = null;

function checkMessages() {
  if (lastMessage) {
    if (lastMessage.username === "bot") {
      return;
    }
    postMessage("y'all are a bunch of slugs.", lastMessage.channel);
  }
}
var idleCheck = setTimeout(checkMessages, 7200000);

function clearTimeout(slackEvent) {
  if (slackEvent.type === "message") {
    lastMessage = slackEvent;
    idleCheck.clearTimeout();
  }
}

module.exports = clearTimeout;