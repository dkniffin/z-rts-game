// Set up socket.io to listen on port 1113, and make it available to all custom
// modules with GLOBAL.io
GLOBAL.io = require('socket.io').listen(1113); 

// Include custom libraries
var mdb = require('./map-db.js'),
    gdb = require('./game-data.js'),
    chat = require('./chat.js'),
    usrlib = require('./users.js');
io.set('log level', 1); // Don't be as detailed in logging

// Set up some global variables
var users = []; // Stores currently connected users

/*========================Misc Functions========================*/
function isSet(variable){
   if (typeof variable != "undefined" && variable !== ''){
       return true;
   }
   else{
       return false;
   }
}

/*========================Set up connection handler========================*/
io.sockets.on('connection', function (socket) {
  console.log('New Connection');

  // Set some globals for the session
  var displayName = '';
  var user = {};
  var authenticated = true;
  chat.sendHistory(socket);

  /*======== Error function ========*/
  function handleError(errorText){
    console.log(errorText);
    socket.emit('error', {
      e: errorText
    });
  }
  
  /*======== Reconnect ========*/
  socket.on('reconnect', function(data){
    console.log('A connection is trying to reconnect...');
    if (isSet(data.sKey)){
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
      handleError('Either username or password was not defined');
      return;
    }
    
    // data is correct. Authenticate.
    var authRet = usrlib.authUser(data.uname, data.pwhash);
    
    // If it returned an error, return to client
    if(authRet.error === true){
      socket.emit('auth-error', { e: authRet.errString });
      return;
    }
    
    // Set authenticated to true
    authenticated = true;
    // TODO: Generate a session key

    // User is authenticated. Add to array of users, and send back data
    user = usrlib.addUser({ username: data.uname });
  });
  
  /*======== Set Display Name ========*/
  socket.on('setDisplayName', function(data){
    // A user wants to set their username for chat
    console.log('User wants to change display name to '+data.displayName);
    if (isSet(data.displayName)){
      displayName = data.displayName;
    }
    else{
      handleError('A displayName must be specified to set the displayName');
    }
  });

  /*======== New chat message ========*/
  socket.on('sendMessage', function(data){
    console.log('Message recieved: '+data.message);
    usrlib.authCheck(authenticated,socket);
    chat.sendMessage(data.message,displayName);
  });


  /*======== Client wants some building data ========*/
  socket.on('getBuildings', function(data){
    // Check for selection
    if (!isSet(data.selection)){
      handleError('A selection must be defined to get buildings');
    }

    // Do things based on the selection value
    switch(data.selection) {
      case 'all':
        var b;
        console.log('Request for all buildings');
        mdb.getAllBuildings(function(b){
          socket.emit('retBuildings', {
            bldgs: b
          });
        }); 
        break;
      case 'bbox':
        console.log('Request for all buildings in a bbox');
        if (!isSet(data.bbox)){ handleError('A bbox selection must define bbox'); }
        break; 
      case 'player':
        console.log('Request for all buildings for a player');
        break; 
      case 'one':
        console.log('Request for one building');
        break; 
      default:
        handleError('Unrecognized selection');
    }
  });
  
  /*======== Game controls ========*/
  socket.on('moveUnit',{
    // User would like to move a unit
    if (!isSet(data.unitId)){
      handleError('To move a unit, you have to specify the unitId');
    }
    if (!isSet(data.newLoc)){

    }
  
  });
  socket.on('attackTarget',{});
  socket.on('upgradeBuilding',{});
});

/*========================Action Handlers========================*/

var actionHandler = function(data){
  switch(data.a)
  {
  case 'mv':
    break;
  case 'atk':
    // User would like to attack something
    break;
  }
  return;
}
