var pg = require('pg'),
    geojson = require('geojson');

// Set up pg
var conString = "tcp://zgameuser:qwerty1@localhost:5432/zgamedb";
//var client = new pg.Client(conString);

exports.connTest = function(){
  client.connect(function(err) {
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
	console.log(result.rows[0].theTime); 
    })
  });
}

exports.getAllBuildings = function(callback){
  var q = 'SELECT ST_AsGeoJSON(ST_Transform(way,4326)) as geometry, osm_id, building, tags->\'height\' as height, tags->\'building:levels\' as blevel ' + 
	  'FROM planet_osm_polygon ' + 
	  'WHERE( building IS NOT NULL and building != \'no\')';
  var fc;

  // Do the query
  pg.connect(conString,function(err, client){
    var query = client.query(q, function(err, result){
      if (err) throw err;
      fc = toGeoJson(result.rows);
      callback(fc);
    });
    query.on('end', function(){
      console.log('close');
    });
  });
}

var toGeoJson = function(rows){
  var obj, i;

  obj = {
    type: "FeatureCollection",
    features: []
  };

  for (i = 0; i < rows.length; i++) {
    var item, feature, geometry;
    item = rows[i];

    geometry = JSON.parse(item.geometry);
    delete item.geometry;

    var MPL = 5; // Meters per level. Real=~3 meters, but that wasn't easily seen.
    if (item.height == '' || item.height == null){
      if (item.blevel != '' && item.blevel != null){
	// If blevels is defined, use that to define height
	item.height = (parseInt(item.blevel,10) + 1)*MPL;
      }
      else{
	// Otherwise, be pseudo-random; Decide number of levels by modding the
	// osm id with 2, and adding 1, thus assuming between 1 and 3 levels
	// (to give some variability, but still give consisitent results).
	item.height = (item.osm_id%2 + 1)*MPL;
      }
    }
    item.height = item.height*10;

    feature = {
      type: "Feature",
      properties: item,
      geometry: geometry
    }

    obj.features.push(feature);
  } 
  return obj;
}
