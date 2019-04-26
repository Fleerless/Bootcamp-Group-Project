$(document).ready(function () {

    /* ==========================================================================
    JS code for the map functionality goes here 
    in order for this to work, the following code snipped needs to be added to the 
    head in the index.html file: 

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
        integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
        crossorigin="" />
    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
        integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
        crossorigin=""></script>
    <!-- mapquest JS goes here -->
    <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest-maps.js"></script>
    <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest-maps.css" />

    cheers! - Andy
    ========================================================================== */

    var lat = 39.7392; // this will be fed from the zomato results
    var long = -104.9903; // this will be fed from the zomato results
    var zoom = 13; // we can change the initial zoom depending on search radius

    L.mapquest.key = 'FuQjru92zZdcmkhC0D99Fp9Ye0ZaEAGa'; // my mapQuest API key

    // 'mapid' refers to a <div> element with the ID map
    L.mapquest.map('mapid', {
        center: [lat, long],
        layers: L.mapquest.tileLayer('map'), // this will be updated when we have a heatmap layer as well
        zoom: zoom
    });



});