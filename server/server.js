// Set up socket.io to listen on port 1113, and make it available to all custom
// modules with GLOBAL.io
GLOBAL.io = require('socket.io').listen(1113) 

// Include custom libraries
var mdb = require('./map-db.js'),
    gdb = require('./game-db.js'),
    chat = require('./chat.js'),
    usrlib = require('./users.js');
io.set('log level', 1); // Don't be as detailed in logging

// Set up some global variables
var users = []; // Stores currently connected users

/*========================Set up connection handler========================*/
io.sockets.on('connection', function (socket) {
  console.log('New Connection');

  // Set some globals for the session
  var displayName = '';
  var user = {};
  var authenticated = true;
  chat.sendHistory(socket);
  
  /*======== Reconnect ========*/
  socket.on('reconnect', function(data){
    console.log('A connection is trying to reconnect...');
    if (typeof data.sKey  != "undefined"){
      // See if session was already authenticated.
      // If it was...
      //socket.set('authenticated', true);
    }
  });

  /*======== Log in ========*/
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
    authenticated = true;
    // Generate a session key

    // User is authenticated. Add to array of users, and send back data
    user = usrlib.addUser({ username: data.uname });
  });
  
  /*======== Set Display Name ========*/
  socket.on('setDisplayName', function(data){
    // A user wants to set their username for chat
    console.log('User wants to change display name to '+data.displayName);
    if (typeof data.displayName != "undefined" && data.displayName != ''){
         displayName = data.displayName;
      }
  });

  /*======== New chat message ========*/
  socket.on('message', function(data){
    console.log('Message recieved: '+data.message);
    usrlib.authCheck(authenticated,socket);
    chat.sendMessage(data.message,displayName);
  });


  /*======== Client wants some building data ========*/
  socket.on('getBuildings', function(data){
    switch(data.selection) {
      case 'all':
        var b;
        console.log('Request for all buildings');
        mdb.getAllBuildings(function(b){
          socket.emit('allBuildings', {
            bldgs: b
          });
        }); 
        break;
      case 'bbox':
        console.log('Request for all buildings in a bbox');
        break; 
      case 'player':
        console.log('Request for all buildings for a player');
        break; 
      case 'one':
        console.log('Request for one building');
        break; 
      default:
        // code
    }
  });

  socket.on('action', function (data) {
    // The client has sent some action it'd like to perform
    // Process the action, and send some updates to all clients
    usrlib.authCheck(authenticated,socket);
    actionHandler(data);
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
