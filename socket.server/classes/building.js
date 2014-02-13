function Building(inId,options){
   this.id = inId;
   this.geometry = options['geometry'];
   this.type = (options['type'])?options['type']:'';
   if (this.type === ''){
      // Generate random type from available ones in DB
      
   }
   this.func = ''; // What is it being used for
   this.armor = 0; // How strong are the defenses for the building?
   this.health = 0; // What's the overall integrity of the building?
   this.defensive_attributes = []; // What kind of defenses have been added?
   this.occupants; // Who's in the building?
   this.vehicle_occupants; // What vehicles are in the building?
}