var webSocketClient = require("./api/websockets.js"),
    auth = require("./api/auth.js");

var listeners = [
    require("./listeners/listenForSlug.js"),
    require("./listeners/callSynthdustSlug.js")
];

var ascii = "";
ascii +="   _         _      \r\n";
ascii +="  /_`/   _  /_)_ _/_\r\n";
ascii +=" ._///_//_//_)/_//  \r\n";
ascii +="        _/          \r\n";
console.log(ascii);

auth(function (response) {
    webSocketClient.start(response.url, listeners);
});

