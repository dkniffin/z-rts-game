// Include some libraries
var io = require('socket.io').listen(1113), // Set up socket.io to listen on port 1113
    pg = require('pg'),
    mdb = require('./map-db.js');
io.set('log level', 1);

// Set up some global variables
var users = [];

/*========================Set up connection handler========================*/
// New connections
io.sockets.on('connection', function (socket) {
  console.log('connection made');
  socket.on('reconnect', function(data){
    if (typeof(data.sKey) != "undefined"){
      // See if session was already authenticated.
      // If it was...
      //socket.set('authenticated', true);
    }
  });

  socket.on('auth', function (data){
    // A user would like to authenticate

    // Check to see if the sent the right data; else return error.
    if (!validateAuthDate){
      socket.emit('auth-error', { e: 'either username or password was not defined'});
      return;
    }
    
    // data is correct. Authenticate.
    var authRet = authUser(data.uname, data.pwhash);
    
    // If it returned an error, return to client
    if(authRet.error == true){
      socket.emit('auth-error', { e: authRet.errString });
      return;
    }
    
    socket.set('authenticated', true);
    // Generate a session key

    // User is authenticated. Add to array of users, and send back data
    var user = addUser({ username: data.uname });
    socket.set('user', user);
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
    //if (socket.get('authenticated') == true){
      if (typeof(data.message) != "undefined" && data.message != ''){
	io.sockets.emit('update-chat', {
	  //uname: socket.get('user').username,
	  uname: 'bob',
	  msg: data.message
	});
      }
    //}
  });
  
  socket.on('action', function (data) {
    if (socket.get('authenticated') == true){
      // The client has sent some action it'd like to perform
      // Process the action, and send some updates to all clients
      actionHandler(data);
    }
  });
});

/*========================User management========================*/

var validateAuthData = function(data){
  if (typeof(data.uname) != "undefined" && typeof(data.pwhash) != "undefined"){
    return true;
  }
  return false;
}

var authUser = function(username, pwHash){
  var retVal = {};

  // Check the DB, etc

  retVal.errString = ''; // If there's an error, put the string here.
  retVal.error = false; // true = error, false = no error. For now, no errors

  return retVal;
}

var addUser = function(options){
  var user = {};
  user.username = options.username; // Add the username to the object

  // Pull rest of user info from DB
  user.id = '1234'; // This'll come from DB later

  users.push(user); // Add the user to the users array
  
  sendNewUser(user); // Send new userlist out to all
  return user;
}

var sendNewUser = function(user) {
  io.sockets.emit('new-user', { uname: user.username, id: user.id });
}

var removeUser = function(remUid){
  // Remove user
  for(var i = 0; i < users.length; ++i) {
    if(users[i].id == remUid) {
	users.splice(i,1);
	sendRemUser(remUid);
        break;
    }
  }
}

var sendRemUser = function(remUid){
  io.sockets.emit('rem-user', { id: remUid });
}

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
