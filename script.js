$(document).ready(function(){
   $("#yourloc").click(function(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        alert("Your Latitude is " + lat + " and Longitude is " + long);
      });
    } else{
        alert("Unable to access geolocation data.");
    }
   });

   $("#getweather").click(function(){
    var city = $("#city").val();
    var state = $("#state").val();
    var url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city},${state}')&format=json`;
    $.getJSON(url,function(weather) {
      var forecast = weather.query.results.channel.item.forecast;
        for(var i = 0; i < forecast.length; i++){
           $("#location").html(`Current weather for ${city}, ${state}`);
           $("#weather").append(forecast[i].date + ": High " + forecast[i].high + " / Low " + forecast[i].low + " " + forecast[i].text + "<br>");
          }
      });
    });
  });
