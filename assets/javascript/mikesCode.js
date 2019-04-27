var allLatLong = [];
$(document).ready(function(){

    $.ajax({
        method: 'GET',
        url: 'https://developers.zomato.com/api/v2.1/search?entity_id=305&entity_type=city&lat=39.742043&lon=-104.991531&radius=400&sort=real_distance&order=asc',
        headers: { 'Accept': 'application/json', 'user-key': '5bb90f13f14bd704f6c55fa5a4cdd8e6' },
        success: function (info) {
            // console.log(info);
           

            for (var i =0; i<info.restaurants.length;i++){
                var latdata = info.restaurants[i].restaurant.location.latitude;
                var longData = info.restaurants[i].restaurant.location.longitude;
                var count = 1;
                var coordinates = {"latitude": latdata, "longitude": longData, "count": count};
                allLatLong.push(coordinates);                  
            }
            // console.log(allLatLong);
            // for(i in info.restaurants){ //perhaps i got too cute trying to combine lat and long right out of the object
            //   iterLatLong = info.restaurants[i].restaurant.location.latitude + "," + info.restaurants[i].restaurant.location.longitude;
            //   var totalLatLong=[];
            //   totalLatLong.push(iterLatLong);
            //       console.log(totalLatLong); //not sure this is correct, shows as a string with one index
            //     }
    
    
            // for (i in info.restaurants) { // tried separate iterations for lat and long to create two separate values
            //     iterLat = info.restaurants[i].restaurant.location.latitude;
            //     //console.log(iterLat) // the lats are here, but they do not seem to be in an array
            //     //console.log(iterLat[0]); // index[0] pulls the first number, '3' of each lat value
            //     iterLong = info.restaurants[i].restaurant.location.longitude;
            //     var latdata = [];
            //     var longData = [];
            //     latdata.push(iterLat);
            //     //console.log(latdata); // when I console.log "latdata" I get latitude and longitude
            //     longData.push(iterLong);
    
            //     //console.log(longData);
            //     var finalLatLong = $.merge(latdata, longData); // this merge seems to do what was done above in "iterLatLong"
            //    console.log(finalLatLong); // now 20 arrays with with two indices... is this simply all we need?
            //    console.log(finalLatLong[1]); // pulling all longs, as they are in index[1]
            //                                  
            // }
        }
    });

})
