/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1190],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by < a href=" ">Stamen Design</ a>, < a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</ a> &mdash; Map data &copy; < a href="http://www.openstreetmap.org/copyright">OpenStreetMap</ a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var dataset = "https://raw.githubusercontent.com/chenranwu/Chenran-s-Midterm/master/data/data.geojson";
var featureGroup;
var parsedData;


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

function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

var eachPointFunction = function(point) {
  layer.on('click', function (event) {
    var display="default";
    $(".day-of-week").text(display);
    console.log(point, 'point');
    showResults();
  });
};

/*var myFilter = function(feature) {
  if (feature.properties.COLLDAY ==" "){return false;}
  else {return true;}
};
*/
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    console.log(parsedData, 'parseddata');
    var pricegroup = [];
    _.each(parsedData.features,function(point){
      pricegroup.push(point.properties.prices);
    });
    var price = median(pricegroup);
    $(".price").text(price);
    var sizegroup = [];
    _.each(parsedData.features,function(point){
      sizegroup.push(point.properties.sqft);
    });
    var size = median(sizegroup);
    $(".size").text(size);
    var bedgroup = [];
    _.each(parsedData.features,function(point){
      bedgroup.push(point.properties.beds);
    });
    var beds = median(bedgroup);
    $(".beds").text(beds);
    var mypoint;
    var pointGroup = _.each(parsedData.features,function(point){
      var color = 'green';
      var pathOpts = {'radius': Math.log(point.properties.prices)/3,
                      'fillColor': color, 'color':'grey', opacity: 0.8};
                      // create popup contents
     var customPopup = _.template("Property Detail<br> Address: <%= address %> <br> Prices: $<%= prices %> <br> Size: <%= size %>sqft" );

                // specify popup options
      var customOptions =
                    {
                    'maxWidth': '400',
                    'width': '200',
                    'className' : 'custom-popup'
                  };
      mypoint = L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]],pathOpts).bindPopup(customPopup({address:point.properties.address, prices:point.properties.prices, size:point.properties.sqft}),customOptions).addTo(map);
    });
    console.log(pointGroup, 'pointgroup');

    // use the latlng property of ev, and call google api afterwards
/*    map.on('click', function(ev) {
      console.log(ev,'ev');
    });
    */
  });
});
