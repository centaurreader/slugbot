var https = require("https");

function handleResponse(response, callback) {
  var body = "";
  
  response.on("data", function(chunk) {
    body += chunk;
  });
  response.on("end", function() {
    callback(JSON.parse(body));
  });
}

function makeRequest (callback) {
  https.get("https://slack.com/api/rtm.start?token=[token]",
    function(response) {
      handleResponse(response, callback);
    }
  ).on("error", function (e) {
    console.error(e);
  });
}

module.exports = makeRequest;
