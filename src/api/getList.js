var https = require("https");

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

function makeRequest (callback) {
  https.get("https://slack.com/api/users.list?token=xoxb-14088744656-tLcOxRV79qOi7A3a2gx7GZyN",
    function(response) {
      list = response;
      handleResponse(response, callback);
    }
  ).on("error", function (e) {
    console.error(e);
  });
}

module.exports = makeRequest;