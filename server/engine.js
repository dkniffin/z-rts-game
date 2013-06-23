var data = require('./game-data.js');
// https://github.com/troygoode/node-roll


exports.startGame = function(options){
   // Options
      // 
   // Sets up anything that needs to be done before the game starts
   // For example, it'll have to read in users chosen characters and start
   //  locations, and set staart locations for the remaining characters.
   //  It'll probably also have to generate the other "non-named" characters,
   //  zombies, etc.
}

exports.moveUnit = function(options){
   // Options
      // unitId
      // goTo
   // Find path to take 
      // http://wiki.openstreetmap.org/wiki/PgRouting
   // Divide the path into a bunch of points
   // Start movement 
   // Generate random events that may occur
      // Perhaps unit gets ambushed
      // Or you encounter a unit that needs saving
      // Or you get to a road block
}

exports.exploreBuilding = function(options){
   // Options
      // unitId
      // buildingId
   // What could happen?
      // Find someone to save
      // Find resources
      // Find an item
      // Find a vehicle
}

exports.claimBuilding = function(options){
   // Options
      // UnitId
      // BuildingId
   // Requirements
      // No zombies in or around building
      // Secure all entrances?
      // Not already owned by other players
         // If it is, give the options to take it over by force
    
}

exports.upgradeBuilding = function(options){
   // Options
      // BuildingId
      // Upgrade
         // Defensive
            // Barbed Wire
            // Walls
            // etc
         // Functionality
            // Open a shop
               // Trade shop
   // Process the options and change game-data appropriately
}

exports.zombieMovement = function(options){

}
