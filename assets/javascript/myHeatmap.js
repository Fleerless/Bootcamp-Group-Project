$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: 'https://developers.zomato.com/api/v2.1/search?entity_id=305&entity_type=city&lat=39.742043&lon=-104.991531&radius=400&sort=real_distance&order=asc',
    headers: { 'Accept': 'application/json', 'user-key': '5bb90f13f14bd704f6c55fa5a4cdd8e6' },
    success: function (info) {
        // console.log(info);
       
        var allLatLong = {data: []};

        for (var i =0; i<info.restaurants.length;i++){
            var latdata = info.restaurants[i].restaurant.location.latitude;
            var longData = info.restaurants[i].restaurant.location.longitude;
            var count = 8;
            var coordinates = {"latField": parseFloat(latdata), "lngField": parseFloat(longData), "count": parseFloat(count)};
            allLatLong.data.push(coordinates);                  
        };

        // create configuration object
var config = {
  container: document.getElementById('map'),
  radius: 10,
  maxOpacity: .5,
  minOpacity: 0,
  blur: .75,
  gradient: {
    // enter n keys between 0 and 1 here
    // for gradient color customization
    '.5': 'blue',
    '.8': 'red',
    '.95': 'white'
  }
};
var heatmapInstance = h337.create(config);
// console.log(heatmapInstance);
    console.log("Points: " ,allLatLong);
    // don't forget to include leaflet-heatmap.js

var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 2,
  "maxOpacity": .8, 
  // scales the radius based on map zoom
  "scaleRadius": true, 
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries 
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'count'
};


var heatmapLayer = new HeatmapOverlay(cfg);

var lat = 39.7392; // this will be fed from the zomato results
var long = -104.9903; // this will be fed from the zomato results
var zoom = 13; // we can change the initial zoom depending on search radius

L.mapquest.key = 'FuQjru92zZdcmkhC0D99Fp9Ye0ZaEAGa'; // my mapQuest API key

L.mapquest.map('map', {
	center: [lat, long],
	layers: [L.mapquest.tileLayer('map'), heatmapLayer], // this will be updated when we have a heatmap layer as well
  zoom: zoom,
  
});
console.log(L.mapquest.tileLayer('map'));

console.log("Heat Map Layer: ", heatmapLayer);
heatmapLayer.setData(allLatLong);
console.log("Heatmap Data-Set: ", heatmapLayer);
      }});

});


