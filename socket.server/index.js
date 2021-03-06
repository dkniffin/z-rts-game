/*========================Node.js========================*/
// Set up socket.io to listen on port 1113, and make it available to all custom
// modules with GLOBAL.io
GLOBAL.io = require('socket.io').listen(1113); 

// Include custom libraries
//var mdb = require('./map-db.js'),
var chat = require('./chat.js'),
    usrlib = require('./users.js'),
    game = require('./engine.js')
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

/*========================Start Game========================*/
game.startGame();

/*========================Set up connection handler========================*/
io.sockets.on('connection', function (socket) {
  console.log('New Connection');

  // Set some globals for the session
  var displayName = '';
  var username = '';
  var authenticated = false;
  chat.sendHistory(socket);

  /*======== Error function ========*/
  function handleError(errorText){
    console.log('ERROR: '+errorText);
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
    // A user would like to authenticate

    // Check to see if the sent the right data; else return error.
    if (!isSet(data.uname)){
      handleError('Username is not defined');
      return;
    }
    if (!isSet(data.pwhash)){
      handleError('Pwhash is not defined');
      return
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
    username = data.uname;
    game.newPlayer({username: username}); // Create the new player
    displayName = username;
    io.sockets.emit('userJoin', {uname: username}); // Send out a "new user" event to all users
  });

  socket.on('disconnect', function(){
    console.log('User has disconnected.');
    if(authenticated){
      io.sockets.emit('userLeave', {uname: username});
    }
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
  
  /*======== Game data getters ========*/
  socket.on('getUnitDetails',function(data,callback){
    // Get the Unit's bio, portrait, etc
	
	// Call the callback on that data
  });
  socket.on('getUnitStats',function(data,callback){
    // Get the Unit's health, armor, fatigue, etc
	
	// Call the callback on that data
  });
  socket.on('getUnitSkills',function(data,callback){
    // Get the Unit's WP (melee), WP (ranged), Medical, etc (skill levels)
	
	// Call the callback on that data
  });
  socket.on('getUnitInventory',function(data,callback){
    // Get the Unit's equipped items and backpack contents
	
	// Call the callback on that data
  });
  socket.on('getBuildingStats',function(data,callback){
    // Get the Building's health, armor, etc
	
	// Call the callback on that data
  });
  socket.on('getBuildingOccupants',function(data,callback){
    // Get the a list of units contained in the building
	
	// Call the callback on that data
  });
  socket.on('getBuildingVehicles',function(data,callback){
    // Get the a list of vehicles contained in the building
	
	// Call the callback on that data
  });
  socket.on('getUnitsInBbox',function(data,callback){
    // Get the a list of known units that are within bbox 
    // (don't get the ones that aren't visible to the player)

    // First, validate that bbox was sent
    if (!isSet(data.bbox)){
      handleError('To get units in a bbox, a bbox must be sent to the server');
    }

    var retUnits = [];

    game.gameData().units.forEach(function(unit){
      // Call the callback on each unit
      retUnits.push(unit);
    });

    callback(retUnits);
  });
  socket.on('getVehiclesInBbox',function(data,callback){
    // Get the a list of known vehicles that are within bbox
    // (don't get the ones that aren't visible to the player)
	
	// Call the callback on that data
  });
  socket.on('getZombiesInBbox',function(data,callback){
    // Get the a list of known zombies in the bbox
    // (don't get the ones that aren't visible to the player)
	
	// Call the callback on that data
  });
  socket.on('getPlayerResourceValues',function(data,callback){
    // Get the resource values for the given player

    // First validate that a username was sent
    if (!isSet(data.username)){
      handleError('To get a player\'s resource values, a username must be sent to the server');
    }
    player = game.gameData().getPlayerByUsername(data.username);
    var retResources = game.gameData().getPlayerByUsername(data.username).resources;

    // Call the callback on that data
    callback(retResources);
  });
  
  /*======== Game controls ========*/
  socket.on('moveUnit',function(data){
    // User would like to move a unit
    if (!isSet(data.unitId)){
      handleError('To move a unit, you must specify the unitId');
    }
    if (!isSet(data.newLoc)){
      handleError('To move a unit, you must specify a newLoc');
    }
    game.moveUnit(data.unitId,data.newLoc);
  });
  socket.on('attackTarget',function(data){
    if (!isSet(data.unitId)){
      handleError('To attack something, you must specify an attacking unitId');
    }
    if (!isSet(data.targetId)){
      handleError('To attack something, you must specify a targetId');
    }
    game.attackTarget(unitId,targetId);
  });
  socket.on('upgradeBuilding',function(data){
      
  });

});
