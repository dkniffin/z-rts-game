function Person(options){
   this.firstName = (options['firstName']) ? options['firstName'] : '';
   this.lastName = (options['lastName']) ? options['lastName'] : '';
   this.currHealth = (options['currHealth']) ? options['currHealth'] : '';
   this.maxHealth = (options['maxHealth']) ? options['maxHealth'] : '';
   this.currFatigue;
   this.leftHandObject;
   this.rightHandObject;
   this.backpackObjects;
   this.armor;
   this.regSpeed;
   this.sprintSpeed;
   this.loc;

   // Getters
   this.getFullName = function(){
      return this.firstName + " " + this.lastName;
   }
}
