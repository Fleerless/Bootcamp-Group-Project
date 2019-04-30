$(document).ready(function(){

  // heatmap code 
  var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": .004, // I had to make this really small. if it's 1 the whole state is red! 
    "maxOpacity": .8,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries 
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": true,
    // which field name in your data represents the latitude - default "lat"
    latField: 'latitude',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'longitude',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
};


  var heatmapLayer = new HeatmapOverlay(cfg); // check console.log to see that heatmapLayer is mutable!!! 

  // zomato code
  var zomatoKey = "c7db9a7567a1e0278cfd9829e1435aa1";
  var testData = {
      max: 100,
      data: []
  };

  // this seems way more complex, but it demonstrates the use of the jQuery .when() method
  // which can be used to call a function after a response is returned, and get it out of the $.ajax() call
  var cityLat;
  var cityLong;
  var cityId;

  var clickSearch = $("#search").on("click", function(){
  var citySearch = $("#location-input").val().trim();
  $("#map").empty();
  $("#map").removeClass();
  $.ajax({
    method: "GET",
    url: "https://developers.zomato.com/api/v2.1/locations?query="+citySearch,
    headers: { "user-key": "c7db9a7567a1e0278cfd9829e1435aa1" }
  }).then(function(response){
0    cityLat = response.location_suggestions[0].latitude;
    cityLong = response.location_suggestions[0].longitude;
    cityId = (response.location_suggestions[0].city_id).toString();
    console.log("response: ", response);
    console.log("city id: ", cityId);

  }).then(function(){

  var ajax1 = $.ajax({
      method: "GET",
      url: "https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"entity_type=city&q=restaurant&start=0",
      headers: { "user-key": "c7db9a7567a1e0278cfd9829e1435aa1" }
  }),
      ajax2 = $.ajax({
          method: "GET",
          url: "https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&q=restaurant&start=20",
          headers: { "user-key": "c7db9a7567a1e0278cfd9829e1435aa1" }
      }),
      ajax3 = $.ajax({
          method: "GET",
          url: "https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&q=restaurant&start=40",
          headers: { "user-key": "c7db9a7567a1e0278cfd9829e1435aa1" }
      }),
      ajax4 = $.ajax({
          method: "GET",
          url: "https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&q=restaurant&start=60",
          headers: { "user-key": "c7db9a7567a1e0278cfd9829e1435aa1" }
      }),
      ajax5 = $.ajax({
          method: "GET",
          url: "https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&q=restaurant&start=80",
          headers: { "user-key": "c7db9a7567a1e0278cfd9829e1435aa1" }
      });

  $.when( ajax1, ajax2, ajax3, ajax4, ajax5).done(function (r1, r2, r3, r4, r5) {
    
      console.log("r1: ", r1);
      // r1 is the response, r1[0] is where the data is in a .when() call. 
      // check the log for the response 
      var responseArray = [];
      responseArray.push(r1[0], r2[0], r3[0], r4[0], r5[0]);
      responseArray.forEach(function(response) {
          for (i = 0; i < response.restaurants.length; i++) {
          var latString = response.restaurants[i].restaurant.location.latitude;
          var longString = response.restaurants[i].restaurant.location.longitude;
          var lat = parseFloat(latString);
          var long = parseFloat(longString);
          var latLong = { "latitude": lat, "longitude": long, "count": 1 };
          testData.data.push(latLong);
      }
      });

      // leaflet code
      var lat = cityLat;
      var long = cityLong;
      var zoom = 12;

      L.mapquest.key = 'FuQjru92zZdcmkhC0D99Fp9Ye0ZaEAGa';
      heatmapLayer.setData(testData);
      // 'map' refers to a <div> element with the ID map
      L.mapquest.map('map', {
          center: [lat, long],
          layers: [L.mapquest.tileLayer('map'), heatmapLayer],
          zoom: zoom
      });
  });
});
});
});

