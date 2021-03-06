var chatHist = [];
exports.sendMessage = function(message,from){
  if (typeof message != "undefined" && message != ''){
    var realFrom = (typeof from != "undefined") ? from : "Unknown user";
    chatHist.push({
      message: message,
      from: realFrom 
    });
    console.log('Broadcasting message: '+message+' from '+realFrom);
    io.sockets.emit('updateChat', {
      uname: realFrom,
      msg: message
    }); 
  }   
}

exports.sendHistory = function(socket){
  chatHist.forEach(function(id){
    socket.emit('update-chat', {
      uname: id.from,
      msg: id.message
    });
  });
}
