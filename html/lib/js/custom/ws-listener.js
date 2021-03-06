/* This file creates the websockets connection, and sets up 
all the listeners for the various events.
*/
var socket = io.connect('http://'+location.hostname+':1113');
//var socket = io.connect('http://71.196.229.3:1113');


socket.emit('auth', {
   uname: 'bob',
   pwhash: '123'
});

// updateChat
socket.on('updateChat', function(data){
   $('#chat-messages')
   .append('<p><b>'+data.uname+': </b>'+data.msg+'</p>');
});

// A new user joins the game
socket.on('userJoin',function(data){
   $('#chat-messages')
   .append('<p><b>'+data.uname+'</b> has joined the game.</p>');
});

// A user leaves the game
socket.on('userLeave',function(data){
   $('#chat-messages')
   .append('<p><b>'+data.uname+'</b> has left the game.</p>');
});

// error
socket.on('error', function(data){
   console.log(data.e);
   
   $('#popup')
   .addClass('ui-state-error ui-corner-all')
   .append('<p>'+data.e+'</p>')
   .dialog({
      resizable: false,
      width: 'auto',
      modal: true
   }).open();
   
});

// Game actions
socket.on('unitMovement',function(data){
   // Move Unit icon
});
socket.on('unitAttack',function(data){
   // Play attack animation (if any)
});
socket.on('buildingUpgrade',function(data){});
socket.on('buidlingClaim',function(data){});
socket.on('resourceUpdate',function(data){});
socket.on('tradeRequest',function(data){});
