module.exports = function Unit(inId,options){
   var id = inId;
   var person = this;
   this.playerId = options['playerId'];
   this.firstName = (options['firstName']) ? options['firstName'] : '';
   this.lastName = (options['lastName']) ? options['lastName'] : '';
   this.occupation = (options['occupation']) ? options['occupation'] : '';
   this.currHealth = (options['currHealth']) ? options['currHealth'] : '';
   this.maxHealth = (options['maxHealth']) ? options['maxHealth'] : '';
   this.description = ''; //Bio
   this.currFatigue;
   this.leftHandObject;
   this.rightHandObject;
   this.backpackObjects;
   this.armor;
   this.speed = 3; // In mph
   //this.lat = 40.00622;
   //this.lon = -105.266;
   this.lat = options['lat'];
   this.lon = options['lon'];
   //var loc = new L.LatLng(39.75,-105.0); // Denver

   this.fullName = function(){
      return firstName + " " + lastName;
   }
}
