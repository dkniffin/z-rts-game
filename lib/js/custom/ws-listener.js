/* This file creates the websockets connection, and sets up all the listeners for the various events.
*/

var socket = io.connect('http://wheatley.colorado.edu:1113');

// retuildings
socket.on('retBuildings', function(data) {
   // The server has return some buildings
   bldgGeoJSON = data.bldgs;
   var osmb = new L.BuildingsLayer().addTo(map).geoJSON(bldgGeoJSON).setStyle({
      color: '#800000',
      roofColor: '#f22222'
   });
   joe.render(map);
   console.log(map);
});

// updateChat
socket.on('updateChat', function(data){
   $('#chat-messages').append('<p><b>'+data.uname+': </b>'+data.msg+'</p>');
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
