$(document).ready(function(){
    var allLatLong = {data: []};
    


$("#search").on("click", function() {
    // get value from the city input to feed into a locations "GET"
    var allLatLong = {data: []};
    var location = $("#location-input").val();
    var category =$("#category-input").val();
        
    console.log(location);
    console.log(category);
    
    //console.log(catVal)
    var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + category + "&start=0&lat=39.742043&lon=-104.991531";
    console.log(queryURL);
    $.ajax({
        method: 'GET',
        url: queryURL,
        //url:'https://developers.zomato.com/api/v2.1/search?entity_id=305&entity_type=city&lat=39.742043&lon=-104.991531&radius=400&category=8',
        headers: { 'Accept': 'application/json', 'user-key': '5bb90f13f14bd704f6c55fa5a4cdd8e6' },
        success: function (info) {
            console.log(info);           

            for (var i =0; i<info.restaurants.length;i++){
                var latdata = info.restaurants[i].restaurant.location.latitude;
                var longData = info.restaurants[i].restaurant.location.longitude;
                var count = 8;
                var coordinates = {"lat": latdata, "lng": longData, "count": count};
                allLatLong.data.push(coordinates);                  
            };
            console.log("Mike's points: ", allLatLong);
            
                   
                  
                }
                
            })

            
                        
        });
})
