/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var dataset = "https://raw.githubusercontent.com/chenranwu/Chenran-s-Midterm/master/data/data.geojson";
var featureGroup;



var myStyle = function(feature) {

};

var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};


/*var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
    var display="default";
    $(".day-of-week").text(display);
    console.log(layer.feature);
    showResults();
  });
};
*/
/*var myFilter = function(feature) {
  if (feature.properties.COLLDAY ==" "){return false;}
  else {return true;}
};
*/
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    console.log(parsedData);
    var mypoint;
    _.each(parsedData.features,function(point){
      mypoint = L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0],]).bindPopup(point.properties.address).addTo(map);
    });


    // quite similar to _.each
//  featureGroup.eachLayer(eachFeatureFunction);
});
});
