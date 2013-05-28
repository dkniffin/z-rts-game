// Include some libraries
var io = require('socket.io').listen(1113), // Set up socket.io to listen on port 1113
    mdb = require('./map-db.js'),
    gdb = require('./game-db.js'),
    chat = require('./chat.js'),
    usrlib = require('./users.js');
io.set('log level', 1); // Don't be as detailed in logging

// Set up some global variables
var users = [];

/*========================Set up connection handler========================*/
// New connections
io.sockets.on('connection', function (socket) {
  console.log('New Connection');
  var displayName = ''
  
  socket.on('reconnect', function(data){
    console.log('A connection is trying to reconnect...');
    if (typeof data.sKey  != "undefined"){
      // See if session was already authenticated.
      // If it was...
      //socket.set('authenticated', true);
    }
  });

  socket.on('auth', function (data){
    console.log('User is authenticating...');
    // A user would like to authenticate

    // Check to see if the sent the right data; else return error.
    if (!users.validateAuthData){
      socket.emit('auth-error', { e: 'either username or password was not defined'});
      return;
    }
    
    // data is correct. Authenticate.
    var authRet = usrlib.authUser(data.uname, data.pwhash);
    
    // If it returned an error, return to client
    if(authRet.error == true){
      socket.emit('auth-error', { e: authRet.errString });
      return;
    }
    
    // Set authenticated to true
    socket.set('authenticated', true);
    // Generate a session key

    // User is authenticated. Add to array of users, and send back data
    var user = usrlib.addUser({ username: data.uname });
    socket.set('user', user);
  });
  
  socket.on('setDisplayName', function(data){
    // A user wants to set their username for chat
    console.log('User wants to change display name to '+data.displayName);
    if (typeof data.displayName != "undefined" && data.displayName != ''){
         displayName = data.displayName;
      }
  });

  var b;
  socket.on('getAllBuildings', function(data){
    console.log('client requested all buildings');
    mdb.getAllBuildings(function(b){
      socket.emit('allBuildings', {
        bldgs: b
      });
    }); // get the geoJSON for the buildings
  });

  socket.on('message', function(data){
    console.log('message recieved: '+data.message);
    usrlib.checkAuth(socket);
     if (typeof data.message != "undefined" && data.message != ''){
      io.sockets.emit('update-chat', {
         uname: (typeof displayName != "undefined") ? displayName : "Unknown user",
         msg: data.message
      });
     }
  });
  
  socket.on('action', function (data) {
    //if (socket.get('authenticated') == true){
      // The client has sent some action it'd like to perform
      // Process the action, and send some updates to all clients
      actionHandler(data);
    //}
  });
});

/*========================Action Handlers========================*/

var actionHandler = function(data){
  switch(data.a)
  {
  case 'mv':
    // User would like to move a character
    break;
  }
  return;
}
