var WebSocket = require("ws"),
    EventClass = require("../classes/event.js");

function startClient(url, listeners) {
    var ws = new WebSocket(url),
        id = 0;

    ws.on("open", function open() {
      console.log("connected");
    });
 
    ws.on("close", function close() {
      console.log("disconnected");
    });

    ws.on("message", function message(data, flags) {
      data = new EventClass(JSON.parse(data));

      listeners.forEach(function (listener) {
        listener(data);
      });
    });
}

module.exports = {
    start: startClient
};