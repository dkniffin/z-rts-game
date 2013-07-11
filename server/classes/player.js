module.exports = function Player(inId,options){
   this.username = options['username'];
   this.resources = {
      food: 150,
      water: 100,
      medical: 10,
      power: 13,
      gas: 15
   }
}
