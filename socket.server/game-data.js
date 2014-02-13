var Unit = require('./classes/unit.js');
var Vehicle = require('./classes/vehicle.js');
var Player = require('./classes/player.js');

exports.units = []; // All units
exports.vehicles = []; // All vehicles
exports.players = []; // All players
exports.zombies = []; // All zombies

var nextUnitId = 0;
var nextVehicleId = 0;
var nextPlayerId = 0;
var nextZombieId = 0;

// Units
exports.newUnit = function(options){
  var nUnit = new Unit(nextUnitId,options);
  nextUnitId++;
  exports.units.push(nUnit);
  return nUnit;
}

exports.getUnitById = function(id){
   exports.units.forEach(function(unit){
      if(unit.id == id) return unit;
   });
}

exports.getUnitsByPlayerId = function(playerId){
  var retUnits = [];
  exports.units.forEach(function(unit){
    if(unit.player.id == playerId){
      retUnits.push(unit);
    }
  });
  return retUnits
}

// Vehicles
exports.newVehicle = function(options){
  var nVehicle = new Vehicle(nextVehicleId,options);
  nextVehicleId++;
  exports.vehicles.push(nVehicle);
  return nVehicle;
}

exports.getVehicleById = function(id){
   exports.vehicles.forEach(function(vehicle){
      if(vehicles.id == id) return vehicle;
   });
}

// Players
exports.newPlayer = function(options){
  var nPlayer = new Player(nextPlayerId,options);
  nextPlayerId++;
  exports.players.push(nPlayer);
  return nPlayer;
}

exports.getPlayerByUsername = function(username){
  var p;
   exports.players.forEach(function(player){
      if(player.username == username){
        p = player;
        return false;
      }
   });
   return p;
}

// Zombies
exports.newZombie = function(options){
  var nZombie = new Zombie(nextZombieId,options);
  nextZombieId++;
  exports.zombies.push(nZombie);
  return nZombie;
}

exports.getZombieById = function(id){
   exports.zombies.forEach(function(zombie){
      if(zombie.id == id) return zombie;
   });
}

exports.saveGameState = function(){
  // Transfers all game data to a DB
}

exports.restoreGameState = function(){
  // Restores all game data from a DB
}
