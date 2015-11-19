var postMessage = require("../api/postMessage.js");

function blah(slackEvent) {
  if (slackEvent.type === "message" && !slackEvent.isBot) {
    if (slackEvent.text) {
      if (RegExp(/slugbot\b/g).test(slackEvent.text.toLowerCase())) {
        postMessage(
            "slugs for the slug god.",
            slackEvent.channel
        );
      }
    }
  }
}
module.exports = blah;