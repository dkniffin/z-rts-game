var Unit = require('./classes/unit.js');
var Vehicle = require('./classes/vehicle.js');

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
  units.push(nUnit);
  return nUnit;
}

exports.getUnitById = function(id){
   units.forEach(function(unit){
      if(unit.id == id) return unit;
   });
}

// Vehicles
exports.newVehicle = function(options){
  var nVehicle = new Vehicle(nextVehicleId,options);
  nextVehicleId++;
  vehicles.push(nVehicle);
  return nVehicle;
}

exports.getVehicleById = function(id){
   vehicles.forEach(function(vehicle){
      if(vehicles.id == id) return vehicle;
   });
}

// Players
exports.newPlayer = function(options){
  var nPlayer = new Player(nextPlayerId,options);
  nextPlayerId++;
  players.push(nPlayer);
  return nPlayer;
}

exports.getPlayerById = function(id){
   units.forEach(function(player){
      if(player.id == id) return player;
   });
}

// Zombies
exports.newZombie = function(options){
  var nZombie = new Zombie(nextZombieId,options);
  nextZombieId++;
  zombies.push(nZombie);
  return nZombie;
}

exports.getZombieById = function(id){
   zombies.forEach(function(zombie){
      if(zombie.id == id) return zombie;
   });
}

exports.saveGameState = function(){
  // Transfers all game data to a DB
}

exports.restoreGameState = function(){
  // Restores all game data from a DB
}
