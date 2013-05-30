function Person(options){
   var person = this;
   var firstName = (options['firstName']) ? options['firstName'] : '';
   var lastName = (options['lastName']) ? options['lastName'] : '';
   var currHealth = (options['currHealth']) ? options['currHealth'] : '';
   var maxHealth = (options['maxHealth']) ? options['maxHealth'] : '';
   var description = 'Test';
   var currFatigue;
   var leftHandObject;
   var rightHandObject;
   var backpackObjects;
   var armor;
   var speed = 3; // In mph
   var icon = L.icon({
      iconUrl: 'lib/img/human-tmp.png',
      iconSize: [19,19]
   });
   //var loc = new L.LatLng(39.75,-105.0); // Denver
   var loc = new L.LatLng(40.00622, -105.266); // Boulder
   var loc2 = new L.LatLng(40.00622, -105.267); // Boulder
   var loc3 = new L.LatLng(40.00622, -105.268); // Boulder
   var loc4 = new L.LatLng(40.00622, -105.269); // Boulder
   var movementLine = L.polyline([loc,loc2,loc3,loc4]);
   var marker = L.animatedMarker(movementLine.getLatLngs(),{
      icon: icon,
      clickable: true,
      //title: getFullName(),
      autoStart: false,
      //distance: speed*0.00044704, // Convert to meters per millisec
       distance: 0.1,
      interval: 1
   });


   // Getters
   var getFullName = function(){
      return firstName + " " + lastName;
   }

   // Render the icon on the map, and make it clickable
   this.render = function(map){
      marker.on('click', function(){
         var popup = $('#popup');
         $('#popup').html('').append(getTabbedDiv());
         $('#popup').dialog({
            resizable: false,
            width: 'auto',
            modal: true,
            title: getFullName()
         });
      });
      map.on('zoomstart', function(){
            marker.stop();
            //console.log(marker);
            //marker._icon.style[L.DomUtil.TRANSITION] = '';
            marker.setLatLng(marker.getLatLng());
      });
      map.on('zoomend', function(){
            //marker.animate();
            //console.log(marker._tid);
            marker.start();
      });
      map.addLayer(marker);
   }
   
   /* ======= Build the dialog for the person ======= */
   var getTabbedDiv = function(){
      var tabDiv = $('<div id="tabbed"></div>');
      tabDiv.append('<ul id="tab-buttons"><li><a href="#bio">Bio</a></li><li><a href="#stats">Stats</a></li><li><a href="#skills">Skills</a></li><li><a href="#inventory">Inventory</a></li></ul>');
      tabDiv.append('<div id="bio"></div>');
      $('#bio').append(getBio());
      tabDiv.append('<div id="stats"></div>');
      $('#stats').append(getStats());
      tabDiv.append('<div id="skills"></div>');
      $('#skills').append(getSkills());
      tabDiv.append('<div id="inventory"></div>');
      $('#inventory').append(getInventory());
      tabDiv.tabs({ active: 0 });
      return tabDiv;
   }

   var getBio = function(){
      var bioString = '<p>'+description+'</p>';
      return bioString;
   }

   var getStats = function(){
      var statsString;
      return statsString;
   }

   var getSkills = function(){
      var skillsString;
      return skillsString;
   }

   var getInventory = function(){
      var inventoryString;
      return inventoryString;
   }

   /* ======= Movement handlers ======= */
   this.startMovement = function(){
      marker.start();
      // Need to send it back to the server.
   }
   this.stopMovement = function(){
      marker.stop();
      // Need to send it back to the server.
   }
   this.moveAlong = function(latLngs){
      movementLine.setLatLngs(latLngs);
      person.startMovement();
      // Need to send it back to the server.
   }
}
