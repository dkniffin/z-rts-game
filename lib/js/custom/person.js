function Person(options){
   var t = this;
   this.id = options['id'];
   this.selected = false;
   this.icon = L.icon({
      iconUrl: 'lib/img/human-tmp.png',
      iconSize: [19,19]
   });
   this.icon_selected = L.icon({
      iconUrl: 'lib/img/human-tmp-selected.png',
      //iconUrl: 'lib/img/human-tmp.png',
      iconSize: [23,23]
   });

   this.loc = new L.LatLng(options['lat'],options['lon']);

   //this.loc = new L.LatLng(40.00622, -105.266); // Boulder
   this.movementLine = L.polyline([t.loc,t.loc2,t.loc3,t.loc4]);


   this.marker = L.animatedMarker( t.movementLine.getLatLngs(),{
      icon: t.icon,
      clickable: true,
      //title: getFullName(),
      autoStart: false,
      //distance: speed*0.00044704, // Convert to meters per millisec
      distance: 0.1,
      interval: 1,
      onEnd: function(){
         //t.marker.start();
         t.marker._i = 0;
      }
   });

   // Getters
   this.getFullName = function(){
      return t.firstName + " " + t.lastName;
   }

   // Render the icon on the map, and make it clickable
   this.render = function(map){
      t.marker.on('click', function(){
         if (window.event.shiftKey){
            // If shift is pressed, add to selected units
            t.select();
            console.log(globalGameData.selectedUnits);
         }
         else if (window.event.ctrlKey){
            // If ctrl is pressed...
            if (t.selected){
               // If unit is selected, deselect it
               t.deselect();
            console.log(globalGameData.selectedUnits);
            }
            else{
               // Else select it
               t.select();
            console.log(globalGameData.selectedUnits);
            }
         }
         else{
            // Otherwise, clear selected units, then add this unit
            globalGameData.deselectAll();
            t.select();
         }
      });
      t.marker.on('dblclick', function(){
         // Select the unit
         var popup = $('#popup');
         $('#popup').html('').append(t.getTabbedDiv());
         $('#popup').dialog({
            resizable: false,
            width: 'auto',
            modal: true,
            title: t.getFullName()
         });
      });
      /*
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
      */


      map.addLayer(t.marker);
   }

   /* ======= Select and Deselect functions ======= */
   this.select = function(){
      globalGameData.addSelectedUnit(t);
      t.marker.setIcon(t.icon_selected);
      t.selected = true;
   }
   this.deselect = function(){
      globalGameData.removeSelectedUnit(t);
      t.marker.setIcon(t.icon);
      t.selected = false;
   }
   
   /* ======= Build the dialog for the person ======= */
   this.getTabbedDiv = function(){
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

   this.getBio = function(){
      var bioString = '<p>'+description+'</p>';
      return bioString;
   }

   this.getStats = function(){
      var statsString;
      return statsString;
   }

   this.getSkills = function(){
      var skillsString;
      return skillsString;
   }

   this.getInventory = function(){
      var inventoryString;
      return inventoryString;
   }

   /* ======= Movement handlers ======= */
   this.startMovement = function(){
      t.marker.start();
      // TODO: Need to send it back to the server.
   }
   this.stopMovement = function(){
      t.marker.stop();
      // TODO: Need to send it back to the server.
   }
   this.moveAlong = function(latLngs){
      t.marker.setLine(latLngs);
      //t.movementLine.setLatLngs(latLngs);
      t.startMovement();
      // TODO: Need to send it back to the server.
   }
   this.moveTo = function(latlng){
      this.moveAlong([t.marker.getLatLng(),latlng]);
   }
}
