/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1190],
  zoom: 12
});
var defaultsetting = ([40.000, -75.1190],12);

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
var nextButton = $("#next");
var previousButton = $("#previous");
var pagenumber=1;
var map1, map2, map3, map4, map5, map6;

nextButton.click(function() {
  pagenumber++;
  if(pagenumber>=6){pagenumber=6;}
  switch (pagenumber) {
    case 1:
    $('#page1').show();
    break;
    case 2:
    $('#page1').hide();
    $('#previous').show();
    map2();
    $('#page2').show();
    break;
    case 3:
    $('#page2').hide();
    map3();
    $('#page3').show();
    break;
    case 4:
    $('#page3').hide();
    map4();
    $('#page4').show();
    break;
    case 5:
    $('#page4').hide();
    map5();
    $('#page5').show();
    break;
    case 6:
    $('#page5').hide();
    $('#next').hide();
    map6();
    $('#page6').show();
    break;
  }
});

previousButton.click(function() {
  pagenumber--;
  if(pagenumber<=1){pagenumber=1;}
  switch (pagenumber) {
    case 1:
    $('#page2').hide();
    $('#previous').hide();
    map1();
    $('#page1').show();
    break;
    case 2:
    $('#page3').hide();
    $('#previous').show();
    map2();
    $('#page2').show();
    break;
    case 3:
    $('#page4').hide();
    map3();
    $('#page3').show();
    break;
    case 4:
    $('#page5').hide();
    map4();
    $('#page4').show();
    break;
    case 5:
    $('#page6').hide();
    $('#next').show();
    map5();
    $('#page5').show();
    break;
  }
});

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


