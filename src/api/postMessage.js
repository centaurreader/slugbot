var https = require("https");

function buildUrl(message, channel) {
  var url = "https://slack.com/api/chat.postMessage";
  url += "?token=xoxb-14088744656-tLcOxRV79qOi7A3a2gx7GZyN";
  url += "&channel=" + channel;
  url += "&text=" + encodeURIComponent(message);
  url += "&username=" + "slugbot";
  url += "&icon_url=" + "http://chattypics.com/files/Untitled1_fleedk26en.jpg";
  url += "&pretty=1";

  return url;
}

function handleResponse(response, callback) {
  var body = "";
  
  response.on("data", function(chunk) {
    body += chunk;
  });
  response.on("end", function() {
    if (typeof callback === "function") {
      callback(JSON.parse(body));
    }
  });
}

function makeRequest (message, channel, callback) {
  https.get(buildUrl(message, channel),
    function(response) {
      handleResponse(response, callback);
    }
  ).on("error", function (e) {
    console.error(e);
  });
}

module.exports = makeRequest;