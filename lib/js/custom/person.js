function Person(options){
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
   var regSpeed;
   var sprintSpeed;
   var loc = new L.LatLng(39.75,-105.0);
   var icon = L.icon({
      iconUrl: 'lib/img/human-tmp.png',
      iconSize: [19,19]
   });

   // Getters
   var getFullName = function(){
      return firstName + " " + lastName;
   }

   this.render = function(map){
      var marker = L.marker(loc, {
         icon: icon,
         clickable: true,
         title: getFullName()
      });
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
      marker.addTo(map);
   }
   
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


}
