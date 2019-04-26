$(document).ready(function(){
// create configuration object
var config = {
  container: document.getElementById('heatmapContainer'),
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
console.log(heatmapInstance);
})
