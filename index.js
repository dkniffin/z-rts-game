// Start http web server
var connect = require('connect');
connect.createServer(
    connect.static(__dirname+'/html')
).listen(8080);

// Start game socket.io server
require('./socket.server/server.js');