$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    console.log(parsedData, 'parseddata');
    var pricegroup = [];
    _.each(parsedData.features,function(point){
      pricegroup.push(point.properties.prices);
    });
    var price = median(pricegroup);

    var sizegroup = [];
    _.each(parsedData.features,function(point){
      sizegroup.push(point.properties.sqft);
    });
    var size = median(sizegroup);

    var bedgroup = [];
    _.each(parsedData.features,function(point){
      bedgroup.push(point.properties.beds);
    });
    var beds = median(bedgroup);

    var mypoint;
    var pointGroup = L.featureGroup();

    var resetMap = function() {
       map.removeLayer(pointGroup);
       pointGroup = L.featureGroup();
    };

    map1 = function(){
      $(".price").text(price);
      $(".size").text(size);
      $(".beds").text(beds);
      map.setView([40.000, -75.1190],12);
      _.each(parsedData.features,function(point){
        var color;
        switch (point.properties.beds) {
          case 1: color = 'green';
          break;
          case 2: color = 'red';
          break;
          case 3: color ='blue';
          break;
          default : color ='yellow';
        }

        var pathOpts = {'radius': Math.log(point.properties.prices)/3,
                        'fillColor': color, 'color':'grey', opacity: 0.9};
                        // create popup contents
       var customPopup = _.template("Property Detail<br> Address: <%= address %> <br> Prices: $<%= prices %> <br> Size: <%= size %>sqft" );

                  // specify popup options
        var customOptions =
                      {
                      'maxWidth': '400',
                      'width': '200',
                      'className' : 'custom-popup'
                    };
        mypoint = L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]],pathOpts).bindPopup(customPopup({address:point.properties.address, prices:point.properties.prices, size:point.properties.sqft}),customOptions).addTo(pointGroup);
      });
      map.addLayer(pointGroup);
      //console.log(pointGroup, 'pointgroup');

    };
    map1();
    map2 = function(){
      resetMap();
      console.log(map);
      map.setView([39.952417, -75.163615],13);
      //console.log(pointGroup);
      _.each(parsedData.features,function(point){
        var color = 'green';
        var pathOpts = {'radius': Math.log(point.properties.prices)/3,
                        'fillColor': color, 'color':'grey', opacity: 0.9};
                        // create popup contents
       var customPopup = _.template("Property Detail<br> Address: <%= address %> <br> Prices: $<%= prices %> <br> Size: <%= size %>sqft" );

                  // specify popup options
        var customOptions =
                      {
                      'maxWidth': '400',
                      'width': '200',
                      'className' : 'custom-popup'
                    };
         if(point.properties.beds == 1){
            mypoint = L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]],pathOpts).bindPopup(customPopup({address:point.properties.address, prices:point.properties.prices, size:point.properties.sqft}),customOptions).addTo(pointGroup);
         }
      });
      map.addLayer(pointGroup);
    };
    map3 = function(){
      resetMap();
      console.log(map);
      map.setView([40.000, -75.1190],12);
      //console.log(pointGroup);
      _.each(parsedData.features,function(point){
        var color = 'purple';
        var pathOpts = {'radius': Math.log(point.properties.prices)/3,
                        'fillColor': color, 'color':'grey', opacity: 0.9};
                        // create popup contents
       var customPopup = _.template("Property Detail<br> Address: <%= address %> <br> Prices: $<%= prices %> <br> Size: <%= size %>sqft" );

                  // specify popup options
        var customOptions =
                      {
                      'maxWidth': '400',
                      'width': '200',
                      'className' : 'custom-popup'
                    };
         if(point.properties.prices >= 500000){
            mypoint = L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]],pathOpts).bindPopup(customPopup({address:point.properties.address, prices:point.properties.prices, size:point.properties.sqft}),customOptions).addTo(pointGroup);
         }
      });
      map.addLayer(pointGroup);
    };

    map4 = function(){
      resetMap();
      console.log(map);
      map.setView([40.000, -75.1190],12);
      //console.log(pointGroup);
      _.each(parsedData.features,function(point){
        var color = 'pink';
        var pathOpts = {'radius': Math.log(point.properties.prices)/3,
                        'fillColor': color, 'color':'grey', opacity: 0.9};
                        // create popup contents
       var customPopup = _.template("Property Detail<br> Address: <%= address %> <br> Prices: $<%= prices %> <br> Size: <%= size %>sqft" );

                  // specify popup options
        var customOptions =
                      {
                      'maxWidth': '400',
                      'width': '200',
                      'className' : 'custom-popup'
                    };
         if(point.properties.sqft >= 2000){
            mypoint = L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]],pathOpts).bindPopup(customPopup({address:point.properties.address, prices:point.properties.prices, size:point.properties.sqft}),customOptions).addTo(pointGroup);
         }
      });
      map.addLayer(pointGroup);
    };

    map5 = function(){
      resetMap();
      console.log(map);
      map.setView([39.958203, -75.218990],14);
      _.each(parsedData.features,function(point){
        var color = 'green';
        switch (point.properties.beds) {
          case 1: color = 'green';
          break;
          case 2: color = 'red';
          break;
          case 3: color ='blue';
          break;
          default : color ='yellow';
        }

        var pathOpts = {'radius': Math.log(point.properties.prices)/3,
                        'fillColor': color, 'color':'grey', opacity: 0.9};
                        // create popup contents
       var customPopup = _.template("Property Detail<br> Address: <%= address %> <br> Prices: $<%= prices %> <br> Size: <%= size %>sqft" );

                  // specify popup options
        var customOptions =
                      {
                      'maxWidth': '400',
                      'width': '200',
                      'className' : 'custom-popup'
                    };
        mypoint = L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]],pathOpts).bindPopup(customPopup({address:point.properties.address, prices:point.properties.prices, size:point.properties.sqft}),customOptions).addTo(pointGroup);
      });
      map.addLayer(pointGroup);
      //console.log(pointGroup, 'pointgroup');

    };
    map6 = function(){
      resetMap();
      console.log(map);
      map.setView([40.000, -75.1190],12);
      _.each(parsedData.features,function(point){
        var color = 'green';
        switch (point.properties.beds) {
          case 1: color = 'green';
          break;
          case 2: color = 'red';
          break;
          case 3: color ='blue';
          break;
          default : color ='yellow';
        }

        var pathOpts = {'radius': Math.log(point.properties.prices)/3,
                        'fillColor': color, 'color':'grey', opacity: 0.9};
                        // create popup contents
       var customPopup = _.template("Property Detail<br> Address: <%= address %> <br> Prices: $<%= prices %> <br> Size: <%= size %>sqft" );

                  // specify popup options
        var customOptions =
                      {
                      'maxWidth': '400',
                      'width': '200',
                      'className' : 'custom-popup'
                    };
        mypoint = L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]],pathOpts).bindPopup(customPopup({address:point.properties.address, prices:point.properties.prices, size:point.properties.sqft}),customOptions).addTo(pointGroup);
      });
      map.addLayer(pointGroup);
      //console.log(pointGroup, 'pointgroup');

    };


    // use the latlng property of ev, and call google api afterwards
/*    map.on('click', function(ev) {
      console.log(ev,'ev');
    });
    */
  });
});
