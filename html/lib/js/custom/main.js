function gGD(){
   var self = this;
   this.selectedUnits = [];
   
   this.addSelectedUnit = function(person){
      self.selectedUnits.push(person);
   }

   this.removeSelectedUnit = function(person){
      var index = self.selectedUnits.indexOf(person);
      self.selectedUnits.splice(index,1);
   }

   this.deselectAll = function(){
      while(self.selectedUnits.length > 0){
         self.selectedUnits[0].deselect();
      }
   }

   this.forEachSelectedUnit = function(func){
      self.selectedUnits.forEach(function(unit){
         func(unit);
      });
   }
}

globalGameData = new gGD();
