function gGD(){
   var selectedUnits = [];
   
   this.addSelectedUnit = function(person){
      selectedUnits.push(person);
   }

   this.removeSelectedUnit = function(person){
      selectedUnits.splice(selectedUnits.indexOf(person),1);
   }

   this.deselectAll = function(){
      selectedUnits.forEach(function(unit){
         unit.deselect();
      });
   }

   this.forEachSelectedUnit = function(func){
      selectedUnits.forEach(function(unit){
         func(unit);
      });
   }
}

globalGameData = new gGD();
