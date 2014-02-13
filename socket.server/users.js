/*========================User management========================*/

exports.validateAuthData = function(data){
  if (typeof data.uname != "undefined" && typeof data.pwhash != "undefined"){
    console.log(data.uname+' '+ data.pwhash);
    return true;
  }
  return false;
}

exports.authUser = function(username, pwHash){
  var retVal = {};

  // TODO: authenticate user

  retVal.errString = ''; // If there's an error, put the string here.
  retVal.error = false; // true = error, false = no error. For now, no errors

  return retVal;
}

exports.addUser = function(options){
  var user = {};
  user.username = options.username; // Add the username to the object

  // Pull rest of user info from DB
  user.id = '1234'; // This'll come from DB later

  users.push(user); // Add the user to the users array
  
  sendNewUser(user); // Send new userlist out to all
  return user;
}

exports.sendNewUser = function(io,user) {
  io.sockets.emit('new-user', { uname: user.username, id: user.id });
}

exports.removeUser = function(remUid){
  // Remove user
  for(var i = 0; i < users.length; ++i) {
    if(users[i].id == remUid) {
	users.splice(i,1);
	sendRemUser(remUid);
        break;
    }
  }
}

exports.sendRemUser = function(io,remUid){
  io.sockets.emit('rem-user', { id: remUid });
}

exports.setDisplayName = function(socket,data){
  if (typeof data.displayName != "undefined" && data.displayName != ''){
    var user = socket.get('user');
    user.displayName = data.displayName;
    socket.set('user',user);
  }
}

exports.authCheck = function(authenticated,socket){
   if (!authenticated){ socket.emit('error', {e: 'Not Authenticated'})};
}
